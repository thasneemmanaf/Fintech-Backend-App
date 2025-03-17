const request = require("supertest");
const app = require("./src/app");

const testRequest = request(app);

module.exports = {
  testRequest,
};
