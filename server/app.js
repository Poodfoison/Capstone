import express, { application, Router } from "express"
import bodyParser from "body-parser";
import { uid } from 'uid';
import { connectDatabase } from "./pool.js"
import  bcrypt  from  "bcryptjs"
import { generateJWT } from "./jwt/jwtGenerator.js"
import { auth } from "./middleware/auth.js"
import cors from "cors"



const app = express()
const pool = connectDatabase()
const PORT = 8000

const logger = (req, res, next) => {
    console.log(`request url: ${req.url} and request method: ${req.method} ${req.connection.remoteAddress}`)
    next()
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/', logger, (req, res) => {
    res.send("Home");
});

app.get('/users', async(req,res) =>{
    try {
        const data = await pool.query(`
        SELECT * FROM login
        `)
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/users/:username', async (req, res) => {

    try {
        const username = req.params.username

        const user = await pool.query(`
        SELECT * FROM login where username = $1
        `, [username])
        res.json(user.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/secret', logger, (req, res) => {
res.status(403).end();
})

app.post('/login', async (req, res) => {
    try {


        const { username, password } = req.body

        const user = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (user.rows.length <= 0) {
            res.status(401).send({msg:"User does not exists"})
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json({msg:"Password incorrect"})
            
        }

        const token = generateJWT(user.rows[0])
        res.json({ token })

    } catch (error) {
        console.log(error.message)
        }

    });

app.post('/changepassword', auth, async(req, res) => {

    try {

        const {newPassword} = req.body

        
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(newPassword, salt);

   
        const updatePassword = await pool.query(`
        UPDATE login 
        SET password = $2
        WHERE id = $1
        RETURNING *
        `, [req.users.id, bcryptPassword])

        res.json(updatePassword.rows)
        
 
        
    } catch (error) {
        console.log(error.message)


        }

})

app.post('/addupdates', async (req, res) => {
    try {
        const {updates} = req.body

        const d = new Date();
        let newBillUID = uid()

        // current date
        let date = ("0" + d.getDate()).slice(-2);

        // current month
        let month = ("0" + (d.getMonth() + 1)).slice(-2);

        // current year
        let year = d.getFullYear();
        
        let day = year + "-" + date + "-" + month;

        const newupdates = await pool.query(`
        INSERT INTO updates (updateid, date, updates)
        VALUES ($1, $2, $3) RETURNING *
        `, [newBillUID, day, updates])
        
        res.json(newupdates.rows)



    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})

app.get('/updates', async(req,res) =>{
    try {
        const data = await pool.query(`
        SELECT * FROM updates
        `)
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
})



app.get('/account', auth, async(req,res) =>{
    try {
        
        const account = await pool.query(`
        SELECT firstname, lastname, contact, email, block, lot, street, barangay, city, province  FROM login
        INNER JOIN address
        ON address.id = login.id
        WHERE login.id = $1
        `,[req.users.id])
        res.json(account.rows)

    } catch (error) {
        console.log(error.message)


        }

})     

app.get('/address', auth, async(req,res) =>{
    try {
        
        const account = await pool.query(`
        SELECT block, lot, street, barangay, city, province  FROM address
        INNER JOIN login
        ON login.id = address.id
        WHERE login.id = $1
        `,[req.users.id])
        res.json(account.rows)

    } catch (error) {
        console.log(error.message)


        }

})     

app.get('/profile', auth, async (req, res) => {
    try {
        res.json(req.users)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Unauthenticated" });

    }
})

app.get('/bill', auth, async (req, res) => {
    try {


        const account = await pool.query(`
        SELECT transactionid, name, contact, email, block, lot, street, barangay, city, province, date, amount  FROM login
        INNER JOIN address
        ON address.id = login.id
        INNER JOIN transaction
        ON transaction.id = login.id
        INNER JOIN bill
        ON transaction.billid = bill.billid
        WHERE login.id = $1
        `,[req.users.id])
        res.json(account.rows)



    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Unauthenticated" });

    }
})


app.post('/addbill', auth, async (req, res) => {
    try {
        const {name,amount} = req.body

        const d = new Date();
        let newBillUID = uid()

        // current date
        let date = ("0" + d.getDate()).slice(-2);

        // current month
        let month = ("0" + (d.getMonth() + 1)).slice(-2);

        // current year
        let year = d.getFullYear();
        
        let day = year + "-" + date + "-" + month;

        const newbill = await pool.query(`
        INSERT INTO bill (billid, date, name, amount)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [newBillUID, day, name, amount])

        const newTransaction = await pool.query(`
        INSERT INTO transaction (transactionid, id, billid)
        VALUES ($1, $2, $3) RETURNING *
        `, [uid(), req.users.id, newBillUID])
        
        res.json(newbill.rows)



    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})






app.post('/updateaddress', auth, async(req, res) => {

    try {
        const {block, lot, street, barangay, city, province} = req.body

         

        const updateAddress = await pool.query(`
        UPDATE address
        SET (block, lot, street, barangay, city, province) = ($2, $3, $4, $5, $6, $7)
        WHERE id = $1
        RETURNING *
        `, [req.users.id, block, lot, street, barangay, city, province ])
        
        res.json(updateAddress.rows)


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})

app.post('/updatelogin', auth, async(req, res) => {

    try {
        const {firstname, lastname, contact, email} = req.body

         

        const updateLogin = await pool.query(`
        UPDATE login
        Set (firstname, lastname, email, contact) = ($2, $3, $4, $5)
        WHERE id = $1
        RETURNING *
        `, [req.users.id, firstname, lastname, email, contact ])
        
        res.json(updateLogin.rows)


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})

app.post('/addvisitor', auth, async (req, res) => {
    try {
        const {firstname, lastname, contact, validid} = req.body

         

        const visitors = await pool.query(`
        INSERT INTO visitor (visitorid, id, firstname, lastname, contact, validid)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `, [uid(), req.users.id, firstname, lastname, contact, validid ])
        
        res.json(visitors.rows)


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})

app.post('/message', auth, async (req, res) => {
    try {
        const {name, email, contact, message} = req.body

         

        const messageContact = await pool.query(`
        INSERT INTO contact (concernid, name, email, contact, message)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `, [uid(), name, email, contact, message])
        
        res.json(messageContact.rows)


    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)

    }
})

app.post('/register', async (req, res) => {
    try {

        const {username,password,firstname,lastname,contact,email,block, lot, street, barangay, city, province} = req.body

        const user = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (user.rows.length > 0) {
            res.status(401).send({msg:"Username already in use"})
        }
        else  { 

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);
        
        let newUID = uid()
   
        const newUser = await pool.query(`
        INSERT INTO login (id, username, password, firstname, lastname, contact, email)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `, [newUID, username, bcryptPassword, firstname, lastname, contact, email])

        const newAddress = await pool.query(`
        INSERT INTO address (addressid, block, lot, street, barangay, city, province,id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
        `, [uid(), block, lot, street, barangay, city, province, newUID])
        
   
 
        const token = generateJWT(newUser.rows[0],newAddress.rows[0])

    res.json({ token })
    }
} catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})






pool.connect((err)=>{
    if (err){
        console.log(err.message)
    }
    else{
        app.listen(PORT, () => {
            console.log("server started http://localhost:8000");
        })
    }
})
