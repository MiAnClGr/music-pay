import {ethers} from 'ethers'
import {Contract} from 'ethers'
import ArtistFactoryABI from './ABI/ArtistFactory'
import ArtistProfileABI from './ABI/ArtistProfile'

declare var window: any

export const provider : ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
export const signer : ethers.providers.JsonRpcSigner = provider.getSigner()

/// Artist Factory

export const ArtistFactoryAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
export const ArtistFactoryContract : Contract = new ethers.Contract(ArtistFactoryAddress, ArtistFactoryABI, signer);

/// Artist Profile 

export const ArtistProfileAddress = ""
export const ArtistProfileContract : Contract = new ethers.Contract(ArtistProfileAddress, ArtistProfileABI, signer);
