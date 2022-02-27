const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {

  let Token, owner, addr1, addr2, addr3, funToken;

  this.beforeEach(async () => {
    [owner, addr1, addr2, addr3] = await ethers.getSigners();
    Token = await ethers.getContractFactory("FunToken");
    funToken = await Token.deploy();
  })

  it("Should return name once it's deployed", async function() {
    expect(await funToken.name()).to.equal("Fun Token");
  });

  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await funToken.balanceOf(owner.address);
    expect(await funToken.totalSupply()).to.equal(ownerBalance);
  });

  it("Smart contract should be mintable", async function () {
    await funToken.mint(owner.address, '50000000000')
    expect(await funToken.totalSupply()).to.equal('100000000050000000000');
  });

  it("Smart contract should be burnable", async function () {
    await funToken.burn('50000000000')
    expect(await funToken.totalSupply()).to.equal('99999999950000000000');
  });


  it("Should transfer tokens between accounts", async function () {
    await funToken.transfer(addr1.address, 50);
    const addr1Balance = await funToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(50);

    await funToken.connect(addr1).transfer(addr2.address, 50);
    const addr2Balance = await funToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });


  it("Should fail if sender doesn’t have enough tokens", async function () {
    const initialOwnerBalance = await funToken.balanceOf(owner.address);

    await expect(
      funToken.connect(addr1).transfer(owner.address, 1)
    ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

    expect(await funToken.balanceOf(owner.address)).to.equal(
      initialOwnerBalance
    );
  });

  it("Should update balances after transfers", async function () {
    const initialOwnerBalance = await funToken.balanceOf(owner.address);

    await funToken.transfer(addr1.address, 100);

    await funToken.transfer(addr2.address, 50);

    const finalOwnerBalance = await funToken.balanceOf(owner.address);
    expect(finalOwnerBalance).to.equal(initialOwnerBalance.sub(150));

    const addr1Balance = await funToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(100);

    const addr2Balance = await funToken.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(50);
  });

});
