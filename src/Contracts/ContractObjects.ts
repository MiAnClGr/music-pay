import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

const MockDaiAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
const ArtistFactoryAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F"
const PerformanceContractAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"

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
