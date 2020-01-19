# Test Demos

These are some sample tests for a running node express server.

## Locations

- src/web - create-react-app for browser testing, not yet implemented
- src/api - the test api server
- tests/EndToEndTests - tests to run against a live server, eg in a build pipeline
- tests/InMemoryTests - tests that start their own server and can mock dependencies

## EndToEnd Tests

1. Start the server:
    - cd src/api
    - npm start
1. Run the tests
    - cd ../../tests/EndToEndTests
    - npm test
1. Stop the server

## In Memory Tests

1. Run the tests
    - cd tests/InMemoryTests
    - npm test