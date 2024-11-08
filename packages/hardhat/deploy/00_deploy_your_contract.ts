import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployAmm: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  //usdc
  const usdc = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
  //cbETH
  const cbETH = "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22";
  //cbBTC
  // const cbBTC = "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf";

  // Deploy AMM
  const AMM = await hre.ethers.getContractFactory("AMM");
  const amm = await AMM.deploy(usdc, cbETH);

  console.log(`👋AMM contract deployed to: ${await amm.getAddress()}\n`);
};

export default deployAmm;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployAmm.tags = ["AMM"];
