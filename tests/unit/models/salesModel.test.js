const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const salesModel = require("../../../src/models/salesModel");

const { newSales } = require("../mocks/mockModel");

describe("Testes de unidade do model de vendas", function () {
  describe("Cadastrando vendas", async function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Realizando uma operação INSERT com o model sales', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: newSales.id }]);

      const result = await salesModel.insert(newSales.itemsSold);

      expect(result).to.equal(newSales.id);
    });
  })
});
