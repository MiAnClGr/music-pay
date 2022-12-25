import {deployments, ethers, getNamedAccounts}  from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import {expect} from 'chai';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers"
import { equal } from "assert";


describe("Using the bookingEscrow Contract", () => {

  let artist : SignerWithAddress
  let bookingAgent : SignerWithAddress

  let BookingEscrowContract : Contract
  let MockDaiContract : Contract

  beforeEach(async () => {

    [artist, bookingAgent] = await ethers.getSigners()

    const mockDaiFactory = await ethers.getContractFactory("MockDai")
    const bookingEscrowFactory = await ethers.getContractFactory("BookingEscrow")

    
    BookingEscrowContract = await 
        bookingEscrowFactory.deploy(artist.address, "ZONG", bookingAgent.address, "Joe", 1, 1000)
    MockDaiContract = await mockDaiFactory.deploy()


    await MockDaiContract.connect(bookingAgent).mintDai(ethers.utils.parseEther('1000'))
    await MockDaiContract.connect(bookingAgent).approve(BookingEscrowContract.address, ethers.utils.parseEther('1000'))
  })

  it('the booking agent should have 1000 token', async () => {
    expect(await MockDaiContract.balanceOf(bookingAgent.address)).to.equal(ethers.utils.parseEther("1000"))
  })

  it('the escrow contract should be approved 1000 of the bookingAgent token', async () => {
    const allowance = await MockDaiContract.allowance(bookingAgent.address, BookingEscrowContract.address)
    expect(allowance).to.equal(ethers.utils.parseEther('1000'))
  })




});
