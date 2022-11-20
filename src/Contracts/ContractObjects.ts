import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const PerformanceContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
