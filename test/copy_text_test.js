// FILE: copy_text_test.js
// AUTHOR: Nathan Robertson
// PURPOSE: Tests valid and invalid POST requests to the copy_text URL

let assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require('../app.js');

chai.use(chaiHttp);

/**
 * Tests the POST request /copy_text with several cases.
 * The server cannot be running in another process while running these test cases.
 */
describe('valid /copy_text', function () {
    // TEST OF SUCCESSFUL FILE NAMES

    // test empty text box
    it('should save no file name as script.py', function (done) {
       chai.request(server)
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
              chai.expect(res.body).to.have.property('file_name', 'script.py');
              done();
           });

    });

    // test text box with name "file"
    it('should save file as file.py', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                fileName: 'file',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('file_name', 'file.py');
                done();
            });
    });

    // test text box with name "file.py"
    it('should save file.py as file.py', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': 'file.py',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('file_name', 'file.py');
                done();
            });

    });

    // test text box with name "file.py"
    it('should save file.py.py as file.py', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': 'file.py.py',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.be.null;
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.have.property('file_name', 'file.py');
                done();
            });

    });



});


describe('invalid /copy_text', function () {
    // TEST UNSUCCESSFUL FILE NAMES

    // test text box with '?'
    it('should reject ? as a file name', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': '?',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.not.be.null;
                chai.expect(res).to.have.status(422);
                chai.expect(res.body.errors[0]).to.have.property("msg",'?, :, \\, |, and * cannot be used in file names.');
            });
        done();
    });

    it('should reject ?: as a file name', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': '?:',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.not.be.null;
                chai.expect(res).to.have.status(422);
                chai.expect(res.body.errors[0]).to.have.property("msg", '?, :, \\, |, and * cannot be used in file names.');
                done();
            });
    });

    it('should reject ?:\\|* as a file name', function (done) {
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': '?:\\|*',
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.not.be.null;
                chai.expect(res).to.have.status(422);
                chai.expect(res.body.errors[0]).to.have.property("msg", '?, :, \\, |, and * cannot be used in file names.');
                done();
            });

    });

    it('should reject strings longer than 100 characters', function (done) {
        let bigString = String().padStart(101, 'a');
        chai.request(server)
            .post('/copy_text')
            .type('text/json')
            .send({
                'method_': 'post',
                'fileName': bigString,
                'codeArea': ''
            })
            .end(function (err, res) {
                chai.expect(err).to.not.be.null;
                chai.expect(res).to.have.status(422);
                chai.expect(res.body.errors[0]).to.have.property("msg","File names must be 100 characters or less.");
                done();
            });

    });
});
