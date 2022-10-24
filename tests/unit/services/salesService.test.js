const { expect } = require("chai");
const sinon = require("sinon");

const salesModel = require("../../../src/models/salesModel");
const productsModel = require("../../../src/models/productsModel")
const salesService = require("../../../src/services/salesService");
const valuesValidations = require('../../../src/services/validations/valuesValidations')
const { allSales, returnSaleById, newSale, saleDetails, saleInsert } = require("../mocks/mockService");

describe("Testes de unidade do service de vendas", function () {
  describe('Cadastrando nova venda', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Cadastro de venda', async function () {
      sinon.stub(productsModel, "productDetail").resolves({ id: 1, name: 'Martelo de Thor' });
      sinon.stub(valuesValidations, "validateProductId").resolves({ type: null, message: '' });
      sinon.stub(salesModel, "insertNewSaleDate").resolves(saleDetails.saleId);
      sinon.stub(salesModel, "insertSaleDetails").resolves(saleInsert);
      sinon.stub(salesModel, "findBySaleId").resolves(newSale.itemsSold);

      const result = await salesService.newSalesRegistration([newSale.itemsSold]);

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(newSale);
    });
  })

  describe('Listando vendas', function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Listando detalhes de todas as vendas', async function () {
      sinon.stub(salesModel, "getAllSalesDetails").resolves(allSales);

      const result = await salesService.getAllSales();

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(allSales);
    })

    it("Listando detalhes de uma venda especificada pelo Id", async function () {
      sinon.stub(salesModel, "getSalesDetailsById").resolves(returnSaleById);

      const result = await salesService.getSalesById(2);

      expect(result.type).to.equal(null);
      expect(result.message).to.be.deep.equal(returnSaleById);
    });
  })

  describe("Atribuições de erros", function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Erro em caso de id não encontrado", async function () {
      sinon.stub(salesModel, "getSaleDate").resolves(undefined);

      const error = await salesService.getSalesById(99999);

      expect(error.type).to.equal("SALE_NOT_FOUND");
      expect(error.message).to.equal("Sale not found");
    });
  });
});
