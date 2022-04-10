import React, { useState } from "react"
import profile from "../assets/bpfp.png";
import emailpic from "../assets/email.jpg";
import pass from "../assets/pass.png";
import "../styles/Login.css"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { Link } from "react-router-dom"


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()
        console.log(data)

        if (data.user) {
            localStorage.setItem('token', data.user)
            window.location.href = '/profile'
        }
        else {
            alert("Incorrect Credentials")
        }
    }


    return (
        <div>
            <NavBar />
            <div className="main">
                <div className="sub-main">
                    <div>
                        <div className="imgs">
                            <div className="container-image">
                                <img src={profile} alt="profile" className="profile" />

                            </div>
                        </div>
                        <form>
                            <h1 className="card-title">Login Page</h1>
                            <div>
                                <img src={emailpic} alt="email" className="email" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="name"
                                    required={true}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="second-input">
                                <img src={pass} alt="pass" className="email" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="name"
                                    required={true}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="login-button">
                                <Link to="/profile"><button onClick={loginUser}>Login</button></Link>
                            </div>

                            <div className="link">
                                <p className="forgot"><a href="#">Forgot Password</a></p>
                                <Link to="/register"><p className="signup">Sign Up</p></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Login