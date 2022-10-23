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

const saleDetails = {
  saleId: 3,
  productId: 1,
  quantity: 1,
};

const newSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

module.exports = {
  products,
  newProduct,
  saleDetails,
  newSale,
};