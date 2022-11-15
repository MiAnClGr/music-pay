import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from './ABI/ArtistFactory'
import ArtistProfileABI from './ABI/ArtistProfile'
import PerformanceContractABI from "./ABI/PerformanceContract"

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const PerformanceContractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
