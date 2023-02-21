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

const MockDaiAddress = "0x8B0AEe55bc82a7D622aA30b0d0249365B637b211"
const ArtistFactoryAddress = "0xeBFe8D64A53d24185cef0e2b558126F58D631494"


///Polygon ZKEVM

// const MockDaiAddress = "0xf6631457ea66A3E2C08339C5cc422dF559077687"
// const ArtistFactoryAddress = "0xbf5590d4aBcB60f6996ffc7164394c47Fd67f1f2"


///LocalHost

// const MockDaiAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
// const ArtistFactoryAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"



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
