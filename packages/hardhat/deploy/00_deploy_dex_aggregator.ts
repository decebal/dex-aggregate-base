import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys DexAggregator on a testnet with cbETH and USDC as the tokens
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployDexAggregator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Token and router addresses on the testnet
  // const CBETH_ADDRESS = "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"; // cbETH address on the testnet
  // const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"; // USDC address on the testnet
  // const cbBTC = "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf";
  const UNISWAP_V3_ROUTER_ADDRESS = "0x050E797f3625EC8785265e1d9BDd4799b97528A1"; // Uniswap V3 Router address
  const AERODROME_ROUTER_ADDRESS = "0xYourAerodromeRouterAddress"; // Aerodrome Router address
  const QUOTER_ADDRESS = "0xC5290058841028F1614F3A6F0F5816cAd0df5E27"; // Quoter address for Uniswap V3

  // Deploy DexAggregator with the required constructor arguments
  await deploy("DexAggregator", {
    from: deployer,
    args: [UNISWAP_V3_ROUTER_ADDRESS, AERODROME_ROUTER_ADDRESS, QUOTER_ADDRESS],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract instance to interact with it
  const dexAggregator = await hre.ethers.getContract<Contract>("DexAggregator", deployer);
  console.log("DexAggregator deployed at:", dexAggregator.target);

  // If you want to initialize or configure the contract after deployment, add the logic here.
};

export default deployDexAggregator;
deployDexAggregator.tags = ["DexAggregator"];
