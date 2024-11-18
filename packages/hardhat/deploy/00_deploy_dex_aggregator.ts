import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys ClamAggregator on a testnet with cbETH and USDC as the tokens
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployClamAggregator: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Token and router addresses on the testnet

  const UNISWAP_V3_ROUTER_ADDRESS = "0x050E797f3625EC8785265e1d9BDd4799b97528A1"; // Uniswap V3 Router address
  // const AERODROME_ROUTER_ADDRESS = "0xYourAerodromeRouterAddress"; // Aerodrome Router address
  const AERODROME_ROUTER_ADDRESS = "0x050E797f3625EC8785265e1d9BDd4799b97528A1"; // Aerodrome Router address
  const QUOTER_ADDRESS = "0xC5290058841028F1614F3A6F0F5816cAd0df5E27"; // Quoter address for Uniswap V3

  // Deploy ClamAggregator with the required constructor arguments
  await deploy("ClamAggregator", {
    from: deployer,
    args: [UNISWAP_V3_ROUTER_ADDRESS, AERODROME_ROUTER_ADDRESS, QUOTER_ADDRESS],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract instance to interact with it
  const ClamAggregator = await hre.ethers.getContract<Contract>("ClamAggregator", deployer);
  console.log("ClamAggregator deployed at:", ClamAggregator.target);

  // If you want to initialize or configure the contract after deployment, add the logic here.
};

export default deployClamAggregator;
deployClamAggregator.tags = ["ClamAggregator"];
