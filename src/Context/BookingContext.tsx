import React, {createContext, useState, ReactNode} from 'react'
import { useNavigate } from 'react-router'
import {ArtistFactoryContract, signer} from '../contracts/ContractObjects'


interface BookingContextInterface {
    search : (e: React.ChangeEvent<HTMLInputElement>) => void
    searchInput : string
    searchedAddress : string
    submitSearch : (e: React.KeyboardEvent<HTMLElement>) => Promise<void>
    
}


const BookingContext = createContext<BookingContextInterface>({} as BookingContextInterface)

export const BookingProvider  = ({children} : {children : ReactNode}) => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    const [searchedAddress, setSearchedAddress] = useState<string>("")

    const search = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
      }

    const submitSearch = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            const address = await ArtistFactoryContract.artistByName(searchInput)
            console.log(address)      
            if(address !== "0x0000000000000000000000000000000000000000"){
                setSearchedAddress(address)
                console.log(searchedAddress)
                navigate("/ArtistBooking")
            }else{
                navigate("/NotOwner")
            }
        }
    }

    return(
        <BookingContext.Provider
        value= {{
            search,
            searchInput,
            searchedAddress,
            submitSearch
        
        }}
        >
            {children}
        </BookingContext.Provider>
    ) 
    

}

export default BookingContext