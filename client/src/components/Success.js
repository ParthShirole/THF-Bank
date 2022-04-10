import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/alerts.css";
import { Alert } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";

const Success = () => {
    return (
        <div>
            <NavBarLoggedIn />
            <div className="bgsucc">
                <div className="container">
                    <Alert variant="success">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            Your transaction was successful. Thank you for choosing us as your banking partner. We are pleased to serve you and your financial needs.
                            ABC bank thanks you for your patience.
                    </p>
                        <hr />
                        <p className="mb-0">
                            For further details and queries, contact us at www.ABCBank@gmail.com
                    </p>
                    </Alert>
                </div>
            </div>
            <Footer />
        </div>


    );
}

export default Success;