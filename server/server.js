const express = require('express');

const server = express();
server.use(express.json());

let users = [
    {id: 1, name: "jim"},
    {id: 2, name: "jane"}
]

function resetUsers(){
    users = [
        {id: 1, name: "jim"},
        {id: 2, name: "jane"}
    ]
}

server.get('/users', async (req, res)=>{
    res.status(200).json({users: users});
})

server.post('/users', async (req, res)=>{
    const body = req.body;
    if(body.id && body.name){
        users.push(body);
        res.status(201).send({id: 3});
    }
    else{
        res.status(400).json({
            errorMessage: 'Failed to add user to database'
        })
    }
})

server.delete('/users/:id', async (req, res)=>{
    const id = parseInt(req.params.id);
    const userToDelete = users.find(user=>user.id === id)
    if(userToDelete){
        users.pop();
        res.status(200).json({id: userToDelete.id});
    }
    else{
        res.status(400).json({
            errorMessage: 'Failed to remove user from database'
        })
    }
})

module.exports =  {
    server,
    resetUsers
}