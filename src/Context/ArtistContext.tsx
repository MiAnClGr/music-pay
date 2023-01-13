import React, {createContext, useState, ReactNode} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer} from '../Contracts/ContractObjects'
import ArtistProfileABI from '../ABI/ArtistProfile'
import EscrowABI from '../ABI/BookingEscrow'
import { useNavigate } from 'react-router'

interface ArtistContextInterface {
    artistAddress : string
    artistProfileAddress : string
    loginArtist : () => Promise<void>
    logoutArtist : () => Promise<void>
    setArtist : () => Promise<void>
    artistLoggedIn : boolean
    artistConnected : boolean
    createArtistProfileInstance : (artist: string) => ethers.Contract
    getArtistConnected : () => Promise<void>
    updateClickedAbout : boolean
    updateClickedPic : boolean
    updateClickedWhole : boolean
    setUpdateClickedAbout : React.Dispatch<React.SetStateAction<boolean>>
    setUpdateClickedPic : React.Dispatch<React.SetStateAction<boolean>>
    setUpdateClickedWhole : React.Dispatch<React.SetStateAction<boolean>>
    displayBookings : () => void
    updateDisplayBookings : Boolean
    bookings : any[]
    getBookings :  () => Promise<void>
    bookingNumberArtist : string
    setBookingNumberArtist : React.Dispatch<React.SetStateAction<string>>
    escrowAddressArtist : string
    getEscrowAddressArtist : () => void
    EscrowContractArtist : Contract
    picURL : string
    setPicURL : React.Dispatch<React.SetStateAction<string>>
    getProfilePicURL : () => Promise<void>

}


const ArtistContext = createContext<ArtistContextInterface>({} as ArtistContextInterface)

export const ArtistProvider  = ({children} : {children : ReactNode}) => {

    const navigate = useNavigate()

/// Creates an instance of the Artist Profile Contract

    const createArtistProfileInstance = (artist : string) => {
        const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 
    
        return ArtistProfileContract
    }

///  Logging in the Artist    

    const [artistProfileAddress, setArtistProfileAddress] = useState<string>("")
    const [artistLoggedIn, setArtistLoggedIn] = useState<boolean>(false)

    const loginArtist = async () => {
        const owner = await signer.getAddress()
        const artist = await ArtistFactoryContract.ownerToArtist(owner)
        setArtistProfileAddress(artist)
        setArtistLoggedIn(true)
    } 

/// Logging out the Artist 

    const logoutArtist = async () => {
        setArtistProfileAddress("")
        setArtistLoggedIn(false)
        setArtistAddress("")
        setBookings([])
    }

/// Checks the connected address is the same as the artist address in the Artist Profile Contract and saves to state    

    const [artistAddress, setArtistAddress] =  useState<string>("") 

    const setArtist = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        console.log(artist)
        if(artist == await signer.getAddress()){
            console.log(await signer.getAddress())
            setArtistAddress(artist)
        } 
    } 

/// Checks if the connected address is the logged in account, resets state variables if it is not   

    const [artistConnected, setArtistConnected] = useState<boolean>(false)
    
    const getArtistConnected = async () => {
        try{
            if(artistAddress == await signer.getAddress()){
                console.log(await signer.getAddress())
                console.log(artistAddress)
                setArtistConnected(true)
                console.log(artistConnected)
                console.log(artistLoggedIn)
            }else{
                setArtistConnected(false)
                setArtistAddress("")
            }
        }catch(e){
            setArtistConnected(false)
        }
    }

/// Displays about me update box if update is clicked    

    const [updateClickedWhole, setUpdateClickedWhole] = useState<boolean>(false)
    const [updateClickedAbout, setUpdateClickedAbout] = useState<boolean>(false) 
    const [updateClickedPic, setUpdateClickedPic] = useState<boolean>(false)                         

/// Fetches and sets the profile pic URL

const [picURL, setPicURL] = useState("")

const getProfilePicURL = async () => {
    const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
    const url = await artistProfileContract.profilePicURL()
    console.log(url)
    setPicURL(url)
}
    
/// Displays current bookings on the profile page    

    const [updateDisplayBookings, setUpdateDisplayBookings] = useState<boolean>(false)

    const displayBookings = () => {
        // setUpdateDisplayBookings(!updateDisplayBookings) 
        navigate("/BookingsList")  
    }

/// Fetches the Bookings from the Artist Profile contract and saves them to state    

    const [bookings, setBookings] = useState<any[]>([])
    
    const getBookings = async () => {
        console.log("clicked")
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        let bookingsArray : any[] =  []
        for(let i = 0; i < 5; i++){
            const booking : any[] = await artistProfileContract.getBooking(i)
            if(booking[5] != "0x0000000000000000000000000000000000000000"){
                bookingsArray.push(booking)
            }
        }
        setBookings(bookingsArray)
    }

/// Fetches the address of a newly created Escrow contract  

    const [escrowAddressArtist, setEscrowAddressArtist] = useState<string>("")

    const getEscrowAddressArtist = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const address = await artistProfileContract.bookingNumberToEscrow(bookingNumberArtist)
        setEscrowAddressArtist(address)
    }

/// Create an instance of the EscrowContract 

    const createEscrowInstanceArtist = () => {
        const EscrowContract : Contract = new ethers.Contract(escrowAddressArtist, EscrowABI, signer) 

        return EscrowContract
    }

    const EscrowContractArtist = createEscrowInstanceArtist()

/// Booking number is set during the booking and displayed in the Escrow Component    

    const [bookingNumberArtist, setBookingNumberArtist] = useState<string>("")
    

    return(
        <ArtistContext.Provider
        value= {{
            artistAddress,
            artistProfileAddress,
            loginArtist,
            logoutArtist,
            setArtist,
            artistLoggedIn,
            artistConnected,
            createArtistProfileInstance,
            getArtistConnected,
            updateClickedAbout,
            updateClickedPic,
            updateClickedWhole,
            setUpdateClickedAbout,
            setUpdateClickedPic,
            setUpdateClickedWhole,
            displayBookings,
            updateDisplayBookings,
            bookings,
            getBookings,
            bookingNumberArtist,
            setBookingNumberArtist,
            escrowAddressArtist,
            getEscrowAddressArtist,
            EscrowContractArtist,
            picURL,
            setPicURL,
            getProfilePicURL         
        }}
        >
            {children}
        </ArtistContext.Provider>
    ) 
    

}

export default ArtistContext