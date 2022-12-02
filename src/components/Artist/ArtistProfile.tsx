import React, {FC, useState, useEffect, ReactElement, SetStateAction} from 'react'
import {ethers, utils, Contract, BytesLike, BigNumber} from 'ethers'
import {ArtistFactoryContract, signer}from "../../Contracts/ContractObjects"
import ArtistProfileABI from '../../ABI/ArtistProfile'
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
    clicked : boolean
    setClicked : React.Dispatch<React.SetStateAction<boolean>>
    openInput : () => void
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
    clicked,
    setClicked,
    setArtistConnected,
    artistConnected,
    openInput,
    createInstance
    }) : ReactElement => {

    const [bookings, setBookings] = useState<any[]>([]) ///JSON.parse(localStorage.getItem("bookings")!)
    
    const setArtistContract = async () => {
        ArtistFactoryContract.on("Artist", (artist, status) => {
            console.log("set")

            // createInstance(artist)
            setArtistProfileAddress(artist)
            setArtistLoggedIn(true)
            console.log(artist)
            console.log(artistProfileAddress)
            console.log(status)
        })
    }


    // const createInstance = (artist : string) => {
    //     const ArtistProfileContract : Contract = new ethers.Contract(artist, ArtistProfileABI, signer) 

    //         setArtistProfileContract(ArtistProfileContract)
    //         console.log("contract set")

    //         return ArtistProfileContract
    // }

    const setArtist = async () => {
        const artistProfileContract = createInstance(artistProfileAddress)
        const artist = await artistProfileContract.artist()
        if(artist == await signer.getAddress()){
            setArtistAddress(artist)
        }

        const name = await artistProfileContract.artistName()
        console.log(name)
        console.log(artistProfileContract)
        setArtistName(name)
    } 

    // const getBookings = async () => {
    //     let bookingsArray : any[] =  []
    //     for(let i = 0; i < 5; i++){
    //         const booking : any[] = await artistProfileContract?.getBooking(i)
    //         console.log(booking)
    //         bookingsArray.push(booking)
    //     }
    //     setBookings(bookingsArray)
        
   
    // }

   


    // useEffect(() => {
    //     localStorage.setItem("bookings", JSON.stringify(bookings))
    // },[bookings])

    useEffect(() => {
        setArtistContract()
        console.log("useEffect 1")
    }, [])

    useEffect(() => {
        setArtist()
        // getBookings()
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
        <div className='Align-Profile'>
            <ArtistHeader
            artistName= {artistName}
            artistAddress= {artistAddress}
            setArtistAddress= {setArtistAddress}
            artistProfileAddress = {artistProfileAddress}
            artistLoggedIn= {artistLoggedIn}
            setArtistLoggedIn= {setArtistLoggedIn}
            openInput= {openInput}
            artistConnected= {artistConnected}
            setArtistConnected= {setArtistConnected}
            />
            {artistLoggedIn && artistConnected
            ?
            <AboutMe
            // artistProfileContract={artistProfileContract}
            createInstance= {createInstance}
            artistProfileAddress= {artistProfileAddress}
            setClicked= {setClicked}
            clicked= {clicked}
            />
            :
            <></>       
            }

            <h1
            className='Text'
            // onClick={getBookings}
            >bookings</h1>
            <div>
                <BookingsList
                bookings= {bookings}
                />
            </div>
           
        </div>
    )
}

export default ArtistProfile