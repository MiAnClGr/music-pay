import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0x0753fcA4A017f5C4919A12D568a9c8045C9D30AD"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const PerformanceContractAddress = "0xf6631457ea66A3E2C08339C5cc422dF559077687"
export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
