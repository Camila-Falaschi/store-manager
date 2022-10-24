// Para o desenvolvimento dessa listagem de erros foi consultado o projeto TrybeCar desenvolvido nas aulas do curso da Trybe

const errorTypes = {
  EMPTY_VALUE: 400,
  PRODUCT_NOT_FOUND: 404,
  SALE_NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

// para os status de erro foi consultado a documentação no MDN (https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status)

const errorStatus = (type) => errorTypes[type] || 500;

module.exports = {
  errorTypes,
  errorStatus,
};