const DataLoader = require("dataloader");

const { dateToString } = require("../../helpers/date");


//product
const productLoader = new DataLoader(productIds => {
  return getProducts(productIds);
});

const getProducts = async productIds => {
  try {
    const products = await Product.find({ _id: { $in: productIds } });
    return products.map(product => {
      return transformProduct(product);
    });
  } catch (err) {
    throw err;
  }
};

const getProduct = async productId => {
  try {
    return await productLoader.load(productId.toString());
  } catch (err) {
    throw err;
  }
};

//transform
const transformProduct = async product => {
  return {
    ...product._doc,
    subcategories: () => subcategoryLoader.loadMany(
      product._doc.subcategories.map((subcategory) => subcategory.toString())
    ),
    accessories: () => accessoryLoader.loadMany(
      product._doc.accessories.map((accesory) => accesory.toString())
    )
  };
};


exports.transformProduct = transformProduct;