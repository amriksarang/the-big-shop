import React from 'react';
import CarousalLarge from './carousal-large/CarousalLarge';
import CarousalSmall from './carousal-small/CarousalSmall';
import HighlightedProduct from './highlighted-product/HighlightedProduct';
import Shipping from './shipping/Shipping';

const LandingPage = () => {
    return (
        <>
            <CarousalLarge />
            <CarousalSmall />
            <HighlightedProduct />
            <Shipping />
        </>
    );
}

export default LandingPage;
