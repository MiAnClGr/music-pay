import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"
import MockDaiABI from "../ABI/MockDai"

declare var window: any

//Goerli

// const MockDaiAddress = "0xa73BD0bB26b0587C004A95D3FB2B655c86685CC0"
// const ArtistFactoryAddress = "0xA2a3DC7c94CEC1916cf68ADCE526987E3caA4A22"


///Mumbai

// const MockDaiAddress = "0x1023acA55D6aA1A8Dd0AcA62C6d559EdD09486F8"
// const ArtistFactoryAddress = "0x41A68550EcE02B3D223C4c168e045b335B2A098f"


///Polygon ZKEVM

// const MockDaiAddress = "0xf6631457ea66A3E2C08339C5cc422dF559077687"
// const ArtistFactoryAddress = "0xbf5590d4aBcB60f6996ffc7164394c47Fd67f1f2"


///LocalHost

const MockDaiAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const ArtistFactoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"



let provider : ethers.providers.Web3Provider
let signer : ethers.providers.JsonRpcSigner
let MockDai : Contract
let ArtistFactoryContract : Contract 




if(window.ethereum != null) {
    provider  = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
    MockDai = new ethers.Contract(MockDaiAddress, MockDaiABI, signer);
    ArtistFactoryContract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer); 
  
}   

export {provider, signer, ArtistFactoryContract, MockDai}
