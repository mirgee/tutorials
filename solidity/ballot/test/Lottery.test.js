const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const { abi, evm } = require('../compile');
const bytecode = evm.bytecode.object;

assert(abi, 'abi is undefined');
assert(bytecode, 'bytecode is undefined');

const web3 = new Web3(ganache.provider());

let accounts;
let lottery;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // Use one of those accounts to deploy the contract
  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('lottery', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  it('allows on account to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(1, players.length);
  })

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether')
    });

    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  })

  it('requires a minimum amount of ether', async () => {
    try {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 0
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  })

  it('only a manager can call pickWinnter', async () => {
    try {
      await lottery.methods.pickWinner().call({
        from: accounts[1]
      });
      assert(false);
    } catch (err) {
      assert(err);
    }
  })

  it('sends money to the winner and resets players array', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('2', 'ether')
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);

    await lottery.methods.pickWinnder().call({
      from: accounts[0]
    })

    const finalBalance = await web3.eth.getBalance(accounts[0]);
    assert(finalBalance - initialBalance > web3.utils.toWei('1.8', 'ether'));
  })
});
