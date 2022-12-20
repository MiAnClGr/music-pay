import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

const ArtistFactoryAddress = "0xaDf773Bb65dA49F63ABBA23bD8920a50E2855FC8"
const PerformanceContractAddress = "0xfF38F0dFC33a3df7FAf57a3EdF227031815EF71f"

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
