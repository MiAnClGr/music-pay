import React, {createContext, useState, ReactNode} from 'react'
import {ethers, Contract} from 'ethers'
import { useNavigate } from 'react-router'
import {ArtistFactoryContract, signer} from '../Contracts/ContractObjects'
import EscrowABI from '../ABI/BookingEscrow'

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
    escrowList : any[]
    getEscrowList : () => Promise<void>
    escrowAddressAgent : string
    setEscrowAddressAgent : React.Dispatch<React.SetStateAction<string>>
    bookingNumberAgent : string
    setBookingNumberAgent : React.Dispatch<React.SetStateAction<string>>
    createEscrowInstanceAgent : () => ethers.Contract
}


const BookingContext = createContext<BookingContextInterface>({} as BookingContextInterface)

export const BookingProvider  = ({children} : {children : ReactNode}) => {

    const navigate = useNavigate()

/// Sets the Search Input

    const [searchInput, setSearchInput] = useState("")

    const search = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(e.target.value)
    }

/// Submits a search and sets the searched Address

    const [searchedAddress, setSearchedAddress] = useState<string>("")

    const submitSearch = async (e : React.KeyboardEvent<HTMLElement>) => {
        if(e.key === 'Enter'){
            const address = await ArtistFactoryContract.artistNameToAddress(searchInput)
            console.log(address)      
            if(address != "0x0000000000000000000000000000000000000000"){
                setSearchedAddress(address)
                console.log(searchedAddress)
                navigate("/Artist")
            }else{
                navigate("/ArtistDoesNotExist")
            }
        }
    }

///Fetches and sets the artist name using the searched Address     

    const [artistName, setArtistName] = useState("")

    const getArtistName = async () => {
        const name : string = await ArtistFactoryContract.artistAddressToName(searchedAddress)
        console.log(name)
        setArtistName(name)
    }

///State for the artist booking    

    const [artistBooking, setArtistBooking] = useState({
        bookingAgent: "",
        payment: "",
        time: "",
        date: "",
        venue: ""
    })

///Fetches the escrow address for the agent 

    const [escrowAddressAgent, setEscrowAddressAgent] = useState<string>("")

///Creates an instance of the Escrow Account for the booking agent 

    const createEscrowInstanceAgent = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddressAgent, EscrowABI, signer) 

        return EscrowContract
    }


///Fetches a list of addressess of escrow contracts that the booking agent is a part of 

    const [escrowList, setEscrowList] = useState<any[]>([])

    const getEscrowList = async () => {
        let escrowAddressList : any[] = []
        const arrayLength = await ArtistFactoryContract.getEscrowArrayLength(await signer.getAddress())
        for(let i=0; i <= arrayLength; i++){
            const userAddress = await signer.getAddress()
            const address = await ArtistFactoryContract.getEscrow(userAddress, i)
            escrowAddressList.push(address)
            console.log(escrowAddressList)
        }
        setEscrowList(escrowAddressList)
    }

    const [bookingNumberAgent, setBookingNumberAgent] = useState<string>("")


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
            getArtistName,
            escrowList,
            getEscrowList, 
            escrowAddressAgent,
            setEscrowAddressAgent,
            bookingNumberAgent,
            setBookingNumberAgent,
            createEscrowInstanceAgent
        
        }}
        >
            {children}
        </BookingContext.Provider>
    ) 
    

}

export default BookingContext