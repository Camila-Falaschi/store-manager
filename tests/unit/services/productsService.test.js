const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const productsService = require("../../../src/services/productsService");
const valuesValidations = require("../../../src/services/validations/valuesValidations");
const { products, productDetail, newProduct, productUpdated, newProductDetails } = require("../mocks/mockService");

describe("Testes de unidade do service de produtos", function () {
  describe("Listando produtos", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Em caso de sucesso retorna um array com todos produtos", async function () {
      sinon.stub(productsModel, "listOfProducts").resolves(products);

      const result = await productsService.getAllProducts();

      expect(result.message).to.be.a("array");
      expect(result.message).to.be.equal(products);
    });

    it("Em caso de sucesso retorna o produto que possui o id informado", async function () {
      sinon.stub(productsModel, "productDetail").resolves(productDetail);

      const result = await productsService.getProductById(2);

      expect(result.message).to.be.equal(productDetail);
    });
  });

  describe('Cadastrando novo produto', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Cadastro de produto', async function () {
      sinon.stub(productsModel, "insert").resolves([{ insertId: newProduct.id }]);
      sinon.stub(productsModel, "productDetail").resolves(newProduct);

      const result = await productsService.newProductRegistration("ProdutoX");

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newProduct);
    });
  })

  describe("Atualizando detalhes de um produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Atualizando produto", async function () {
      sinon.stub(valuesValidations, "validateProductId").resolves({ type: null, message: '' });
      sinon.stub(productsModel, "update").resolves(productUpdated);
      sinon.stub(productsModel, "productDetail").resolves(newProductDetails);

      const result = await productsService.updateProductDetail(newProductDetails.name, newProductDetails.id);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newProductDetails);
    });
  });

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Em caso de erro por id não encontrado o model retorna uma messagem", async function () {
      sinon.stub(productsModel, "productDetail").resolves(undefined);

      const error = await productsService.getProductById(99999);

      expect(error.type).to.equal("PRODUCT_NOT_FOUND");
      expect(error.message).to.equal("Product not found");
    });
  });
});
