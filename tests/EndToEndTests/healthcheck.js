var assert = require('assert');
var request = require ('request-promise');
var errors = require('request-promise/errors');

describe('Healthcheck', () => {
    it('should return 200 ok', async () => {
        var response = null;
        var body = null;

        await request({
            uri: '/healthcheck',
            baseUrl: 'http://localhost:3000',
            json: true,
            resolveWithFullResponse: true
        }).then((res) => {
            response = res;
        });

        assert.equal(response.statusCode, 200);
    })
});