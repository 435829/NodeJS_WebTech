// /**
//  * Created by bolin on 14-10-2017.
//  */
// request = require('supertest');
//
// // var expect = require('supertest').expect;
//
// describe('homepage', function () {
//     describe('show homepage', function () {
//         var options ={
//             url: 'http://localhost:3000/',
//             headers: {
//                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvYmVydFN0b3JtIiwiaWF0IjoxNTA3OTg4Mjg4fQ.27sbcELl6YRgabQ6AuG3nEAYXiDnVrTZDJC46VUfQGU',
//                 'Content-Type': 'text/plain'
//             }
//         };
//         it("returns status 200", function (done) {
//             // this.timeout(5000);
//             request(options, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             })
//         })
//     })
// });
//
// describe('Show Users API', function () {
//     describe('Show all users', function () {
//         var options ={
//             url: 'http://localhost:3000/api/users',
//             headers: {
//                 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlJvYmVydFN0b3JtIiwiaWF0IjoxNTA3OTg4Mjg4fQ.27sbcELl6YRgabQ6AuG3nEAYXiDnVrTZDJC46VUfQGU',
//                 'Content-Type': 'text/plain'
//             }
//         };
//         // var url = 'localhost:3000/api/users/';
//
//         it("returns status 200", function (done) {
//             request(options, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//     });
//
//
//     describe('Show 1 user', function () {
//         var url = 'localhost:3000/api/users/DavidHollegien';
//
//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             })
//         })
//     })
// });
//
// describe('Show Films API', function () {
//     describe('Show all films', function () {
//         var url = 'localhost:3000/api/films';
//
//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             })
//         })
//     });
//
//     describe('Show 1 film', function () {
//         var url = 'localhost:3000/api/films/test123';
//
//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             })
//         })
//     })
// });
//
// describe('Account', function () {
//     describe('Registrate new account', function () {
//         var url = 'localhost:3000/api/users/register';
//
//         it("returns status 201", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(201);
//                 done();
//             })
//         })
//     });
//
//     describe('login with existing account', function () {
//         var url = 'localhost:3000/api/login/authenticate';
//
//         it("returns status 200", function (done) {
//             request(url, function (error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             })
//         })
//     })
// });
//
