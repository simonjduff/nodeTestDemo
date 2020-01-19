var assert = require('assert');
var request = require ('request-promise');

describe('Healthcheck', () => {
    it('should return 200 ok', async () => {
        
        var response = await request({
            uri: '/healthcheck',
            baseUrl: 'http://localhost:3000',
            json: true,
            resolveWithFullResponse: true
        });

        assert.equal(response.statusCode, 200);
        assert.equal(true, response.body.healthy);
    })
});