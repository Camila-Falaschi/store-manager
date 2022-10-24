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

const findSaleById = [
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

const returnServiceAllSales = {
  status: 200,
  message: allSales,
};

const returnServiceSalesById = {
  status: 200,
  message: findSaleById,
};

module.exports = {
  newProduct,
  returnServiceAllProducts,
  returnServiceByProductId,
  returnServiceNewProduct,
  newSale,
  returnServiceNewSale,
  returnServiceAllSales,
  returnServiceSalesById,
};