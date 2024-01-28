// During the test, the env variable is set to test
process.env.NODE_ENV = "test";

// Use the 'esm' loader to enable ESM for CommonJS modules
import "esm/register"; // Change this line
import "./test-setup.js";

// Import other necessary modules
import chai from "chai";
import chaiHttp from "chai-http";
import assert from "assert";
import server from "../index.js";
// Import conn and userModel if they are not globally available
// import conn from '../src/config/mongooseConfig.js';
// import { userModel } from '../models/userModel.js';

// Use Chai plugins
chai.use(chaiHttp);
const should = chai.should();

let token = "";

describe("DB Connection", () => {
  before((done) => {
    console.log("Before hook");
    conn;
    console.log(conn);
    done();
  });

  beforeEach(async () => {
    console.log("BeforeEach hook");
    userModel.collection.drop();
    const userData = {
      username: "lalit",
      password: 123456,
    };

    const res = await chai.request(server).post("/user/signin").send(userData);

    console.log("===================" + res.body.data);
    token = res.body.data.token;
    console.log(token);
    res.should.have.status(200);
  });

  after((done) => {
    console.log("After hook");
    userModel.collection.drop();
    done();
  });

  describe("/POST User user/signup", () => {
    it("it should POST a userData and register", async () => {
      console.log("Test case 1");
      const userDataPayload = {
        username: "lalit",
        password: 123456,
      };

      const res = await chai
        .request(server)
        .post("/user/signup")
        .set("Content-Type", "application/json")
        .send(userDataPayload);

      if (res.err) {
        assert.fail("user registration failed");
      }

      handleResponse(res, "success", "");
    });
  });

  describe.skip("get hotel details", () => {
    it("hotel id data fetch with token passing", async () => {
      console.log("Test case 2");
      const hotelId = "5d7a0481e95982440410127e";

      const res = await chai
        .request(server)
        .get(`/hotel/hotelDetail?hotelId=${hotelId}`)
        .set("Authorization", `Bearer ${token}`)
        .send();

      if (res.err) {
        assert.fail("hotel detail failed");
      }

      handleResponse(res, "success", "");
    });
  });
});

const handleResponse = (res, statusMsg, method) => {
  if (statusMsg === "success") {
    res.should.have.status(200);
    res.should.be.json;
    res.body.should.be.a("Object");
    res.body.should.have.property("statusCode");
    res.body.should.have.property("statusMessage");
    res.body.should.have.property("data");
  } else {
    res.should.have.status(500);
    res.should.be.json;
    res.body.should.be.a("Object");
    res.body.should.have.property("statusCode");
    res.body.should.have.property("statusMessage");
  }
};
