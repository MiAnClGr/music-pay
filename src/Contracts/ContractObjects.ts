import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

const MockDaiAddress = "0x86461f511DDA68aC74754bA279287ED1FC54dCdA"
const ArtistFactoryAddress = "0x2980B7Ee06E9f5A96dBb0723D741F9E41732B8C9"
const PerformanceContractAddress = "0x9C16a7DCc606C2873De3bE275Fd7441944aC2810"

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
