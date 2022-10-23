const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/salesModel");
const salesService = require("../../../src/services/salesService");
const { newSale, saleDetails } = require("../mocks/mockService");

describe("Testes de unidade do service de vendas", function () {
  describe('Cadastrando nova venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Cadastro de venda', async function () {
      sinon.stub(salesModel, "insertNewSaleDate").resolves([{ insertId: saleDetails.saleId }]);
      sinon.stub(salesModel, "insertSaleDetails").resolves([{ affectedRows: 1 }]);
      sinon.stub(salesModel, "findBySaleId").resolves([newSale.itemsSold]);

      const result = await salesService.newSalesRegistration([newSale.itemsSold]);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSale);
    });
  })
});
