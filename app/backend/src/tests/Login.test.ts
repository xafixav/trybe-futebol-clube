import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import Users from '../database/models/Users';
import { adminCorrect, adminToken, TokenInvalid, TokenInvalidSignature, TokenMalformed } from './Mocks/login';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Test the sucess cases for post method /login', () => {
 
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

describe('Test the failure cases for post method /login', () => {
 
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

  describe('Test the sucess cases for get method /login/validate', () => {
 
    // Exemplo do uso de stubs com tipos
    
      let chaiHttpResponse: Response;
    
      before(async () => {
        sinon
          .stub(Users, "findOne")
          .resolves(adminCorrect as Users);
      });
    
      after(()=>{
        (Users.findOne as sinon.SinonStub).restore();
      })
    
      it('When get request has the correct token in Authorization Headers, respond with the correct User role', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', adminToken);

          expect(chaiHttpResponse).to.have.status(200)
          expect(chaiHttpResponse.body).to.deep.equal('admin')
      });

    });

    describe('Test the failuer cases for get method /login/validate', () => {
 
      // Exemplo do uso de stubs com tipos
      
        let chaiHttpResponse: Response;
      
        before(async () => {
          sinon
            .stub(Users, "findOne")
            .resolves(adminCorrect as Users);
        });
      
        after(()=>{
          (Users.findOne as sinon.SinonStub).restore();
        })
      
        it('When get request has a Invalid Token in Authorization Headers, respond with ', async () => {
          chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set('Authorization', TokenMalformed);
  
            expect(chaiHttpResponse).to.have.status(400)
            expect(chaiHttpResponse.body).to.deep.equal({
              message: "jwt malformed"
            })
        });

        it('When get request has a Invalid Token in Authorization Headers, respond with ', async () => {
          chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set('Authorization', TokenInvalid);
  
            expect(chaiHttpResponse).to.have.status(400)
            expect(chaiHttpResponse.body).to.deep.equal({
              "message": "invalid token"
            })
        });

        it('When get request has a Invalid Token in Authorization Headers, respond with ', async () => {
          chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
          .set('Authorization', TokenInvalidSignature);
  
            expect(chaiHttpResponse).to.have.status(400)
            expect(chaiHttpResponse.body).to.deep.equal({
              "message": "invalid signature"
            })
        });

        it('When get request has a Invalid Token in Authorization Headers, respond with ', async () => {
          chaiHttpResponse = await chai
          .request(app)
          .get('/login/validate')
  
            expect(chaiHttpResponse).to.have.status(400)
            expect(chaiHttpResponse.body).to.deep.equal({
               message: 'Token not exist' 
              })
        });
  
      });
