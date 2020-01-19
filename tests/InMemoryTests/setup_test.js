var testServer;
before(function () {
    testServer = require('../../src/api/server');
});
after(function (done) {
    testServer.close(done);
});