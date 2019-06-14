const Product = require("../../models/product");

const { transformProduct } = require("./merge");

module.exports = {
  products: async () => {
    try {
      const products = await Product.find({ deleted: false });
      return products.map(product => {
        return transformProduct(product);
      });
    } catch (err) {
      throw err;
    }
  },

  product: async args => {
    try {
      const product = await Product.findById(args.id);
      return transformProduct(product);
    } catch (err) {
      throw err;
    }
  },

  productByCode: async args => {
    try {
      const product = await Product.findOne({ codes: args.code });
      return transformProduct(product);
    } catch (err) {
      throw err;
    }
  },

  subcategoryProducts: async args => {
    try {
      const products = await Product.find({ subcategories: args.id });
      return products.map(product => {
        return transformProduct(product);
      });
    } catch (err) {
      throw err;
    }
  },

  createProduct: async args => {
    const product = Product({
      ...args.productInput
    });

    try {
      const result = await product.save();
      return transformProduct(result);
    } catch (err) {
      throw err;
    }
  },

  updateProduct: async args => {
    try {
      const result = await Product.findOneAndUpdate(
        { _id: args.id },
        { ...args.productInput },
        { new: true }
      )
      return transformProduct(result);
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async args => {
    try {
      const product = await Product.findByIdAndDelete(args.id);
      return transformProduct(product);
    } catch (err) {
      throw err;
    }
  }
};
