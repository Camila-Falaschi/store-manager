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

const allSales = [
  {
    saleId: 1,
    date: "2022-10-24T03:54:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: "2022-10-24T03:54:00.000Z",
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: "2022-10-24T03:54:00.000Z",
    productId: 3,
    quantity: 15,
  },
];

const returnSaleById = [
  {
    date: "2022-10-24T03:54:00.000Z",
    productId: 1,
    quantity: 5,
  },
  {
    date: "2022-10-24T03:54:00.000Z",
    productId: 2,
    quantity: 10,
  },
];

const saleDate = {
  id: 2,
  date: "2022-10-23 21:52:48",
}

module.exports = {
  products,
  newProduct,
  saleDetails,
  newSale,
  allSales,
  returnSaleById,
  saleDate,
};