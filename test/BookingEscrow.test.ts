import {ethers}  from "hardhat";
import "@nomicfoundation/hardhat-chai-matchers";
import {expect} from 'chai';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers"



describe("Using the bookingEscrow Contract", () => {

  let artist : SignerWithAddress
  let bookingAgent : SignerWithAddress

  let BookingEscrowContract : Contract
  let MockDai : Contract
  let ArtistFactory : Contract
  let ArtistProfile : Contract

  beforeEach(async () => {

    [artist, bookingAgent] = await ethers.getSigners()

    const MockDaiFactory = await ethers.getContractFactory("MockDai")
    const ArtistFactoryFactory = await ethers.getContractFactory("ArtistFactory")
    const ArtistProfileFactory = await ethers.getContractFactory("ArtistProfile")
    const BookingEscrowFactory = await ethers.getContractFactory("BookingEscrow")

    MockDai = await MockDaiFactory.deploy()
    ArtistFactory = await ArtistFactoryFactory.deploy(MockDai.address)
   
    BookingEscrowContract = await BookingEscrowFactory.deploy(
      artist.address,
      "ZONG",
      bookingAgent.address,
      "Joe",
      1,
      1000,
      1200,
      "Bearded Lady",
      "12th July",
      MockDai.address,
      ArtistFactory.address
    )
    
    await MockDai.connect(bookingAgent).mintDai(ethers.utils.parseEther("1000"))
    await MockDai.connect(bookingAgent).approve(BookingEscrowContract.address, ethers.utils.parseEther('1000'))
    
  })

  it('the booking agent should have 1000 token', async () => {
    expect(await MockDai.balanceOf(bookingAgent.address)).to.equal(ethers.utils.parseEther("1000"))
  })

  it("the Booking Escrow Contract should receive 200 tokens when the deposit is paid", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    expect(await MockDai.balanceOf(BookingEscrowContract.address)).to.equal(ethers.utils.parseEther("200"))
    expect(await MockDai.balanceOf(bookingAgent.address)).to.equal(ethers.utils.parseEther("800"))
    expect(await BookingEscrowContract.currentState()).to.equal(1)
  })

  it("the artist should be able to confirm the performance", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    await BookingEscrowContract.connect(artist).confirmPerformanceArtist()
    expect(await BookingEscrowContract.performanceConfirmedArtist()).to.equal(true)
    expect(await BookingEscrowContract.currentState()).to.equal(2)
  })

  it("the artist should not be able to confirm the performance if the deposit has not been paid", async () => {
    expect(await BookingEscrowContract.connect(artist).confirmPerformanceArtist()).to.be.reverted
  })

  it("the bookingAgent should be able to confirm the performance", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    await BookingEscrowContract.connect(artist).confirmPerformanceArtist()
    await BookingEscrowContract.connect(bookingAgent).confirmPerformanceAgent()
    expect(await BookingEscrowContract.performanceConfirmedAgent()).to.equal(true)
    expect(await BookingEscrowContract.currentState()).to.equal(4)
  })

  it("the booking agent should not be able to confirm the performance if the artist hasnt", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    expect(await BookingEscrowContract.connect(bookingAgent).confirmPerformanceAgent()).to.be.reverted
  })

  it("the bookingAgent should be able to finalise the payment", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    await BookingEscrowContract.connect(artist).confirmPerformanceArtist()
    await BookingEscrowContract.connect(bookingAgent).confirmPerformanceAgent()
    await BookingEscrowContract.connect(bookingAgent).finalisePayment()
    expect(await MockDai.balanceOf(BookingEscrowContract.address)).to.equal(ethers.utils.parseEther("1000"))
    expect(await BookingEscrowContract.currentState()).to.equal(5)
  })

  it("the artist should be able to confirm the payment", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    await BookingEscrowContract.connect(artist).confirmPerformanceArtist()
    await BookingEscrowContract.connect(bookingAgent).confirmPerformanceAgent()
    await BookingEscrowContract.connect(bookingAgent).finalisePayment()
    await BookingEscrowContract.connect(artist).confirmPayment()
    expect(await BookingEscrowContract.currentState()).to.equal(6)
  })

  it("the artist should be able to confirm the payment", async () => {
    await BookingEscrowContract.connect(bookingAgent).payDeposit()
    await BookingEscrowContract.connect(artist).confirmPerformanceArtist()
    await BookingEscrowContract.connect(bookingAgent).confirmPerformanceAgent()
    await BookingEscrowContract.connect(bookingAgent).finalisePayment()
    await BookingEscrowContract.connect(artist).confirmPayment()
    await BookingEscrowContract.connect(artist).completeBooking()
    expect(await MockDai.balanceOf(artist.address)).to.equal(ethers.utils.parseEther("1000"))
  })

  




});
