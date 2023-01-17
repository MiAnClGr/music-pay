import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { Contract, utils } from "ethers";
import * as dotenv from "dotenv";

dotenv.config()

const { PRIVATE_KEY_2 } : any = process.env


const func : DeployFunction = async (hre : HardhatRuntimeEnvironment) => {

    const {deployments, getNamedAccounts, getChainId} = hre
    const {deploy} = deployments

    const {deployer} = await getNamedAccounts()

    const chainId = await getChainId()

    console.log(chainId)

    const [userOne, userTwo] = await ethers.getSigners()

    const provider = 
    new ethers.providers.JsonRpcProvider(
        process.env.GOERLI_URL
        )

    const accountTwo = 
    new ethers.Wallet(
        PRIVATE_KEY_2, 
        provider
    )

    console.log(accountTwo.address)

    await deploy("MockDai", {
        from: deployer,
        log: true
    })

    const MockDai : Contract = await ethers.getContract("MockDai")

    console.log(MockDai.address)

    if(chainId == "31337"){
        await MockDai.connect(userOne).mintDai(utils.parseEther('1000'))
        await MockDai.connect(userTwo).mintDai(utils.parseEther('1000'))
    }
  
    if(chainId == "5" || chainId == "80001"){
        console.log("accessed")
        // await MockDai.mintDai(utils.parseEther('1000'))
        await MockDai.connect(accountTwo).mintDai(utils.parseEther('1000'))

        console.log(await MockDai.balanceOf(accountTwo.address))
    }
 
}   
export default func

func.tags = ["MockDai"]