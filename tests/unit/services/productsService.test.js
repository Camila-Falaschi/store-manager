const { expect } = require("chai");
const sinon = require("sinon");

const { productsModel } = require("../../../src/models");
const productsService = require("../../../src/services/productsService");
const { products, productDetail, newProduct } = require("../mocks/mockService");

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

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Em caso de erro por id inválido o model retorna uma messagem", async function () {
      sinon.stub(productsModel, "productDetail").resolves(undefined);

      const error = await productsService.getProductById(0);

      expect(error.type).to.equal("INVALID_VALUE");
      expect(error.message).to.equal('\"id\" must be greater than or equal to 1');
    });

    it("Em caso de erro por id não encontrado o model retorna uma messagem", async function () {
      sinon.stub(productsModel, "productDetail").resolves(undefined);

      const error = await productsService.getProductById(99999);

      expect(error.type).to.equal("PRODUCT_NOT_FOUND");
      expect(error.message).to.equal("Product not found");
    });

    it("Erro ao tentar cadastrar um novo produto sem nome", async function () {
      const result = await productsService.newProductRegistration('');

      expect(result.type).to.equal("EMPTY_VALUE");
      expect(result.message).to.equal('"name" is required');
    })

    it("Erro ao tentar cadastrar um novo produto com menos de 5 caracteres", async function () {
      const result = await productsService.newProductRegistration('a');

      expect(result.type).to.equal("INVALID_VALUE");
      expect(result.message).to.equal('"name" length must be at least 5 characters long');
    });
  });
});
