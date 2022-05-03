import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import { adminCorrect } from './Responses/adminCorrect';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('When the model find the user', () => {
 
// Exemplo do uso de stubs com tipos

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves(adminCorrect as any);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('When posted with the correct login and password, the response is in the correct format', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        email: "admin@admin.com",
          password: "secret_admin"
        }).then((res) => {
          return res;
        });
    expect(chaiHttpResponse.status).to.deep.equal(200)
    expect(chaiHttpResponse.body?.user).not.to.be.undefined
    expect(chaiHttpResponse.body?.token).not.to.be.undefined
  });

  it('When posted with the wrong password, the response message has the correct alert text ', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "admin@admin.com",
       password: "secret_wrong"
     })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse.body).to.have.key('message')
      expect(chaiHttpResponse.body?.message).to.deep.equal('Incorrect email or password')
  });

  it('When posted with a wrong email format, the response message has the correct alert text', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "admin.com",
      password: "secret_wrong"
     })
      expect(chaiHttpResponse).to.have.status(401)
      expect(chaiHttpResponse.body).to.have.key('message')
      expect(chaiHttpResponse.body?.message).to.deep.equal('Incorrect email or password')
  });

  it('When posted without a password, the response message has the correct alert text', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
     email: "admin@admin.com",
     })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse.body).to.have.key('message')
      expect(chaiHttpResponse.body?.message).to.deep.equal('All fields must be filled')
  });

  it('When posted without an email, the response message has the correct alert text', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({     
      password: "secret_wrong"
     })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse.body).to.have.key('message')
      expect(chaiHttpResponse.body?.message).to.deep.equal('All fields must be filled')
  });

  it('When posted without an email, the response message has the correct alert text', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({     
      email: "admin@wrong.com",
      password: "secret_wrong"
     })
      expect(chaiHttpResponse).to.have.status(400)
      expect(chaiHttpResponse.body).to.have.key('message')
      expect(chaiHttpResponse.body?.message).to.deep.equal('Incorrect email or password')
  });
});

describe('When the model does not find the user', () => {
 
  // Exemplo do uso de stubs com tipos
  
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    it('When posted without an email, the response message has the correct alert text', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({     
        email: "admin@wrong.com",
        password: "secret_wrong"
       })
        expect(chaiHttpResponse).to.have.status(400)
        expect(chaiHttpResponse.body).to.have.key('message')
        expect(chaiHttpResponse.body?.message).to.deep.equal('Incorrect email or password')
    });
  });
