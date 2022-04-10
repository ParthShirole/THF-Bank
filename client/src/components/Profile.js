import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import jwt_decode from "jwt-decode"
import api from "../service/api.js"
import axios from "axios"


const Profile = () => {
    const navigate = useNavigate()
    const [balance, setBalance] = useState()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [tempBalance, setTempBalance] = useState()
    const [sendBalance, setSendBalance] = useState(0)
    const [receiverEmail, setReceiverEmail] = useState('')
    const [addFd, setAddFd] = useState()
    const [duration, setDuration] = useState()

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

    async function populateInfo() {

        const req = await fetch('http://localhost:8000/api/user', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            },
        })

        const data = await req.json()
        if (data.status === 'ok') {
            setName(data.name)
            setEmail(data.email)
        }
        else {
            alert(data.error)
        }
    }

    async function updateBalance(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:8000/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({

                balance: tempBalance

            })
        })

        const data = await req.json()
        console.log(data.status)
        if (data.status === 'ok') {

            setBalance(tempBalance)
            setTempBalance(0)
        }
        else {
            alert("error")
        }
    }


    async function transferMoney(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:8000/api/transaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                balance: sendBalance,
                email: receiverEmail,
            })
        })

        const data = await req.json()
        console.log(data)
        if(data.status === 'ok'){
            navigate('/transaction')
        }
    }


    async function fixedDeposit(event){
        event.preventDefault()

        const req = await fetch('http://localhost:8000/api/fd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                fd: addFd,
                // duration: duration,
            })
        })

        const data = await req.json()
        console.log(data)
        if(data.status === 'ok'){
            navigate('/fixedeposit')
        }
    }

   

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)
            if (!user) {
                localStorage.removeItem(token)
                navigate('/login', { replace: true })
            }
            else {
                populateBalance()
                populateInfo()
            }
        }

    }, [])

    return (
        <div>
            <h1>Name: {name}</h1>
            <h1>Email: {email}</h1>
            <h1>Your balance: {balance}</h1>
            <form >
                <input
                    type="number"
                    placeholder="Amount to deposit"
                    value={tempBalance}
                    onChange={(e) => setTempBalance(e.target.value)}
                /><br />
                <button onClick={updateBalance} type="submit" value="Add to account">Deposit</button>
                <br /><br />
                <input
                    type="number"
                    placeholder="Amount to send"
                    value={sendBalance}
                    onChange={(e) => setSendBalance(e.target.value)}
                /><br />
                <input
                    type="email"
                    placeholder="Email of receiver"
                    value={receiverEmail}
                    onChange={(e) => setReceiverEmail(e.target.value)}
                /><br />
                <Link to="/transfer"><button value="Send Money">Transfer</button></Link>
                <br /><br />
                <input
                    type="number"
                    placeholder="Amount to FD"
                    value={addFd}
                    onChange={(e) => setAddFd(e.target.value)}
                />
                <input 
                    type="number"
                    placeholder="Duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <button onClick={fixedDeposit} value="Fix deposit">Confirm</button>
            </form>

        </div>

    )

}

export default Profile