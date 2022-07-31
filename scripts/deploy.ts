import {ethers} from "hardhat"

async function main() {
  
  const artistFactoryDeployer  = await ethers.getContractFactory("ArtistFactory");
  const artistFactory = await artistFactoryDeployer.deploy();

  await artistFactory.deployed();

  console.log(artistFactory.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
