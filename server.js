import express from "express";
import bodyParser from "body-parser";
const app = express();
import { uid } from 'uid';


const logger = (req, res, next) => {
    console.log(`request url: ${req.url} and request method: ${req.method}`)
    next()
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let startingId = 0
let users = [
    {
        id: "078b0e18dc77a8f597475916f645805f",
        username: "poodfoison",
        password: "123456789"
    }
]


app.get('/', (req, res) => {
    res.send("Home");
});

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    res.json(users[req.params.id])
})

app.get('/data', logger, (req, res) => {

    res.json(users)
})

app.get('/secret', (req, res) => {
    res.status(403).end();
})

app.get('*', (req, res) => {
    res.status(404).send('Error 404 Page not found')
})

app.post('/login', (req, res) => {
    const { username, password } = req.body
    console.log(username, password)



    users.forEach((user) => {
        if (user.username === username) {
            if (user.password === password) {
                res.send("Login Successful")
            }
            else {
                res.send("Incorrect Password")
            }
        }
        else {
            res.send("Invalid User")
        }
    })
});

app.post('/changepassword', (req, res) => {
    const { username, newPassword } = req.body

    users.forEach((user) => {
        if (user.username === username) {
            user['password'] = newPassword
            res.send(user)
        }
        else {
            res.send("Invalid User")
        }
    })

})

app.post('/register', (req, res) => {
    const { username, password } = req.body


    users.forEach((user) => {
        if (user.username === username) {
               res.send("Username already in use")
        }
        else {
            users.push({
                id: uid(),
                username,
                password
            })
            res.status(201).send(`Account Successfully Created`)
        }
    })
   
})

app.listen(8000, () => {
    console.log("server started http://localhost:8000");
})