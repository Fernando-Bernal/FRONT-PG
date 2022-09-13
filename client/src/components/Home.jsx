import Catalog from "./Catalog";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Carousel from "./Carousel";

function Home() {
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