var request = require("request"),
assert = require('assert'),
app = require("../app.js"),
base_url = "http://localhost:3000/";


describe("Get Home Page", function() {
	describe("GET /", function() {
		it("returns status code 200", function(done) {
			request.get(base_url, function(error, response, body) {
				assert.equal(200, response.statusCode);
				done();
			});
		});
	});
});

describe("Get Login Session", function() {
	it("returns status code 200", function(done) {
		request.post(base_url+"getLoginSessionValues", function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});
});

describe("Get Cart Page", function() {
	describe("GET /", function() {
		it("returns status code 200", function(done) {
			request.get(base_url+'cart', function(error, response, body) {
				assert.equal(200, response.statusCode);
				done();
			});
		});
	});
});

describe("Get Invalid Search Page", function() {
	it("returns status code 404", function(done) {
		request.post(base_url+"search", function(error, response, body) {
			assert.equal(404, response.statusCode);
			done();
		});
	});
});


describe("Logout", function() {
	it("returns status code 200", function(done) {
		request.post(base_url+"logout", function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});
});


