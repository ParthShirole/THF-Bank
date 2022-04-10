import React, { useState } from "react";
import {useNavigate} from "react-router-dom"
import "../styles/FD.css";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";

//import SmallHead from './Components/smallHead'

const FD = () => {
    const navigate = useNavigate()
    const [amount, setAmount] = useState()
    const [time, setTime] = useState()

    const createFD = async(event) => {
        event.preventDefault()
        const req = await fetch('http://localhost:8000/api/fd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify({
                amount: amount,
                time: time,
            })
        })

        const data = await req.json()
        console.log(data)
        if(data.status === 'ok'){
            navigate('/confirmation')
        }
    }


    return (
        <div>
            <NavBarLoggedIn />
            <div className="bghfd">
                <h1>The hassle free bank Fixed Deposit</h1>
                <div className="leftc">
                    <h3>Fixed Deposit (FD) Form</h3>
                    <>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>$ Amount</InputGroup.Text>
                            <FormControl 
                                aria-label="Amount (to the nearest Rupee)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)} />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text>Time</InputGroup.Text>
                            <FormControl 
                                aria-label="Time (to the nearest year)"
                                value={time}
                                onChange={(e) => setTime(e.target.value)} />
                            <InputGroup.Text>years</InputGroup.Text>
                        </InputGroup>

                        <Button className="mt-3" variant="primary" size="lg" onClick={createFD}>Create Fixed Deposit</Button>
                    </>
                </div>
                <div className="rightc">
                    <img src="https://cdn.pixabay.com/photo/2015/11/17/02/18/hourglass-1046841_1280.png" alt="" />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FD;