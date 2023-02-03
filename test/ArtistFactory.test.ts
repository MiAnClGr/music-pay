import {deployments, ethers, getNamedAccounts}  from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import {expect} from 'chai';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers"
import { equal } from "assert";

describe("Using the ArtistFactory Contract", () => {

  let artist : SignerWithAddress

  let ArtistFactoryContract : Contract
  let MockDai : Contract

  let address : string 


  describe("Creating and removing and artist", () => {
  
    beforeEach(async () => {
  
      [artist] = await ethers.getSigners()
  
      const MockDaiFactory = await ethers.getContractFactory("MockDai")
      const ArtistFactoryContractFactory = await ethers.getContractFactory("ArtistFactory")
  
      MockDai = await MockDaiFactory.deploy()
      ArtistFactoryContract = await ArtistFactoryContractFactory.deploy(MockDai.address)
  
      await ArtistFactoryContract.createArtist("ZONG")
  
      address = await ArtistFactoryContract.ownerToArtist(artist.address)
    })
  
    it("should create a new Artist Profile contract", async () => {
      const addressTwo = await ArtistFactoryContract.artistNameToAddress("ZONG")
    
      expect(addressTwo).to.equal(address)
    })
  
    it("should return ZONG given the artist profile address", async () => {
      const name = await ArtistFactoryContract.artistAddressToName(address)
      expect(name).to.equal("ZONG")
  
    })
  
    it("should return the owner given the artist profile address", async () => {
      const owner = await ArtistFactoryContract.artistProfileToArtist(address)
      expect(owner).to.equal(artist.address)
  
    })

    it("should return true if the artist exists", async () => {
      expect(await ArtistFactoryContract.doesArtistExist("ZONG")).to.equal(true)
  
    })

    it("should push the artistProfile address to the Aritsts array", async () => {
      expect(await ArtistFactoryContract.Artists(0)).to.equal(address)
    })  

    it("should return false once the artist is removed", async () => {
      await ArtistFactoryContract.removeArtist("ZONG")
      expect(await ArtistFactoryContract.doesArtistExist("ZONG")).to.equal(false)
    })
  })

  
})

