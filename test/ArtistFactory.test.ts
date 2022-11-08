import {deployments, ethers, getNamedAccounts}  from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import {expect} from 'chai';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers"
import { equal } from "assert";


describe("Using the Artist Factory", () => {

  let artist : SignerWithAddress

  let ArtistFactoryContract : Contract

  beforeEach(async () => {

    [artist] = await ethers.getSigners()

    await deployments.fixture("ArtistFactory")

    ArtistFactoryContract = await ethers.getContract("ArtistFactory")

    await ArtistFactoryContract.createArtist("ZONG")
  })

  it("should create a new Artist Profile contract", async () => {
    const profileAddress = await ArtistFactoryContract.artistProfileAddress()
    expect(await ArtistFactoryContract.artistByAddress(profileAddress)).to.equal("ZONG")

  })

  it("should retrieve the artist by name", async () => {
    const profileAddress = await ArtistFactoryContract.artistProfileAddress()
    expect(await ArtistFactoryContract.artistByName("ZONG")).to.equal(profileAddress)

  })

  it("should return true if the artist exists", async () => {
    expect(await ArtistFactoryContract.doesArtistExist("ZONG")).to.equal(true)

  })

  
});
