import React, { useState } from 'react'
import { BigNumber, ethers } from 'ethers'
import { ArtistFactoryContract, signer } from '../../Contracts/ContractObjects'
import { array } from 'yargs'

const EscrowList = () => {

    const [escrowList, setEscrowList] = useState<any[]>([])

    const getEscrow = async () => {
        let escrowAddressList : any[] = []
        const arrayLength = await ArtistFactoryContract.getEscrowArrayLength(await signer.getAddress())
        console.log(arrayLength)
        for(let i=0; i <= arrayLength; i++){
            const userAddress = await signer.getAddress()
            console.log(userAddress)
            console.log(BigNumber.from(i))
            
            const address = await ArtistFactoryContract.getEscrow(userAddress, i)
            escrowAddressList.push(address)
            console.log(escrowAddressList)
        }
        setEscrowList(escrowAddressList)
    }

    console.log(escrowList)
  return (
    <div>
      <button
      onClick={getEscrow}
      style={{width: "10%"}}
      >
        get Escrow
      </button>
    </div>
  )
}

export default EscrowList
