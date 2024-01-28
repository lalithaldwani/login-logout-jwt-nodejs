const userService = require("../services/userService");
let util = require("../utilities/util");
const md5 = require("md5");
const authService = require("../utilities/authService");
const userValidate = require("../utilities/validateUser");

/**API to sign up the user data */
let userSignup = async (data, callback) => {
  try {
    const { error } = userValidate.validate(data);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return callback({
        statusCode: util.statusCode.FOUR_ZERO_ZERO,
        statusMessage: errorMessage,
      });
    }
    let criteria = {
      name: data.username.toLowerCase(),
    };
    let getUserByName = await userService.getUserName(criteria, {}, {});
    if (getUserByName) {
      return callback({
        statusCode: util.statusCode.FOUR_ZERO_NINE,
        statusMessage: util.statusMessage.USER_EXIST,
      });
    } else {
      var dataToSet = {
        name: data.username.toLowerCase(),
        password: md5(data.password),
      };
      let saveData = await userService.userSignup(dataToSet);
      if (saveData) {
        //let token = await authService.generateToken({  _id: saveData._id});
        return callback({
          statusCode: util.statusCode.OK,
          statusMessage: util.statusMessage.DATA_CREATED,
          data: {
            userid: saveData._id,
            username: saveData.name,
            //token: token
          },
        });
      } else {
        return callback({
          statusCode: util.statusCode.FOUR_ZERO_ONE,
          statusMessage: util.statusMessage.SERVER_BUSY,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return callback({
      statusCode: util.statusCode.FOUR_ZERO_ZERO,
      statusMessage: util.statusMessage.BAD_REQUEST,
    });
  }
};

/**API to sign in the user */
let userSignin = async (data, callback) => {
  try {
    const { error } = userValidate.validate(data);
    if (error) {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      return callback({
        statusCode: util.statusCode.FOUR_ZERO_ZERO,
        statusMessage: errorMessage,
      });
    }
    let isAuthenticated = await authenticateUser(data);

    if (isAuthenticated) {
      // If authentication is successful, generate a JWT token
      let token = await authService.generateToken({ _id: isAuthenticated._id });
      if (token) {
        var criteria = {
          _id: isAuthenticated._id,
        };
        var dataToSet = {
          tokens: token,
        };
        userService.saveToken(criteria, dataToSet, {});
      }
      return callback({
        statusCode: util.statusCode.OK,
        statusMessage: util.statusMessage.LOGIN_SUCCESSFUL,
        data: {
          userid: isAuthenticated._id,
          username: isAuthenticated.name,
          token: token,
        },
      });
    } else {
      return callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: util.statusMessage.LOGIN_FAILED,
      });
    }
  } catch (error) {
    return callback({
      statusCode: util.statusCode.FOUR_ZERO_ZERO,
      statusMessage: util.statusMessage.BAD_REQUEST,
    });
  }
};

function authenticateUser(data) {
  var criteria = {
    name: data.username.toLowerCase(),
    password: md5(data.password),
  };
  let getUser = userService.getUser(criteria, {}, {});
  return getUser;
}

/**API to logout in the user */
let userLogout = async (data, callback) => {
  try {
    let bearerHeader = data.headers["authorization"];
    let bearer = bearerHeader.split(" ");
    let bearerToken = bearer[1];
    var token = bearerToken;

    var criteria = {
      _id: data.user._id,
    };
    let getUser = await userService.getUser(criteria, {}, {});
    //console.log(token.includes(getUser.tokens),getUser);
    if (token.includes(getUser.tokens)) {
      var dataToSet = {
        tokens: [],
      };
      userService.saveToken(criteria, dataToSet, {});
    }
    return callback({
      statusCode: util.statusCode.OK,
      statusMessage: util.statusMessage.LOGOUT_SUCCESSFUL,
    });
  } catch (error) {
    return callback({
      statusCode: util.statusCode.FOUR_ZERO_ZERO,
      statusMessage: util.statusMessage.BAD_REQUEST,
    });
  }
};

module.exports = {
  userSignup: userSignup,
  userSignin: userSignin,
  userLogout: userLogout,
};
