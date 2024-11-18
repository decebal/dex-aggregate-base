import { expect } from "chai";
import { ethers } from "hardhat";
import { ClamAggregator, MockRouter, MockToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("ClamAggregator", function () {
  let clamAggregator: ClamAggregator;
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

    // Deploy ClamAggregator with mock routers
    const ClamAggregatorFactory = await ethers.getContractFactory("ClamAggregator");
    clamAggregator = (await ClamAggregatorFactory.deploy(
      mockUniswap.target,
      mockAerodrome.target,
      mockUniswap.target,
    )) as ClamAggregator;
    await clamAggregator.waitForDeployment();

    // Deploy mock tokens
    const MockTokenFactory = await ethers.getContractFactory("MockToken");
    tokenA = (await MockTokenFactory.deploy()) as MockToken;
    await tokenA.waitForDeployment();

    tokenB = (await MockTokenFactory.deploy()) as MockToken;
    await tokenB.waitForDeployment();
  });

  describe("Access Control", function () {
    it("should assign DEFAULT_ADMIN_ROLE to the owner", async function () {
      const adminRole = await clamAggregator.DEFAULT_ADMIN_ROLE();
      expect(await clamAggregator.hasRole(adminRole as any, owner.address as any)).to.be.true;
    });

    it("should assign PAUSER_ROLE to the owner", async function () {
      const pauserRole = await clamAggregator.PAUSER_ROLE();
      expect(await clamAggregator.hasRole(pauserRole as any, owner.address as any)).to.be.true;
    });
  });

  describe("Swaps", function () {
    it("should perform a swap with the best price from Uniswap or Aerodrome", async function () {
      const amountIn = ethers.parseEther("1");
      const amountOutMin = ethers.parseEther("0.9");

      await tokenA.mint(addr1.address as any, amountIn as any);
      await tokenA.connect(addr1).approve(clamAggregator.target as any, amountIn as any);

      const path = [tokenA.target, tokenB.target];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      await expect(
        clamAggregator
          .connect(addr1)
          .swapTokens(amountIn as any, amountOutMin as any, path as any, addr1.address as any, deadline as any),
      ).to.emit(clamAggregator, "TokensSwapped");
    });
  });

  describe("Pausable", function () {
    it("should allow the owner to pause and unpause swaps", async function () {
      await clamAggregator.connect(owner).pause();
      expect(await clamAggregator.paused()).to.be.true;

      await clamAggregator.connect(owner).unpause();
      expect(await clamAggregator.paused()).to.be.false;
    });

    it("should revert swap when paused", async function () {
      await clamAggregator.connect(owner).pause();

      const amountIn = ethers.parseEther("1");
      const amountOutMin = ethers.parseEther("0.9");
      const path = [tokenA.target, tokenB.target];
      const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      await expect(
        clamAggregator
          .connect(addr1)
          .swapTokens(amountIn as any, amountOutMin as any, path as any, addr1.address as any, deadline as any),
      ).to.be.revertedWithCustomError(clamAggregator, "EnforcedPause");
    });
  });
});
