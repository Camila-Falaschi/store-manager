const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
chai.use(sinonChai);

const salesService = require("../../../src/services/salesService");
const salesController = require("../../../src/controllers/salesController");
const {
  newSale,
  returnServiceNewSale,
} = require("../mocks/mockController");

describe("Testes de unidade do controller de vendas", function () {
  describe("Cadastrando nova venda", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Cadastro de venda", async function () {
      const res = {};
      const req = { body: newSale.itemsSold };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "newSalesRegistration").resolves(returnServiceNewSale);

      await salesController.newSalesRegistration(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(returnServiceNewSale.message);
    });
  });

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
    });
    
    it("Se não foi informado o id do produto vendido", async function () {
      const res = {};
      const req = { body: [{ productId: null, quantity: 1 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesController, "newSalesRegistration").resolves({
        status: 400,
        message: '"productId" is required',
      });

      await salesController.newSalesRegistration(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"productId" is required');
    });

    it("Se não foi informado a quantidade do produto vendido", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: null }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesController, "newSalesRegistration").resolves({
        status: 400,
        message: '"quantity" is required',
      });

      await salesController.newSalesRegistration(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith('"quantity" is required');
    });

    it("Se quantidade do produto for menor ou igual a zero", async function () {
      const res = {};
      const req = { body: [{ productId: 1, quantity: 0 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesController, "newSalesRegistration").resolves({
        status: 422,
        message: '"quantity" must be greater than or equal to 1',
      });

      await salesController.newSalesRegistration(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith('"quantity" must be greater than or equal to 1');
    });

    it("Se o produto do id informado não é encontrado", async function () {
      const res = {};
      const req = { body: [{ productId: 99999, quantity: 2 }] };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "newSalesRegistration").resolves({
        type: "PRODUCT_NOT_FOUND",
        message: "Product not found",
      });

      await salesController.newSalesRegistration(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found" });
    });
  });
});
