let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../bin/www');

chai.use(chaiHttp);

/**
 * Tests the POST request /copy_text with several cases.
 * The test server must be running first.
 */
describe('/copy_text', () => {
    it('should save no file name as script.py', (done) => {
       chai.request('localhost:3000')
           .post('/copy_text')
           .type('text/json')
           .send({
               'method_': 'post',
               'fileName': '',
               'codeArea': ''
           })
           .end(function (err, res) {
              chai.expect(err).to.be.null;
              chai.expect(res).to.have.status(200);
              chai.expect(res.body).to.have.property('file_name').equal("script.py");
           });
       done();
    });
});
