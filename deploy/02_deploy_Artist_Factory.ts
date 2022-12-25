import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const MockDaiContract = await ethers.getContract("MockDai")

    await deploy("ArtistFactory", {
        from: deployer,
        args: [MockDaiContract.address],
        log: true
    })
}
export default func

func.tags = ["ArtistFactory"]