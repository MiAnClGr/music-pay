import React, {FC, useState, useEffect, ReactElement, SetStateAction} from 'react'
import {ethers, utils, Contract, BytesLike, BigNumber} from 'ethers'
import {ArtistFactoryContract, signer}from "../../Contracts/ContractObjects"
import AboutMe from "./AboutMe"
import ArtistHeader from "../shared/ArtistHeader"
import BookingsList from "./BookingsList"

type props = {
    artistName : string
    artistProfileAddress : string
    artistAddress : string 
    artistLoggedIn : boolean
    setArtistName : React.Dispatch<React.SetStateAction<string>>
    setArtistAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistProfileAddress : React.Dispatch<React.SetStateAction<string>>
    setArtistLoggedIn : React.Dispatch<React.SetStateAction<boolean>>
    updateClicked : boolean
    setUpdateClicked : React.Dispatch<React.SetStateAction<boolean>>
    displayUpdateAboutMe : () => void
    updateDisplayBookings : boolean
    displayBookings :  () => void
    setArtistConnected : React.Dispatch<React.SetStateAction<boolean>>
    artistConnected : boolean
    createInstance : (artist: string) => ethers.Contract

}

const ArtistProfile :FC<props> = 
    ({artistName,
    artistProfileAddress, 
    artistAddress,
    artistLoggedIn, 
    setArtistName, 
    setArtistAddress, 
    setArtistProfileAddress, 
    setArtistLoggedIn,
    updateClicked,
    setUpdateClicked,
    setArtistConnected,
    artistConnected,
    displayUpdateAboutMe,
    displayBookings,
    updateDisplayBookings,
    createInstance
    }) : ReactElement => {

    const [bookings, setBookings] = useState<any[]>([]) ///JSON.parse(localStorage.getItem("bookings")!)
    
    const setArtistContract = async () => {
        ArtistFactoryContract.on("Artist", (artist, status) => {
            console.log("set")

          
            setArtistProfileAddress(artist)
            setArtistLoggedIn(true)
            console.log(artist)
            console.log(artistProfileAddress)
            console.log(status)
        })
    }

    const setArtist = async () => {
        const artistProfileContract = createInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        if(artist == await signer.getAddress()){
            setArtistAddress(artist)
        }

        const name = await artistProfileContract.artistName()
        console.log(name)
        setArtistName(name)
    } 

    const getBookings = async () => {
        console.log("clicked")
        const artistProfileContract = createInstance(artistProfileAddress)
        let bookingsArray : any[] =  []
        for(let i = 0; i < 5; i++){
            const booking : any[] = await artistProfileContract.getBooking(i)
            if(booking[5] != "0x0000000000000000000000000000000000000000"){
                bookingsArray.push(booking)
            }
        }
        setBookings(bookingsArray)
        
   
    }

   


    useEffect(() => {
        localStorage.setItem("bookings", JSON.stringify(bookings))
    },[bookings])

    useEffect(() => {
        setArtistContract()
        console.log("useEffect 1")
    }, [])

    useEffect(() => {
        setArtist()
        getBookings()
        console.log("useEffect 2")
    }, [artistProfileAddress])

    useEffect(() => {
        localStorage.setItem("artistProfileAddress", artistProfileAddress)
        console.log("useEffect 3")
    },[artistProfileAddress])

    useEffect(() => {
        localStorage.setItem("artistName", artistName)
        console.log("useEffect 4")
    },[artistName])



    // console.log(artistAddress)
    // console.log(artistProfileContract)


    return(
        <div>
            <ArtistHeader
            artistName= {artistName}
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            artistProfileAddress = {artistProfileAddress}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            displayUpdateAboutMe= {displayUpdateAboutMe}
            displayBookings= {displayBookings}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            />
            
            <div className='ProfilePage'>
                {artistLoggedIn && artistConnected
                ?
                <AboutMe
                createInstance= {createInstance}
                artistProfileAddress= {artistProfileAddress}
                setUpdateClicked= {setUpdateClicked}
                updateClicked= {updateClicked}
                />
                :
                <></>       
                }
                <BookingsList
                bookings= {bookings}
                updateDisplayBookings= {updateDisplayBookings}
                />
            

            </div>
           
        </div>
    )
}

export default ArtistProfile