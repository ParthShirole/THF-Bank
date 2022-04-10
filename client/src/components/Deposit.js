import React, { useState } from "react";
import "../styles/Deposit.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
//import SmallHead from './Components/smallHead'

const Deposit = () => {

    const [amount, setAmount] = useState()
    const [desc, setDesc] = useState('')
    const navigate = useNavigate()

    async function updateBalance(event) {
        event.preventDefault()

        const req = await fetch('http://localhost:8000/api/balance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                balance: amount
            })
        })

        const data = await req.json()
        console.log(data.status)
        if (data.status === 'ok') {

            // setAmount(tempBalance)
            // setTempBalance(0)
            navigate('/confirmation')
        }
        else {
            alert("error")
            navigate('/failed')
        }
    }
    return (
        <div>
            <NavBarLoggedIn />
            <div className="bghdep">
                <h1>The Hassle Free Bank Deposit</h1>
                <div className="leftc">
                    <h3>Deposit Form</h3>
                    <>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>$ Amount</InputGroup.Text>
                            <FormControl
                                aria-label="Amount (to the nearest Rupee)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} 
                            />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>

                        <InputGroup>
                            <InputGroup.Text>Description of the transaction</InputGroup.Text>
                            <FormControl 
                                as="textarea" 
                                aria-label="With textarea"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                        </InputGroup>

                        <Button className="mt-3" variant="primary" size="lg" onClick={updateBalance}>Deposit</Button>
                    </>
                </div>
                <div className="rightc">
                    <img src="https://cdn.pixabay.com/photo/2015/11/04/16/36/piggy-bank-1022853_1280.png" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Deposit;