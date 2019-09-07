const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

// test are not passing at the moment due to unauthorized

describe('GET /movie', () => {
    it('should return an array of movies', () => {
        return request(app)
          .get('/movie')
          .expect(200)
          .expect('Content-Type', /json/)
         .then(res => {
         expect(res.body).to.be.an('array');
         expect(res.body).to.have.lengthOf.at.least(1);
         const apps = res.body[0];
         expect(apps).to.include.all.keys('filmtv_ID', 'film_title', 'year', 'genre', 'duration', 'country', 'director', 'actors', 'avg_vote', 'votes');
       })
    })
    it('should be 400 if sort is incorrect', () => {
        return request(app)
          .get('/apps')
          .query({sort: 'MISTAKE'})
          .expect(400, 'Sort must be by genre, country, or avg_vote');
      })
    it('should return an array of movies based on genre', () => {
        return request(app)
          .get('/movie')
          .expect(200)
          .expect('Content-Type', /json/)
         .then(res => {
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf.at.least(1);
            const genres = res.body[0].genre;
            const genArray = ['Animation', 'Drama', 'Comedy', 'Romantic', 'Spy', 'Crime', 'Thriller', 'Adventure', 'Documentary', 'Horror', 'Action', 'Western', 'History', 'Biography', 'Musical', 'Fantasy', 'War', 'Grotesque'];
            expect(genre).to.be.oneOf(genArray);
       })
    })
    it('should sort by avg vote', () => {
        return request(app)
          .get('/movie')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            const avgVoteTest = res.body[0].avg_vote;
            expect(avgVoteTest).to.be.an('number');
            let i = 0;
            let sorted = true;
            while(sorted && i < res.body.length - 1) {
              sorted = sorted && res.body[i].avg_vote <= res.body[i + 1].avg_vote;
              i++;
            }
            expect(sorted).to.be.true;
          })
      })
    it('should sort by country', () => {
        return request(app)
          .get('/movie')
          .expect(200)
          .expect('Content-Type', /json/)
          .then(res => {
            const countryTest = res.body[0].country;
            expect(countryTest).to.be.an('string');
            let i = 0;
            let sorted = true;
            while(sorted && i < res.body.length - 1) {
              sorted = sorted && res.body[i].country < res.body[i + 1].country;
              i++;
            }
            expect(sorted).to.be.true;
          })
      })
});