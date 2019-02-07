const request = require('supertest');

const server = require('./server');

describe('the route handlers', ()=>{
    describe('get /users', ()=>{
        it('returns status code 200', async ()=>{
            const res = await request(server).get('/users');
            expect(res.status).toBe(200);
        })

        it('returns a json object', async ()=>{
            const res = await request(server).get('/users');
            expect(res.type).toMatch(/json/i);
        })

        it('returns an array of users', async ()=>{
            const res = await request(server).get('/users');
            expect(res.body.users).toEqual([
                {name: "jim"},
                {name: "jane"}
            ])
        })
    })
})