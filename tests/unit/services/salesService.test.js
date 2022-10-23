const { expect } = require("chai");
const sinon = require("sinon");

const { salesModel } = require("../../../src/models");
const salesService = require("../../../src/services/salesService");
const { newSale } = require("../mocks/mockService");

describe("Testes de unidade do service de vendas", function () {
  describe('Cadastrando nova venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Cadastro de venda', async function () {
      sinon.stub(salesModel, "insert").resolves([{ insertId: newSale.id }]);
      sinon.stub(salesModel, "saleDetails").resolves(newSale);

      const result = await salesService.newSalesRegistration("ProdutoX");

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(newSale);
    });
  })
});
