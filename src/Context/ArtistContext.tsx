import React, {createContext, useState, ReactNode} from 'react'
import {ethers, Contract} from 'ethers'
import {ArtistFactoryContract, signer} from '../contracts/ContractObjects'
import ArtistProfileABI from '../ABI/ArtistProfile'

interface ArtistContextInterface {
    artistAddress : string
    artistProfileAddress : string
    loginArtist : () => Promise<void>
    setArtist : () => Promise<void>
    artistLoggedIn : boolean
    artistConnected : boolean
    createArtistProfileInstance : (artist: string) => ethers.Contract
    getArtistConnected : () => Promise<void>
    updateClicked : boolean
    setUpdateClicked : React.Dispatch<React.SetStateAction<boolean>>
    displayUpdateAboutMe :  () => void
    displayBookings : () => void
    updateDisplayBookings : Boolean
    bookings : any[]
    getBookings :  () => Promise<void>
    bookingNumber : string
    setBookingNumber : React.Dispatch<React.SetStateAction<string>>
    escrowAddress : string
    getEscrowAddress : () => void


}


const ArtistContext = createContext<ArtistContextInterface>({} as ArtistContextInterface)

export const ArtistProvider  = ({children} : {children : ReactNode}) => {

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

    const [updateClicked, setUpdateClicked] = useState<boolean>(false)                       

    const displayUpdateAboutMe = () => {
        setUpdateClicked(!updateClicked)
    }
    
/// Displays current bookings on the profile page    

    const [updateDisplayBookings, setUpdateDisplayBookings] = useState<boolean>(false)

    const displayBookings = () => {
        setUpdateDisplayBookings(!updateDisplayBookings)   
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

    const [escrowAddress, setEscrowAddress] = useState<string>("")

    const getEscrowAddress = () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        artistProfileContract.on("EscrowCreated", (escrowAddress => {
            setEscrowAddress(escrowAddress)
          }))
    }

/// Booking number is set during the booking and displayed in the Escrow Component    

    const [bookingNumber, setBookingNumber] = useState<string>("")

    return(
        <ArtistContext.Provider
        value= {{
            artistAddress,
            artistProfileAddress,
            loginArtist,
            setArtist,
            artistLoggedIn,
            artistConnected,
            createArtistProfileInstance,
            getArtistConnected,
            updateClicked,
            setUpdateClicked,
            displayUpdateAboutMe,
            displayBookings,
            updateDisplayBookings,
            bookings,
            getBookings,
            bookingNumber,
            setBookingNumber,
            escrowAddress,
            getEscrowAddress           
        }}
        >
            {children}
        </ArtistContext.Provider>
    ) 
    

}

export default ArtistContext