const request = require('supertest');

const {server, resetUsers} = require('./server');

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
                {id: 1, name: "jim"},
                {id: 2, name: "jane"}
            ])
        })
    })

    describe('post /users', ()=>{
        afterEach(async()=>{
            await resetUsers();
        })
        it('returns status code 201', async ()=>{
            const body = {id: 3, name: "tom"}
            const res = await request(server).post('/users').send(body);
            expect(res.status).toBe(201);
        })

        it('returns an id', async ()=>{
            const body = {id: 3, name: "tom"}
            const res = await request(server).post('/users').send(body);
            expect(res.body).toEqual({id: 3});
        })

        it('returns status code 400 on failure', async ()=>{
            const body = {name: "tom"}
            const res = await request(server).post('/users').send(body);
            expect(res.status).toBe(400);
        })

        it('returns an error message on failure', async ()=>{
            const body = {name: "tom"}
            const res = await request(server).post('/users').send(body);
            expect(res.body).toEqual({
                errorMessage: 'Failed to add user to database'
            })
        })
    })
    
    describe('delete /users/:id', ()=>{
        afterEach(async()=>{
            await resetUsers();
        })
        it('returns status code 200', async ()=>{
            const res = await request(server).delete('/users/2');
            expect(res.status).toBe(200);
        })

        it('returns the deleted users id', async ()=>{
            const res = await request(server).delete('/users/2');
            expect(res.body).toEqual({id: 2});
        })
        
        it('returns status code 400 on failure', async ()=>{
            const res = await request(server).delete('/users/3');
            expect(res.status).toBe(400);
        })

        it('returns an error message on failure', async ()=>{
            const res = await request(server).delete('/users/3');
            expect(res.body).toEqual({
                errorMessage: 'Failed to remove user from database'
            })
        })
    })
})