import React from "react";
import "../styles/Transfer.css";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Loan = () => {
    return (
        <div>
            <NavBar />
            <div>
                <div className="bghloan">
                    <h2>Loans at the lowest interest rate</h2>
                    <div className="loanform">
                        <>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">@User</InputGroup.Text>
                                <FormControl
                                    placeholder="Your Bank Account No"
                                    aria-label="User Acc No"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                                <FormControl
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon2"
                                />
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Aadhar No"
                                    aria-label="Aadhar No"
                                    aria-describedby="basic-addon3"
                                />
                                <InputGroup.Text id="basic-addon3">@Aadhar</InputGroup.Text>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <InputGroup.Text>$ Amount</InputGroup.Text>
                                <FormControl aria-label="Amount (to the nearest Rupee)" type="number" />
                                <InputGroup.Text>.00</InputGroup.Text>
                            </InputGroup>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Credit statement file</Form.Label>
                                <Form.Control type="file" />
                            </Form.Group>

                            <Form.Label>Loan Type</Form.Label>
                            <Form.Select className="mb-3" defaultValue="Home Loan">
                                <option>Home Loan</option>
                                <option>Car Loan</option>
                                <option>Gold Loan</option>
                                <option>Buisness Loan</option>
                            </Form.Select>

                            <InputGroup>
                                <InputGroup.Text>Description for the loan</InputGroup.Text>
                                <FormControl as="textarea" aria-label="With textarea" />
                            </InputGroup>

                            <Button className="mt-3" variant="primary" size="lg" style={{ marginLeft: "45%" }}>
                                Submit
                            </Button>
                        </>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default Loan;