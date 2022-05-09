import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Matches from '../database/models/Matches';
import { matchesByQuery, matchesByQueryCorrect, allTeamsMock, allTeamsMockCorrect, queryTeamsMockFalseCorrect, queryTeamsMockFalse } from './Mocks/matches';

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
      .resolves(allTeamsMock as any);
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
        .resolves(matchesByQuery as any);
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
          .resolves(queryTeamsMockFalse as any);
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