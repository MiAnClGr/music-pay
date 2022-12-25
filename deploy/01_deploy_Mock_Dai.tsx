import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const [userOne, userTwo] = await ethers.getSigners()

    await deploy("MockDai", {
        from: deployer,
        log: true
    })

    const MockDai : Contract = await ethers.getContract("MockDai")

    await MockDai.connect(userOne).mintDai(utils.parseEther('1000'))
    await MockDai.connect(userTwo).mintDai(utils.parseEther("1000"))
}
export default func

func.tags = ["MockDai"]