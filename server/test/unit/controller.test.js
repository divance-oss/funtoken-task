const controller = require('../../src/controller');

describe('Fun Api Controller', () => {
  let testController;
  let handlerStatus = 0;
  let handlerResponse = {};

  beforeEach(() => {
    const web3 = { utils: { fromWei : () => 1000 } };
    const contract = {
      methods : { balanceOf: (address) => ({ call: () => 1000 }) },
    }
    testController = controller(web3, contract);
  });

  it('Should return user Balance', async () => {
    const req = { params: { id: '0x0001' }}
    const res = {
      json(body) { // can replace any with the strong type
        handlerResponse = body;
      },
      status(status) {
        handlerStatus = status;
        return this;
      },
    };

    await testController.getBalance(req, res)
    expect(handlerStatus).toBe(200)
    expect(handlerResponse.balance).toBe(1000)
  });
})
