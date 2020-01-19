var request = require ('request-promise');
var sinon = require('sinon');
var database = require('../../src/api/services/database');
var chai = require('chai');
var should = chai.should();
const uuid = require('uuid/v1');
chai.use(require('chai-uuid'));

describe('Unit conversion', () => {
    beforeEach(function(){
        stubDatabase();
    });
    afterEach(function(){
        resetDatabase();
    });

    it('should convert to fahrenheit when requested', async () => {
        // Given a temperature reading
        var reading = {
            time: new Date().toISOString(),
            temp: 10.6
        };

        // When I submit the reading
        var postResponse = await request.post({
            uri: '/climate',
            querystring:{unit: 'fahrenheit'},
            baseUrl: 'http://localhost:3000',
            json: {
                time: reading.time,
                temp: reading.temp
            },
            resolveWithFullResponse: true,
        });
        postResponse.statusCode.should.equal(201);
        postResponse.body.id.should.be.a.uuid('v1');
        var id = postResponse.body.id;

        // And then I request the record
        var response = await request({
            uri: `/climate/${id}`,
            baseUrl: 'http://localhost:3000/',
            resolveWithFullResponse: true,
            json: true,
            qs:{unit: 'fahrenheit'}
        });

        // The status code is 200
        // And the data is returned
        response.statusCode.should.equal(200);
        response.body.id.should.equal(id);
        response.body.time.should.equal(reading.time);
        response.body.temp.value.should.equal(51.08);
        response.body.temp.unit.should.equal('fahrenheit');
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