import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Matches from '../database/models/Matches';
import { matchesByQueryCorrect, allTeamsMockCorrect, queryTeamsMockFalseCorrect,
   matchesCreatedResponse, matchFinishedResponse, matchRequest, matchRequestInvalidTeam, matchRequestSameTeam, matchUpdateGoals, matchPatchById, matchUpdateRequest, matchUpdateResponseCorrect } from './Mocks/matches';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the sucess cases for get method /matches', () => {
// Exemplo do uso de stubs com tipos
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves(allTeamsMockCorrect as any);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('When made a get request into /matches, respond with all Matches in DB', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matches')
       .then((res) => {
          return res;
        });
    expect(chaiHttpResponse.status).to.deep.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeamsMockCorrect);
  });

});

describe('Test the sucess cases for get method /matches?inProgress=true', () => {
 
  // Exemplo do uso de stubs com tipos
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves(matchesByQueryCorrect as any);
    });
  
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })
  
    it('When made a get request into /matches?inProgress=true, respond with the team that contains the key inProgress as true in DB', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=true')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesByQueryCorrect);
    });
  
  });

  describe('Test the sucess cases for get method /matches?inProgress=false', () => {
 
    // Exemplo do uso de stubs com tipos
    
      let chaiHttpResponse: Response;
    
      before(async () => {
        sinon
          .stub(Matches, "findAll")
          .resolves(queryTeamsMockFalseCorrect as any);
      });
    
      after(()=>{
        (Matches.findAll as sinon.SinonStub).restore();
      })
    
      it('When made a get request into /matches?inProgress=false, respond with the team that contains the key inProgress as false in DB', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .get('/matches?inProgress=false')
           .then((res) => {
              return res;
            });
        expect(chaiHttpResponse.status).to.deep.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(queryTeamsMockFalseCorrect);
      });
    
    });

describe('Test the failure cases for get method /matches and /matches?inProgress=true', () => {
 
  // Exemplo do uso de stubs com tipos
  
    let chaiHttpResponse: Response;
  
    before(async () => {      
        sinon
        .stub(Matches, "findAll")
        .resolves(null as any);
    });
  
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })
  
    it('When made a get request into /matches, and no match is found, respond with correct error response', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(400)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'No match has been found'});
    });

    it('When made a get request into /matches?inProgress=true, and no team is found, respond with correct error response', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=true')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(400)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'No match has been found'});
    });
  
    it('When made a get request into /matches?inProgress=true, and no team is found, respond with correct error response', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/matches?inProgress=false')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(400)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'No match has been found'});
    });
  });

  describe('Test the sucess cases for POST method AND PATCH method /matches', () => {
 
    // Exemplo do uso de stubs com tipos
    
      let chaiHttpResponse: Response;
    
      before(async () => {      
          sinon
          .stub(Matches, "create")
          .resolves(matchesCreatedResponse as any);
      });
    
      after(()=>{
        (Matches.create as sinon.SinonStub).restore();
      })
    
      it('When made a post request into /matches, and a match is created, respond with correct response', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .post('/matches')
           .send(matchRequest)
           .then((res) => {
              return res;
            });
        expect(chaiHttpResponse.status).to.deep.equal(201)
        expect(chaiHttpResponse.body).to.be.deep.equal(matchesCreatedResponse);
      });
  
      it('When made a PATCH request into /matches/:id/finish, changes the status of inProgress to false', async () => {

        (Matches.create as sinon.SinonStub).restore();
        sinon
        .stub(Matches, "update")
        .resolves(matchPatchById as any);

        chaiHttpResponse = await chai
           .request(app)
           .patch('/matches/1/finish')

        expect(chaiHttpResponse.status).to.deep.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(matchPatchById); 

        (Matches.update as sinon.SinonStub).restore();
      });

      it('When made a POST request into /matches, and a match is not created, respond with correct response', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .post('/matches')
           .send(matchRequestSameTeam)
           .then((res) => {
              return res;
            });
        expect(chaiHttpResponse.status).to.deep.equal(401)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams'});
      });
      
      it('When made a POST request into /matches, and one of the teams is null, respond with correct response', async () => {
        chaiHttpResponse = await chai
           .request(app)
           .post('/matches')
           .send(matchRequestInvalidTeam)
           .then((res) => {
              return res;
            });
        expect(chaiHttpResponse.status).to.deep.equal(404)
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!'});
      });
      
      it('When made a PATCH request into /matches/:id, update the number of goals made in the game', async () => {
        sinon
        .stub(Matches, "update")
        .resolves(matchUpdateResponseCorrect as any);

        sinon
        .stub(Matches, "create")
        .resolves(matchesCreatedResponse as any);

        chaiHttpResponse = await chai
           .request(app)
           .patch('/matches/48')
           .send(matchUpdateRequest);

        expect(chaiHttpResponse.status).to.deep.equal(200)
        expect(chaiHttpResponse.body).to.be.deep.equal(matchUpdateResponseCorrect);

        (Matches.update as sinon.SinonStub).restore();
      });

    });