const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app =  express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const database ={
    users : [
        {
            id :'123',
            name : 'John',
            email : 'john@gmail.com',
            password : 'cookies',
            entries : 0,
            joined : new Date()
        },

        {
            id :'124',
            name : 'sally',
            email : 'sally@gmail.com',
            password : 'banana',
            entries : 0,
            joined : new Date()
        }

    ],
    login:[
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req,res)=>{
    res.send(database.users)
})

app.listen(3001, ()=> {
    console.log('app is running on port 3001')
})

app.post('/signin',(req,res)=>{
    bcrypt.compare("banana", '$2a$10$BQNVwXPF0Zr/bh0gM6JzYOwZrqyZm7u6ny6E4RVtg2oy/DIG/jERa', function(err, res) {
            // res == true
            console.log('first guess', res)
        });
        bcrypt.compare("veggies", '$2a$10$BQNVwXPF0Zr/bh0gM6JzYOwZrqyZm7u6ny6E4RVtg2oy/DIG/jERa', function(err, res) {
            console.log('second guess', res)
            // res = false
        });
        
    if(req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password){
            res.json('success')
        } else {
            res.status(400).json('Wrong Information')
        }
})

app.post('/register', (req,res)=>{
    const{email, name, password} = req.body
    // bcrypt.hash(password, null, null, function(err, hash) {
    // console.log(hash) // Store hash in your password DB.
    // });
    
    database.users.push( {
        id :'125',
        name : name,
        email : email,
        password : password,
        entries : 0,
        joined : new Date()
    })
    res.json(database.users[database.users.length-1]);

})

app.get('/profile/:id', (req, res)=>{
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})

app.put('/image', (req,res)=>{
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if (!found) {
        res.status(400).json('not found')
    }
})



// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT = user
