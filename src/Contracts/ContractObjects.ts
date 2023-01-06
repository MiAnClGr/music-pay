import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

const MockDaiAddress = "0x2B73B67f5550AbD35b0464b3Af864920397ef0f6"
const ArtistFactoryAddress = "0x8C4B66e4A61DFb99737Dd4f3aed16f4E8347c839"
const PerformanceContractAddress = "0x84922a01d6399cf0c90eA96a23574C5c25A6FfFa"

let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let MockDai : Contract
let ArtistFactoryContract : Contract 
let PerformanceContract : Contract



if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    MockDai = new ethers.Contract(MockDaiAddress, MockDaiABI, signer);
    ArtistFactoryContract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer); 
    PerformanceContract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);
}   

export {provider, signer, ArtistFactoryContract, PerformanceContract, MockDai}
