// test-setup.js
// Import the 'chai' module using 'esm' to make it compatible with ESM
import chai from 'esm'; // Change this import
// Use dynamic import to import chai

// Wait for the promise to resolve and then use chai
chai
  .then((chai) => {
    const chaiHttp = require("chai-http");
    const assert = require("assert");

    const server = require("../index.js");
    const conn = require("../src/config/mongooseConfig.js");
    const config = require("../src/config/config.js");

    chai.use(chaiHttp);
    const should = chai.should();

    const basePath = `${config.NODE_SERVER_URL.url}:${config.NODE_SERVER_PORT.port}`;

    // Continue with the rest of your test setup
  })
  .catch((error) => {
    console.error("Error importing chai:", error);
  });
