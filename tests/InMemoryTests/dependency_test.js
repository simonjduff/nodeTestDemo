var assert = require('assert');
var request = require ('request-promise');
var errors = require ('request-promise/errors');
var sinon = require('sinon');
var database = require('../../src/api/services/database');

describe('Failing dependency', () => {
    it('should fail without faking the database', async () => {
        var statusCode;
        var response = await request({
            uri: '/databaseCall',
            baseUrl: 'http://localhost:3000',
            resolveWithFullResponse: true
        }).catch(errors.StatusCodeError, (reason) => 
            statusCode = reason.statusCode
        );

        assert.equal(statusCode, 500);
    });
});

describe('Stubbed dependency', () => {
    before(function(){
        sinon.stub(database, 'fetchData');
    });
    after(function(){
        database.fetchData.restore();
    });

    it('should call a fake dependency when under test', async () => {
        
        var response = await request({
            uri: '/databaseCall',
            baseUrl: 'http://localhost:3000',
            resolveWithFullResponse: true
        });

        assert.equal(response.statusCode, 200);
    });
});