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

const returnServiceAllProducts = {
  status: 200,
  message: products,
};

const returnServiceByProductId = {
  status: 200,
  message: products[2],
};

module.exports = {
  returnServiceAllProducts,
  returnServiceByProductId,
};