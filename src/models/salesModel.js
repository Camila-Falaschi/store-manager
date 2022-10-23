const camelize = require('camelize');
const connection = require('./connection');

const findBySaleId = async (id) => {
  const [result] = await connection.execute(
    `SELECT product_id, quantity FROM StoreManager.sales_products WHERE sale_id = ?
    ORDER BY product_id;`,
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
  const [{ affectedRows }] = await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) 
    VALUES (?, ?, ?);`,
    [saleId, productId, quantity],
  );
  return affectedRows;
};

module.exports = {
  findBySaleId,
  insertNewSaleDate,
  insertSaleDetails,
};
