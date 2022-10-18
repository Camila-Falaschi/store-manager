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

module.exports = {
  newProduct,
  returnServiceAllProducts,
  returnServiceByProductId,
  returnServiceNewProduct,
};