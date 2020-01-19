/*
* These tests show coverage simple data fetch and store operations
*/

var request = require ('request-promise');
var errors = require ('request-promise/errors');
var sinon = require('sinon');
var database = require('../../src/api/services/database');
var chai = require('chai');
var should = chai.should();
const uuid = require('uuid/v1');
chai.use(require('chai-uuid'));

describe('Climate storage', () => {
    beforeEach(function(){
        stubDatabase();
    });
    afterEach(function(){
        resetDatabase();
    });

    describe('Storing data', () => {
        it('should store the data', async () => {
            // Given a temperature reading
            var reading = {
                time: new Date().toISOString(),
                temp: 10.6
            };
    
            // When I submit the reading
            var response = await request.post({
                uri: '/climate',
                baseUrl: 'http://localhost:3000',
                json: {
                    time: reading.time,
                    temp: reading.temp
                },
                resolveWithFullResponse: true
            });
    
            // The status code should be 201 Created
            // And the data is echoed back along with a new id
            response.statusCode.should.equal(201);
            response.body.id.should.be.a.uuid('v1');
            response.body.temp.value.should.equal(reading.temp);
            response.body.temp.unit.should.equal('celsius');
            response.body.time.should.equal(reading.time);
        });
    });
    
    describe('Retrieving data', function(){
        it('should retrieve a given record', async function(){
            // Given a known record id
            var id = database.storeData(120.2, '2020-01-19T15:39:45.232Z').id;
    
            // When I request the record
            var response = await request({
                uri: `/climate/${id}`,
                baseUrl: 'http://localhost:3000/',
                resolveWithFullResponse: true,
                json: true
            });
    
            // The status code is 200
            // And the data is returned
            response.statusCode.should.equal(200);
            response.body.id.should.equal(id);
            response.body.time.should.equal('2020-01-19T15:39:45.232Z');
            response.body.temp.value.should.equal(120.2);
            response.body.temp.unit.should.equal('celsius');
        });

        it('should respond 404 for an unknown id', async () => {
            // Given a nonn-existant record id
            var id = 'Definitely does not exist';
                
            // When I request the record
            var statusCode;
            var response = await request({
                uri: `/climate/${id}`,
                baseUrl: 'http://localhost:3000/',
                resolveWithFullResponse: true,
                json: true
            }).catch(errors.StatusCodeError, (reason) => {
                statusCode = reason.statusCode;
            });

            // The status code is 404
            statusCode.should.equal(404);
        });
    });
    
    describe('Submitting and Retrieving data', function(){
        it('should retrieve a submitted record', async function(){
            // Given a temperature reading
            var reading = {
                time: new Date().toISOString(),
                temp: 10.6
            };
    
            // When I submit the reading
            var postResponse = await request.post({
                uri: '/climate',
                baseUrl: 'http://localhost:3000',
                json: {
                    time: reading.time,
                    temp: reading.temp
                },
                resolveWithFullResponse: true
            });
            postResponse.statusCode.should.equal(201);
            postResponse.body.id.should.be.a.uuid('v1');
            var id = postResponse.body.id;
    
            // And then I request the record
            var response = await request({
                uri: `/climate/${id}`,
                baseUrl: 'http://localhost:3000/',
                resolveWithFullResponse: true,
                json: true
            });
    
            // The status code is 200
            // And the data is returned
            response.statusCode.should.equal(200);
            response.body.id.should.equal(id);
            response.body.time.should.equal(reading.time);
            response.body.temp.value.should.equal(reading.temp);
            response.body.temp.unit.should.equal('celsius');
        });
    });
    
    function stubDatabase(){
        database.__testData = {};
        sinon.stub(database, 'fetchData').callsFake((id) => {
            if (!(id in database.__testData)){
                return {};
            }
    
            return {
                id: id,
                time: database.__testData[id].time,
                temp: database.__testData[id].temp
            }
        });
        sinon.stub(database, 'storeData').callsFake((temp, time) => {
            var id = uuid();
            database.__testData[id] = {temp: temp, time: time};
            return {
                id: id,
                temp: temp,
                time: time
            }
        });
    }
    
    function resetDatabase(){
        database.fetchData.restore();
        database.storeData.restore();
        database.__testData = {};
    }
});