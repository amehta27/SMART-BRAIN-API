const express = require('express')
// const bodyParser = require('body-parser')
const app =  express();
// app.use(express.bodyParser.urlencoded({
//     extended: true
//   }));
app.use(express.json());
// app.use(express.urlencoded({extended: false}));


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

    ]
}

app.get('/', (req,res)=>{
    res.send(database.users)
})

app.listen(3000, ()=> {
    console.log('app is running on port 3000')
})

app.post('/signin',(req,res)=>{
    if(req.body.email === database.users[0].email && 
        

        req.body.password === database.users[0].password){
            res.json('success')
        } else {
            res.status(400).json('error logging in')
        }
        // console.log(req.body)
        // console.log(req.body.email);
        // console.log(req.body.password);
        // console.log(database.users[0].email);
  
    // res.json('Signinig')
    // console.log('signing')
})

app.post('/register', (req,res)=>{
    const{email, name, password} = req.body
    console.log(email)
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

// / --> res = this is working
// /signin --> POST = success/fail
// /register --> POST = user
// /profile/:userId --> GET = user
// /image --> PUT = user
