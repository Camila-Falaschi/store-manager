const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
chai.use(sinonChai);

const productsService = require("../../../src/services/productsService");
const productsController = require("../../../src/controllers/productsController");
const {
  newProduct,
  returnServiceAllProducts,
  returnServiceByProductId,
  returnServiceNewProduct,
} = require("../mocks/mockController");

describe("Testes de unidade do controller de produtos", function () {
  describe("Listando produtos", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Se os produtos são listados", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getAllProducts").resolves(returnServiceAllProducts);

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(returnServiceAllProducts.message);
    });

    it("Se o produto do id informado é listado", async function () {
      const res = {};
      const req = { params: { id: 2 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getProductById").resolves(returnServiceByProductId);

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith( returnServiceByProductId.message);
    });
  });

  describe("Cadastrando novo produto", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Cadastro de produto", async function () {
      const res = {};
      const req = { body: { name: newProduct.name } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "newProductRegistration").resolves(returnServiceNewProduct);

      await productsController.newProductRegistration(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(returnServiceNewProduct.message);
    });
  });

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Se o produto do id informado é inválido", async function () {
      const res = {};
      const req = { params: { id: 0 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getProductById").resolves({
        type: "INVALID_VALUE",
        message: '\"productId\" must be greater than or equal to 1',
      });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: '\"productId\" must be greater than or equal to 1' });
    });

    it("Se o produto do id informado não é encontrado", async function () {
      const res = {};
      const req = { params: { id: 99999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "getProductById").resolves({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });

    it("Se não foi informado o nome do novo produto", async function () {
      const res = {};
      const req = { body: { name: "" } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "newProductRegistration").resolves({
        type: "EMPTY_VALUE",
        message: '"name" is required',
      });

      await productsController.newProductRegistration(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"name" is required');

      it("Se o nome do novo produto possui menos de 5 caracteres", async function () {
        const res = {};
        const req = { body: { name: 'a' } };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, "newProductRegistration").resolves({
          type: "INVALID_VALUE",
          message: '"name" length must be at least 5 characters long',
        });

        await productsController.newProductRegistration(req, res);

        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith('"name" length must be at least 5 characters long');
      });
    });
  });
});
