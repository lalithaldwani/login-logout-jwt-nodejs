let util = require("../utilities/util");
const axios = require("axios");

/**API to list all products */
let productList = async (data, callback) => {
  try {
    let url = "https://dummyjson.com/products";
    let listProducts = await getAllProducts(url);
    if (listProducts) {
      return callback({
        statusCode: util.statusCode.OK,
        statusMessage: util.statusMessage.LIST_CREATED,
        data: { listProducts },
      });
    } else {
      return callback({
        statusCode: util.statusCode.FOUR_ZERO_ONE,
        statusMessage: util.statusMessage.SERVER_BUSY,
      });
    }
  } catch (error) {
    return callback({
      statusCode: util.statusCode.FOUR_ZERO_ZERO,
      statusMessage: util.statusMessage.BAD_REQUEST,
    });
  }
};

function getAllProducts(url) {
  let listData = axios.get(url).then((result) => {
    return result.data.products;
  });
  return listData;
}

module.exports = {
  productList: productList,
};
