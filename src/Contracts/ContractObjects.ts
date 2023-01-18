import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

//Goerli

// const MockDaiAddress = "0xa73BD0bB26b0587C004A95D3FB2B655c86685CC0"
// const ArtistFactoryAddress = "0xA2a3DC7c94CEC1916cf68ADCE526987E3caA4A22"
// const PerformanceContractAddress = "0x2284036b628CF910B708893BB8590B2842752200"

///Mumbai

// const MockDaiAddress = "0x1023acA55D6aA1A8Dd0AcA62C6d559EdD09486F8"
// const ArtistFactoryAddress = "0x41A68550EcE02B3D223C4c168e045b335B2A098f"
// const PerformanceContractAddress = "0x9E86c84A90744F774f54aD51273E7B6f38082910"

///Polygon ZKEVM

// const MockDaiAddress = "0xf6631457ea66A3E2C08339C5cc422dF559077687"
// const ArtistFactoryAddress = "0xbf5590d4aBcB60f6996ffc7164394c47Fd67f1f2"
// const PerformanceContractAddress = "0x918Df7ce46b61Bd9De3222Ab42c7A633451F1e5E"

///LocalHost

const MockDaiAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ArtistFactoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
const PerformanceContractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"


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
