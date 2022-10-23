const camelize = require('camelize');
const connection = require('./connection');

const findBySaleId = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  return camelize(result);
};

const insertNewSaleDate = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales (date) VALUES (DEFAULT);');
  return insertId;
};

const insertSaleDetails = async (saleId, productId, quantity) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
};

module.exports = {
  findBySaleId,
  insertNewSaleDate,
  insertSaleDetails,
};
