const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");

const { expect } = require("chai");
chai.use(sinonChai);

const salesService = require("../../../src/services/salesService");
const salesController = require("../../../src/controllers/salesController");
const { newSale, returnServiceNewSale, returnServiceAllSales,
  returnServiceSalesById } = require("../mocks/mockController");

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

  describe("Listando vendas", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Listando todas as vendas", async function () {
      const res = {};
      const req = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getAllSales").resolves(returnServiceAllSales);

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(returnServiceAllSales.message);
    });

    it("Listando as vendas por Id", async function () {
      const res = {};
      const req = { params: { id: 2 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getSalesById").resolves(returnServiceSalesById);

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(returnServiceSalesById.message);
    });
  });

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
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

    it("Se id da venda não é encontrado", async function () {
      const res = {};
      const req = { params: { id: 99999 } };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, "getSalesById").resolves({
        type: "SALE_NOT_FOUND",
        message: "Sale not found",
      });

      await salesController.getSalesById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({
        message: "Sale not found",
      });
    });
  });
});
