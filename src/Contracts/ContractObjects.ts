import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0x029e21Dfe6C66D319b06Fd4F890FDBA9041308d9"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const PerformanceContractAddress = "0xf4dD1a717ae5177BD85c827def57BdcFa4A1EC99"
export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
