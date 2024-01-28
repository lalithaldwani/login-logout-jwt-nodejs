var assert = require("assert");
//During the test the env variable is set to test
process.env.NODE_ENV = "test";
const server = require("../index");
const conn = require("../src/config/mongooseConfig");
const userModel = require("../src/models/userModel");
const basePath = "http://localhost:8000";
const axios = require("axios");
let token = "";
const md5 = require("md5");
const pw = "lalit@1234";
//Our parent block
describe("DB Connection", () => {
  before((done) => {
    conn;
    console.log(conn);
    done();
  });
  beforeEach(async function (done) {
    userModel.collection.drop();
    done();
  });
  after((done) => {
    userModel.collection.drop();
    done();
  });

  /*    
    This API is test for home screen Register (Normal) 
*/

  describe("/POST User Data user/signup", () => {
    it("it should POST a userData  and register", async () => {
      let userData = {
        username: "lalit1",
        password: pw,
      };

      try {
        // Make the HTTP request using axios
        const response =await  axios.post(`${basePath}/user/signup`, userData);
        // Assert the response status code or other conditions
        //assert.strictEqual(response.statusCode, 200);
        //handleResponse(response.data, "success", "");
      } catch (error) {
        throw error;
      }
      
    });
  });

  /******************************************************************************************************************* */
});

// const handleResponse = (res, statusMsg, method) => {
//   if (statusMsg === "success") {
//     res.should.have.status(200);
//     res.should.be.json;
//     res.body.should.be.a("Object");
//     res.body.should.have.property("statusMessage");
//     res.body.should.have.property("statusCode");
//     res.body.should.have.property("data");
//   } else {
//     res.should.be.json;
//     res.body.should.be.a("Object");
//     res.body.should.have.property("statusMessage");
//     res.body.should.have.property("statusCode");
//   }
// };
