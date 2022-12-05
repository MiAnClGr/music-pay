import React, {FC, useEffect} from 'react'
import {ethers, Contract} from 'ethers'
import EscrowABI from '../../ABI/BookingEscrow'
import {signer} from "../../Contracts/ContractObjects"

type props = {
    bookingNumber : string
    escrowAddress : string
    artistProfileAddress : string
    setEscrowAddress : React.Dispatch<React.SetStateAction<string>>
    createArtistProfileInstance : (artist: string) => ethers.Contract
}

const Escrow : FC<props> = ({bookingNumber, escrowAddress, artistProfileAddress, setEscrowAddress, createArtistProfileInstance}) => {

    const createEscrowInstance = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddress, EscrowABI, signer)
        console.log(EscrowContract)
        return EscrowContract
    }

    const getEscrowAddress = () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        artistProfileContract.on("EscrowCreated", (escrowAddress => {
            setEscrowAddress(escrowAddress)
          }))
    }



    console.log(escrowAddress)
    console.log(bookingNumber)

    const getAddressess = async () => {
        const EscrowContract = createEscrowInstance()
        console.log(await EscrowContract.artist())
        console.log(await EscrowContract.bookingAgent())
        console.log(await EscrowContract.gigNumber())
    }

    useEffect(() => {
        getEscrowAddress()
    },[])

    useEffect(() => {
        getAddressess()
    }, [escrowAddress])


  return (
    <div>
      <h1 className='Text'>ESCROW : {bookingNumber}</h1>
      <h1 className='Text'>ESCROW ADDRESS : {escrowAddress}</h1>
    </div>
  )
}

export default Escrow
