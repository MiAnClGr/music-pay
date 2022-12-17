import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from '../ABI/ArtistFactory'
import PerformanceContractABI from "../ABI/PerformanceContract"

declare var window: any

// export const provider : ethers.providers.Web3Provider = ((window.ethereum != null) 
// ? 
// new ethers.providers.Web3Provider(window.ethereum) 
// : 
// ethers.providers.getDefaultProvider());

const ArtistFactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const PerformanceContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

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


// const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
// export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

// export const ArtistFactoryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
// export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

// export const PerformanceContractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// export const PerformanceContract : Contract = new ethers.Contract(PerformanceContractAddress, PerformanceContractABI, signer);

export {provider, signer, ArtistFactoryContract, PerformanceContract}
