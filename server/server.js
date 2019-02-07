const express = require('express');

const server = express();
server.use(express.json());

const users = [
    {name: "jim"},
    {name: "jane"}
]

server.get('/users', async (req, res)=>{
    res.status(200).json({users: users});
})

server.get('/users/:id', async (req, res)=>{
    
})

server.post('/users', async (req, res)=>{
    
})

server.delete('/users/id', async (req, res)=>{
    
})

module.exports =  server;