import React, {createContext, useState, ReactNode} from 'react'
import { useNavigate } from 'react-router'
import {ArtistFactoryContract, signer} from '../Contracts/ContractObjects'


interface BookingContextInterface {
    search : (e: React.ChangeEvent<HTMLInputElement>) => void
    searchInput : string
    searchedAddress : string
    submitSearch : (e: React.KeyboardEvent<HTMLElement>) => Promise<void>
    artistBooking : {bookingAgent: string; payment: string; time: string; date: string; venue: string;}
    setArtistBooking : React.Dispatch<React.SetStateAction<{bookingAgent: string; payment: string; time: string; date: string; venue: string;}>>
    artistName : string
    setArtistName : React.Dispatch<React.SetStateAction<string>>
    getArtistName : () => Promise<void>
}


const BookingContext = createContext<BookingContextInterface>({} as BookingContextInterface)

export const BookingProvider  = ({children} : {children : ReactNode}) => {

    const navigate = useNavigate()

    const [searchInput, setSearchInput] = useState("")
    const [searchedAddress, setSearchedAddress] = useState<string>("")
    const [artistName, setArtistName] = useState("")
    const [artistBooking, setArtistBooking] = useState({
    bookingAgent: "",
    payment: "",
    time: "",
    date: "",
    venue: ""
  })

    const search = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
      }

    const submitSearch = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            const address = await ArtistFactoryContract.artistNameToAddress(searchInput)
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

    const getArtistName = async () => {
        const name = await ArtistFactoryContract.artistAddressToName(searchedAddress)
        console.log(name)
        setArtistName(name)
    }

    return(
        <BookingContext.Provider
        value= {{
            search,
            searchInput,
            searchedAddress,
            submitSearch,
            artistBooking,
            setArtistBooking,
            artistName,
            setArtistName,
            getArtistName
        
        }}
        >
            {children}
        </BookingContext.Provider>
    ) 
    

}

export default BookingContext