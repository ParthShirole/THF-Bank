import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/alerts.css";
import { Alert } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import Footer from "./Footer";

const Failure = () => {
    return (
        <div>
            <NavBarLoggedIn />
            <div className="bgsucc">
                <div className="container">
                    <Alert variant="danger">
                        <Alert.Heading>Hey, nice to see you</Alert.Heading>
                        <p>
                            Your transaction failed for some reason. We are currently looking into it and we will get back to you at the earliest with a solution. We thank you for your patience.
                            Thank you.
                    </p>
                        <hr />
                        <p className="mb-0">
                            For any queries, contact us at www.ABCBank.com
                    </p>
                    </Alert>
                </div>
            </div>
            <Footer />
        </div>

    );
}

export default Failure;