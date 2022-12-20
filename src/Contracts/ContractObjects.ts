import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

const ArtistFactoryAddress = "0x2E38cEfBc721dFcF5d7dA9A4609d31D23d034C19"
const PerformanceContractAddress = "0xCe145823a9C038E83DC893e1c97F0CC77b4Ef494"

let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let ArtistFactoryContract : Contract 
let PerformanceContract : Contract


if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    ArtistFactoryContract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer); 
    PerformanceContract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
}

export {provider, signer, ArtistFactoryContract, PerformanceContract}
