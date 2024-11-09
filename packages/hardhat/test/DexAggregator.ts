import { expect } from "chai";
import { ethers } from "hardhat";
import { DexAggregator, MockRouter, MockToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("DexAggregator", function () {
  let dexAggregator: DexAggregator;
  let mockUniswap: MockRouter;
  let mockAerodrome: MockRouter;
  let tokenA: MockToken;
  let tokenB: MockToken;
  let owner: SignerWithAddress, addr1: SignerWithAddress;

  before(async () => {
    [owner, addr1] = await ethers.getSigners();

    // Deploy mock routers
    const MockRouterFactory = await ethers.getContractFactory("MockRouter");
    mockUniswap = (await MockRouterFactory.deploy()) as MockRouter;
    await mockUniswap.waitForDeployment();

    mockAerodrome = (await MockRouterFactory.deploy()) as MockRouter;
    await mockAerodrome.waitForDeployment();

    // Deploy DexAggregator with mock routers
    const DexAggregatorFactory = await ethers.getContractFactory("DexAggregator");
    dexAggregator = (await DexAggregatorFactory.deploy(
      mockUniswap.target,
      mockAerodrome.target,
      mockUniswap.target,
    )) as DexAggregator;
    await dexAggregator.waitForDeployment();

    // Deploy mock tokens
    const MockTokenFactory = await ethers.getContractFactory("MockToken");
    tokenA = (await MockTokenFactory.deploy()) as MockToken;
    await tokenA.waitForDeployment();

    tokenB = (await MockTokenFactory.deploy()) as MockToken;
    await tokenB.waitForDeployment();
  });

  describe("Access Control", function () {
    it("should assign DEFAULT_ADMIN_ROLE to the owner", async function () {
      const adminRole = await dexAggregator.DEFAULT_ADMIN_ROLE();
      expect(await dexAggregator.hasRole(adminRole as any, owner.address as any)).to.be.true;
    });

    it("should assign PAUSER_ROLE to the owner", async function () {
      const pauserRole = await dexAggregator.PAUSER_ROLE();
      expect(await dexAggregator.hasRole(pauserRole as any, owner.address as any)).to.be.true;
    });
  });

  describe("Swaps", function () {
    it("should perform a swap with the best price from Uniswap or Aerodrome", async function () {
      const amountIn = ethers.parseEther("1");
      const amountOutMin = ethers.parseEther("0.9");

      await tokenA.mint(addr1.address as any, amountIn as any);
      await tokenA.connect(addr1).approve(dexAggregator.target as any, amountIn as any);

      const path = [tokenA.target, tokenB.target];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      await expect(
        dexAggregator
          .connect(addr1)
          .swapTokens(amountIn as any, amountOutMin as any, path as any, addr1.address as any, deadline as any),
      ).to.emit(dexAggregator, "TokensSwapped");
    });
  });

  describe("Pausable", function () {
    it("should allow the owner to pause and unpause swaps", async function () {
      await dexAggregator.connect(owner).pause();
      expect(await dexAggregator.paused()).to.be.true;

      await dexAggregator.connect(owner).unpause();
      expect(await dexAggregator.paused()).to.be.false;
    });

    it("should revert swap when paused", async function () {
      await dexAggregator.connect(owner).pause();

      const amountIn = ethers.parseEther("1");
      const amountOutMin = ethers.parseEther("0.9");
      const path = [tokenA.target, tokenB.target];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      await expect(
        dexAggregator
          .connect(addr1)
          .swapTokens(amountIn as any, amountOutMin as any, path as any, addr1.address as any, deadline as any),
      ).to.be.revertedWithCustomError(dexAggregator, "EnforcedPause");
    });
  });
});
