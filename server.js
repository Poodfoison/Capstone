import express from "express";
import bodyParser from "body-parser";
const app = express();
import { uid } from 'uid';
import Pool from "pg";
import  bcrypt  from  "bcryptjs"


const pool = new Pool.Pool({ 
    user:  'postgres',
    password:  '0800',
	database:  'HOA',
    host: 'localhost'
})


    

const logger = (req, res, next) => {
    console.log(`request url: ${req.url} and request method: ${req.method} ${req.connection.remoteAddress}`)
    next()
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//let users = [
//    {
//        id: "078b0e18dc77a8f597475916f645805f",
//        username: "poodfoison",
//        password: "123456789"
//    }
//]
// 
app.get('/', (req, res) => {
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

        const users = await pool.query(`
        SELECT * FROM login where username = $1
        `, [username])
        res.json(users.rows)
    } catch (error) {
        console.log(error)
    }
})


app.get('/secret', (req, res) => {
    res.status(403).end();
})

app.get('*', (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

app.post('/login', async (req, res) => {
    try {


        const { username, password } = req.body

        const users = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (users.rows.length < 0) {
            res.status(401).send("User does not exists")
        }

        const validPassword = await bcrypt.compare(password, users.rows[0].password)
        if (!validPassword) {
            return res.status(401).json("Password incorrect")
        }

        res.json(users.rows)

    } catch (error) {
        console.error(error.message);

        }

    });

app.post('/changepassword', async(req, res) => {

    try {

        const { username, newPassword } = req.body

        const users = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (users.rows.length < 0) {
            res.status(401).send("User does not exists")
        }
        else {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(newPassword, salt);

   
        const newPW = await pool.query(`
        UPDATE login 
        SET password = $2
        WHERE username = $1
        RETURNING *
        `, [username, bcryptPassword])

        res.json(newPW.rows)
        }
 

    } catch (error) {
        console.error(error.message);

        }

})


app.post('/register', async (req, res) => {
    try {

        const {username,password} = req.body

        const user = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (user.rows.length > 0) {
            res.status(401).send("Username already in use")
        }
        else  { 

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

   
        const newUser = await pool.query(`
        INSERT INTO login (id, username, password)
        VALUES ($1, $2, $3) RETURNING *
        `, [uid(), username, bcryptPassword])

        res.json(newUser.rows)
    }
    } catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})

//app.post('/register', (req, res) => {
//    const { username, password } = req.body
//
//
//    users.forEach((user) => {
//        if (user.username === username) {
//               res.send("Username already in use")
//        }
//        else {
//            users.push({
//                id: uid(),
//                username,
//                password
//            })
//            res.status(201).send(`Account Successfully Created`)
//        }
//    })
//   
//})



pool.connect((err)=>{
    if (err){
        console.log(err.message)
    }
    else{
        app.listen(8000, () => {
            console.log("server started http://localhost:8000");
        })
    }
})
