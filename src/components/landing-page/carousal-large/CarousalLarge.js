import React, {useEffect} from 'react';
import './CarousalLarge.css';
import CarousalLargeScript from './CarousalLargeScript';

const CarousalLarge = () => {

    useEffect(() => {
        CarousalLargeScript();
    }, []);


    return (
        <section className="section1" >
            <h2 className="section1-title">Click on mobiles in navigation above to go to mobiles page. <br/><br/>Upto 25% off on premium phones such as Realme, Samsung, Oppo</h2>
            <div className="overlay">
                <div className="container-large">
                    <div className="dots"></div>
                    <div className="carousal-large">
                        <img image="0" src="img/carousal/shiwa-id-Bajw65b3mXo-unsplash.jpg" alt=""/>
                        <img image="1" src="img/carousal/nasik-lababan-LGYeTNMDev0-unsplash.jpg" alt=""/>
                        <img image="2" src="img/carousal/becca-tapert-QofjUnxy9LY-unsplash.jpg" alt=""/>
                        <img image="3" src="img/carousal/thom-holmes-J2e34-1CVVs-unsplash.jpg" alt=""/>
                        <img image="4" src="img/carousal/mike-yukhtenko-hvbIl1XfMlM-unsplash.jpg" alt=""/>
                        <img image="5" src="img/carousal/saulo-mohana-D_kOW7iHNnw-unsplash.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CarousalLarge;
