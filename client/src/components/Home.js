import React from 'react'
import MainArea from './MainArea';
import Cardsrow from './Cardsrow';
import NavBar from "./NavBar";
import Footer from "./Footer";

const Home = () => {
    return ( 
        <div>
            <NavBar />
            <MainArea/>
            <Cardsrow/>
            <Footer />
        </div>
    );
}
 
export default Home;