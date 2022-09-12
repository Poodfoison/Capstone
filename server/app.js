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

app.get('*', logger, (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

app.post('/login', async (req, res) => {
    try {


        const { username, password } = req.body

        const user = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (user.rows[0].length < 0) {
            res.status(401).send("User does not exists")
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validPassword) {
            return res.status(401).json("Password incorrect")
        }

        const token = generateJWT(user.rows[0])
        res.json({ token })

    } catch (error) {
        console.log(error.message)
        }

    });

app.post('/changepassword', async(req, res) => {

    try {

        const { username, newPassword } = req.body

        const user = await pool.query(`SELECT * FROM login WHERE
        username = $1`, [username])

        if (user.rows.length < 0) {
            res.status(401).send("User does not exists")
        }
        else {
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(newPassword, salt);

   
        const updatePassword = await pool.query(`
        UPDATE login 
        SET password = $2
        WHERE username = $1
        RETURNING *
        `, [username, bcryptPassword])

        res.json(updatePassword.rows)
        }
 

    } catch (error) {
        console.log(error.message)


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
 
        const token = generateJWT(newUser.rows[0])

    res.json({ token })
    }
    } catch (error) {

        console.log(error.message)
        res.status(500).send(error.message)
    }

})

app.get('/profile', auth, async (req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ msg: "Unauthenticated" });

    }
})


app.get('/profile2', async(req,res) =>{
    try{
        res.json("Hello World")
    }
    catch(error){
        console.log(error.message)
    }
} )


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
