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

const productDetail = [{
  id: 2,
  name: "Traje de encolhimento",
}];

const newProduct = {
  id: 4,
  name: "ProdutoX",
};

const productUpdated = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 1  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const newProductDetails = {
  id: 1,
  name: "Martelo do Batman",
};

const saleDetails = {
  saleId: 3,
  productId: 1,
  quantity: 1,
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
  ]
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

const saleInsert = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "",
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

module.exports = {
  products,
  productDetail,
  newProduct,
  productUpdated,
  newProductDetails,
  saleDetails,
  newSale,
  allSales,
  returnSaleById,
  saleInsert,
};