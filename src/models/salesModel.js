const camelize = require('camelize');
const connection = require('./connection');

const getAllSalesDetails = async () => {
  const [result] = await connection.execute(
    `SELECT details.sale_id, sales_date.date, details.product_id, details.quantity 
    FROM StoreManager.sales_products AS details
    INNER JOIN StoreManager.sales AS sales_date
    ON details.sale_id = sales_date.id;`,
  );

  return camelize(result);
};

const getSalesDetailsById = async (id) => {
  const [result] = await connection.execute(
    `SELECT sales_date.date, details.product_id, details.quantity 
    FROM StoreManager.sales_products AS details
    INNER JOIN StoreManager.sales AS sales_date
    ON details.sale_id = sales_date.id
    WHERE sale_id = ?;`,
    [id],
  );

  return camelize(result);
};

const getSaleDate = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?;',
    [id],
  );

  return result;
};

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
  getAllSalesDetails,
  getSalesDetailsById,
  getSaleDate,
  findBySaleId,
  insertNewSaleDate,
  insertSaleDetails,
};
