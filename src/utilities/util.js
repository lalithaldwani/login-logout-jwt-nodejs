// Define Error Codes
let statusCode = {
  OK: 200,
  FOUR_ZERO_ZERO: 400,
  FOUR_ZERO_FOUR: 404,
  FOUR_ZERO_THREE: 403,
  FOUR_ZERO_ONE: 401,
  FOUR_ZERO_NINE: 409,
  FIVE_ZERO_ZERO: 500,
};

// Define Error Messages
let statusMessage = {
  SERVER_BUSY: "Our Servers are busy. Please try again later.",
  DATA_CREATED: "User registered successfully",
  SOMETHING_WENT_WRONG: " Something went wrong on the server",
  PARAMS_MISSING: "param missing",
  USER_EXIST: "Username already exists",
  BAD_REQUEST: "Bad Request",
  LOGIN_SUCCESSFUL: "Login successful",
  LOGIN_FAILED: "Authentication failed",
  LOGOUT_SUCCESSFUL: "Logout successful",
  LIST_CREATED: "Listing successful",
};

module.exports = {
  statusCode: statusCode,
  statusMessage: statusMessage,
};
