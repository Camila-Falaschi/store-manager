const products = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  }
];

const newProduct = {
  id: 4,
  name: "ProdutoX",
};

const returnServiceAllProducts = {
  status: 200,
  message: products,
};

const returnServiceByProductId = {
  status: 200,
  message: products[2],
};

const returnServiceNewProduct = {
  status: 200,
  message: newProduct,
};

const newSale = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

const returnServiceNewSale = {
  status: 201,
  message: newSale,
};

module.exports = {
  newProduct,
  returnServiceAllProducts,
  returnServiceByProductId,
  returnServiceNewProduct,
  newSale,
  returnServiceNewSale,
};