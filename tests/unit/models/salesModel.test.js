const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");

const { newSales, saleDetails } = require("../mocks/mockModel");

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
      sinon.stub(connection, "execute").resolves([{ affectedRows: 1 }]);

      const result = await salesModel.insertSaleDetails(saleDetails);
      
      expect(result).to.equal(1);
    });

    it("Buscando detalhes de uma venda especifica", async function () {
      sinon.stub(connection, "execute").resolves([newSales]);

      const result = await salesModel.findBySaleId(saleDetails.saleId);

      expect(result).to.equal(newSales);
    });
  })
});
