const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");

const { newSales, saleDetails, allSales,
  returnSaleById, saleDate, saleInsert } = require("../mocks/mockModel");

describe("Testes de unidade do model de vendas", function () {
  describe("Cadastrando vendas", async function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Realizando uma operação INSERT com o model sales para cadastrar novo id e data', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: saleDetails.saleId }]);

      const result = await salesModel.insertNewSaleDate(newSales);

      expect(result).to.equal(saleDetails.saleId);
    });

    it("Realizando uma operação INSERT com o model sales_products para cadastrar detalhes da venda", async function () {
      sinon.stub(connection, "execute").resolves(saleInsert);

      const result = await salesModel.insertSaleDetails(saleDetails);
      
      expect(result[0].affectedRows).to.be.deep.equal(1);
    });

    it("Buscando detalhes de uma venda especifica", async function () {
      sinon.stub(connection, "execute").resolves([newSales]);

      const result = await salesModel.findBySaleId(saleDetails.saleId);

      expect(result).to.equal(newSales);
    });
  })

  describe("Listando detalhes de venda", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Listando todas as vendas", async function () {
      sinon.stub(connection, "execute").resolves([allSales]);

      const result = await salesModel.getAllSalesDetails();

      expect(result).to.be.deep.equal(allSales);
    })

    it("Listando vendas por Id", async function () {
      sinon.stub(connection, "execute").resolves([returnSaleById]);

      const result = await salesModel.getSalesDetailsById(2);

      expect(result).to.be.deep.equal(returnSaleById);
    });

    it("Listando datas das vendas por Id", async function () {
      sinon.stub(connection, "execute").resolves([saleDate]);

      const result = await salesModel.getSaleDate(2);

      expect(result).to.be.deep.equal(saleDate);
    });
  })
});
