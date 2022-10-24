const connection = require('./connection');

const listOfProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const productDetail = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

const insert = async (product) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [product.name],
  );
  return insertId;
};

const update = async (name, id) => connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?;',
    [name, id],
  );

module.exports = {
  listOfProducts,
  productDetail,
  insert,
  update,
};