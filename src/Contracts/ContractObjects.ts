import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0xA91C4f2D15FC3Ff84dBbe52B9EDC34fFa0BCAA91"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const PerformanceContractAddress = "0x89719a952BCf613955B5270A195c3c53A52d4E2C"
export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
