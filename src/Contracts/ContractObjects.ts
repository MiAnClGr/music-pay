import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

const MockDaiAddress = "0xa73BD0bB26b0587C004A95D3FB2B655c86685CC0"
const ArtistFactoryAddress = "0xA2a3DC7c94CEC1916cf68ADCE526987E3caA4A22"
const PerformanceContractAddress = "0x2284036b628CF910B708893BB8590B2842752200"

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
