import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import bpfp from "../assets/image.png"
import "../styles/ProfileNew.css"
import { useNavigate } from "react-router";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";

const ProfileNew = () => {

    const [accountId, setAccountId] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [aadhar, setAadhar] = useState()
    const [balance, setBalance] = useState()
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [zip, setZip] = useState('')
    const [fd, setFd] = useState()

    const navigate = useNavigate()



    async function populateInfo() {

        const req = await fetch('http://localhost:8000/api/user', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setAccountId(data.id)
            setFirstName(data.fname)
            setLastName(data.lname)
            setEmail(data.email)
            setAddress(data.address)
            setContact(data.contact)
            setAadhar(data.aadhar)
            setCity(data.city)
            setRegion(data.state)
            setZip(data.zip)
            setBalance(data.balance)
            setFd(data.fd_amount)
        }
        else {
            alert(data.error)
        }
    }

    async function populateBalance() {

        const req = await fetch('http://localhost:8000/api/balance', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setBalance(data.balance)
        }
        else {
            alert(data.error)
        }
    }

    // async function updateFd(){
    //     const req = await fetch('http://localhost:8000/api/user', {
    //         method: 'POST',
    //         headers: {
    //             'x-access-token': localStorage.getItem('token')
    //         },
    //         body
    //     })
    // }

    async function getUpdatedFd() {

        const req = await fetch('http://localhost:8000/api/updatedfd', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = req.json()
        if (data.status === 'ok') {
            setFd(data.newFd)
        }
        else {
            alert(data.error)
        }
    }
    // async function populateFd(){
    //     const req = await fetch('http://localhost:8000/api/fd', {
    //         headers: {
    //             'x-access-token': localStorage.getItem('token')
    //         },
    //     })

    //     const data = await req.json()
    //     if (data.status === 'ok') {
    //         setBalance(data.balance)
    //     }
    //     else {
    //         alert(data.error)
    //     }
    // }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            if (!user) {
                localStorage.removeItem(token)
                navigate('/login', { replace: true })
            }
            else {
                // populateBalance()
                populateInfo()
                // getUpdatedFd()

            }
        }

    }, [])

    return (
        <div>
            <NavBarLoggedIn />
            <div className="container mt-4" style={{ color: "white", border: "4px solid white", borderRadius: "10px" }}>
                <div className="jumbotron">
                    <div className="gridpf">
                        <div className="c1">
                            <img src={bpfp} alt="" className="image" />
                        </div>
                        <div className="c2">
                            <h2 className="display-4">{firstName} {lastName}</h2>

                            <p>Account Number: {accountId}</p>
                            <p>Balance : {balance}</p>
                            <p>Fixed Deposit: {fd}</p>
                            
                           
                        </div>
                    </div>
                    <hr className="my-4" />
                    <div className="profile-info">
                        <p>Address : {address}, {city} - {zip}, {region}</p>
                        <p>Contact Number : {contact} </p>
                        <p>Email : {email}</p>
                        <p>Aadhar Number : {aadhar} </p>
                        {/* <p>Balance : {balance}</p> */}
                        <p className="lead">
                            <a className="btn btn-primary btn-lg mb-2" href="#" role="button">
                                Learn more
                            </a>
                        </p>
                    </div>

                </div>
            </div>
            <Footer />
        </div>

    );
};

export default ProfileNew;