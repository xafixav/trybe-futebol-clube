import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Teams from '../database/models/Teams';
import { TeamsMocked, TeamId2Mock } from './Mocks/teams';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the sucess cases for get method /teams', () => {
 
// Exemplo do uso de stubs com tipos

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves(TeamsMocked as any);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('When made a get request into /teams, respond with all teams in DB', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .then((res) => {
          return res;
        });
    expect(chaiHttpResponse.status).to.deep.equal(200)
    expect(chaiHttpResponse.body).to.be.deep.equal(TeamsMocked);
  });

});

describe('Test the sucess cases for get method /teams/:id', () => {
 
  // Exemplo do uso de stubs com tipos
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Teams, "findOne")
        .resolves(TeamId2Mock as any);
    });
  
    after(()=>{
      (Teams.findOne as sinon.SinonStub).restore();
    })
  
    it('When made a get request into /teams/:id, respond with the team that contains the :id in DB', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams/2')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(200)
      expect(chaiHttpResponse.body).to.be.deep.equal(TeamId2Mock);
    });
  
  });

describe('Test the failure cases for get method /teams and /teams:id', () => {
 
  // Exemplo do uso de stubs com tipos
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Teams, "findOne")
        .resolves(null as any);
      
        sinon
        .stub(Teams, "findAll")
        .resolves(null as any);
    });
  
    after(()=>{
      (Teams.findOne as sinon.SinonStub).restore();
      (Teams.findAll as sinon.SinonStub).restore();
    })
  
    it('When made a get request into /teams:id, and no team is found, respond with correct error response', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams/4')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(400)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found'});
    });

    it('When made a get request into /teams, and no team is found, respond with correct error response', async () => {
      chaiHttpResponse = await chai
         .request(app)
         .get('/teams')
         .then((res) => {
            return res;
          });
      expect(chaiHttpResponse.status).to.deep.equal(400)
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Team not found'});
    });
  
  });