import { useEffect } from 'react';
import { analytics } from '../firebase';
import { logEvent } from 'firebase/analytics';
import Catalog from "./Catalog";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Carousel from "./Carousel";

function Home() {

    useEffect(()=>{
        logEvent(analytics,'HOME |S.P|')
    },[])
    
    return ( 
    <div>
        <NavBar/>
        <Carousel/>
        <Catalog/>
        <Footer />
    </div> 
    );
}


export default Home;