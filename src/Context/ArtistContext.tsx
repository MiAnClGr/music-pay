import React, {createContext, useState, ReactNode} from 'react'
import {ethers, Contract} from 'ethers'
import { useNavigate } from 'react-router'
import {ArtistFactoryContract, signer} from '../contracts/ContractObjects'
import ArtistProfileABI from '../ABI/ArtistProfile'

interface ArtistContextInterface {
    artistAddress : string
    artistProfileAddress : string
    setArtistContract : () => Promise<void>
    setArtist : () => Promise<void>
    artistLoggedIn : boolean
    artistConnected : boolean
    createArtistProfileInstance : (artist: string) => ethers.Contract
    getArtistConnected : () => Promise<void>
    updateClicked : boolean
    setUpdateClicked : React.Dispatch<React.SetStateAction<boolean>>
    displayUpdateAboutMe :  () => void
    handleSubmitAboutMe : (e: React.KeyboardEvent<HTMLElement>) => Promise<void>
    update : string
    updateAboutMe :  (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    aboutArtist : string
    getAboutMe : () => Promise<void>
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

    const navigate = useNavigate()

    const [artistAddress, setArtistAddress] =  useState<string>("")
    const [artistProfileAddress, setArtistProfileAddress] = useState<string>("")
    const [artistLoggedIn, setArtistLoggedIn] = useState<boolean>(false)
    const [artistConnected, setArtistConnected] = useState<boolean>(false)
    const [updateClicked, setUpdateClicked] = useState<boolean>(false)
    const [update, setUpdate] = useState("")
    const [aboutArtist, setAboutArtist] = useState("")
    const [updateDisplayBookings, setUpdateDisplayBookings] = useState<boolean>(false)
    const [bookings, setBookings] = useState<any[]>([])
    const [bookingNumber, setBookingNumber] = useState<string>("")
    const [escrowAddress, setEscrowAddress] = useState<string>("")

    const setArtistContract = async () => {
        const owner = await signer.getAddress()
        const artist = await ArtistFactoryContract.ownerToArtist(owner)
        setArtistProfileAddress(artist)
        setArtistLoggedIn(true)
    } 

    const setArtist = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        console.log(artist)
        if(artist == await signer.getAddress()){
            console.log(await signer.getAddress())
            setArtistAddress(artist)
        } 
    } 

    const createArtistProfileInstance = (artist : string) => {
        const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 
    
        return ArtistProfileContract
    }

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

    const displayUpdateAboutMe = () => {
        setUpdateClicked(!updateClicked)
    }

    const handleSubmitAboutMe = async (e : React.KeyboardEvent<HTMLElement>) => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        if(e.key === 'Enter'){
            try{
                const updated = await artistProfileContract.updateAboutMe(update)
                await updated.wait()
            }catch(error){

            }finally{
                getAboutMe()
                setUpdateClicked(!updateClicked)
                console.log("submitted")
            }
        }
    }

    const updateAboutMe = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setUpdate(e.target.value)
    }

    const getAboutMe = async () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        const about = await artistProfileContract.aboutMe()
        console.log(about)
        setAboutArtist(about)
    }

    const displayBookings = () => {
        setUpdateDisplayBookings(!updateDisplayBookings)
    
    }

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

    const getEscrowAddress = () => {
        const artistProfileContract = createArtistProfileInstance(artistProfileAddress)
        artistProfileContract.on("EscrowCreated", (escrowAddress => {
            setEscrowAddress(escrowAddress)
          }))
    }

    

    return(
        <ArtistContext.Provider
        value= {{
            artistAddress,
            artistProfileAddress,
            setArtistContract,
            setArtist,
            artistLoggedIn,
            artistConnected,
            createArtistProfileInstance,
            getArtistConnected,
            updateClicked,
            setUpdateClicked,
            displayUpdateAboutMe,
            handleSubmitAboutMe,
            update,
            updateAboutMe,
            aboutArtist,
            getAboutMe,
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