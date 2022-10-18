const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const productsModel = require("../../../src/models/productsModel");

const { products, newProduct } = require("../mocks/mockModel");

describe("Testes de unidade do model de produtos", function () {
  describe("Listando os produtos", async function () {
    afterEach(() => {
      sinon.restore();
    });

    it("Retorna um array com todos os produtos", async function () {
      sinon.stub(connection, "execute").resolves([products]);

      const result = await productsModel.listOfProducts();

      expect(result).to.be.a("array");
      expect(result).to.be.deep.eq(products);
    });

    it("Retorna um array com um produto de acordo com o id especificado", async function () {
      sinon.stub(connection, "execute").resolves([[products[1]]]);

      const result = await productsModel.productDetail(2);

      expect(result).to.be.deep.equal(products[1]);
    });
  });
  describe('Cadastrando produtos', async function () {
    afterEach(() => {
      sinon.restore();
    });

    it('Realizando uma operação INSERT com o model products', async function () {
      sinon.stub(connection, "execute").resolves([{ insertId: newProduct.id }]);

      const result = await productsModel.insert(newProduct.name);

      expect(result).to.equal(newProduct.id);
    });
  })
});
