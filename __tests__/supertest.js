const request = require('supertest');
const fs = require('fs');
const path = require('path');

const server = 'http://localhost:8080';


describe('Route integration', () => {


  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/faves', () => {

    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/markets')
          .expect('Content-Type', /json/)
          .expect(200);
      });
      // For this test, you'll need to inspect the body of the response and
      // ensure it contains the markets list. Check the markets.dev.json file
      // in the dev database to get an idea of what shape you're expecting.
      it('markets from "DB" json are in body of response', () => {
        return request(server)
          .get('/markets')
          .expect((res) => {
            console.log('RESPONSE BODY: ', res.body);
            expect(res.body).toEqual(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../server/db/markets.test.json'), 'UTF-8')));
          });
      });
    });

  });
});
