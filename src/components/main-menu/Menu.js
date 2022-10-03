import React, {useEffect} from 'react';
import './Menu2.css';
import handleNav from './script2';

function Nav(){

    useEffect(() => {
        handleNav();
    }, []);

    return (
        <div className="categories">
        <div className="category">
            <h4>Mobiles</h4>
            <div className="sub-categories">
                <div className="sub-category">
                    <h4>Smartphones</h4>
                    <div className="product-types">Mobile Cases, Covers</div>
                    <div className="product-types">Power Banks</div>
                    <div className="product-types">Battery</div>
                    <div className="product-types">Chargers</div>
                    <div className="product-types">Smart Watches</div>
                    <div className="product-types">Selfie Sticks</div>
                    <div className="product-types">Memory Cards</div>
                </div>
                <div className="sub-category">
                    <h4>Feature Phones</h4>
                    <div className="product-types">Samsung</div>
                    <div className="product-types">Lava</div>
                    <div className="product-types">Micromax</div>
                </div>
            </div>
        </div>
        <div className="category">
            <h4>Computers</h4>
            <div className="sub-categories">
                <div className="sub-category">
                    <h4>Laptops</h4>
                    <div className="product-types">Core i-7</div>
                    <div className="product-types">Core i-5</div>
                    <div className="product-types">Core i-3</div>
                    <div className="product-types">Amd</div>
                </div>
                <div className="sub-category">
                    <h4>Desktops</h4>
                    <div className="product-types">Tower</div>
                    <div className="product-types">Mini</div>
                    <div className="product-types">All-in-one</div>
                </div>
                <div className="sub-category">
                    <h4>Printers</h4>
                    <div className="product-types">Printers</div>
                    <div className="product-types">Scanners</div>
                    <div className="product-types">Copiers</div>
                    <div className="product-types">All-in-one</div>
                </div>
                <div className="sub-category">
                    <h4>Tablets</h4>
                    <div className="product-types">Under 10 inch</div>
                    <div className="product-types">Under 12 inch</div>
                    <div className="product-types">Under 14 inch</div>
                </div>
                <div className="sub-category">
                    <h4>Accessories</h4>
                    <div className="product-types">Keyboards</div>
                    <div className="product-types">Mouse</div>
                    <div className="product-types">USB sticks</div>
                    <div className="product-types">Webcams</div>
                </div>
				
            </div>
        </div>       
        <div className="category">
            <h4>Electronics</h4>
            <div className="sub-categories">
                <div className="sub-category">
                    <h4>Fridges</h4>
                    <div className="product-types">Double Door</div>
                    <div className="product-types">Single Door</div>
                    <div className="product-types">Auto Defrost</div>
                </div>
                <div className="sub-category">
                    <h4>Washing Machines</h4>
                    <div className="product-types">Semi Automatic</div>
                    <div className="product-types">Fully Automatic</div>
                </div>
                <div className="sub-category">
                    <h4>Air Conditioners</h4>
                    <div className="product-types">Split A/c</div>
                    <div className="product-types">Window A/c</div>
                </div>
                <div className="sub-category">
                    <h4>Televisions</h4>
                    <div className="product-types">Full HD</div>
                    <div className="product-types">Smart TV</div>
                    <div className="product-types">Ultra HD</div>
                </div>
                <div className="sub-category">
                    <h4>Speakers</h4>
                </div>
                <div className="sub-category">
                    <h4>Headphones</h4>
                    <div className="product-types">Over Ear</div>
                    <div className="product-types">Inside Ear</div>
                    <div className="product-types">over the Ear</div>
                </div>
                <div className="sub-category">
                    <h4>Fans</h4>
                    <div className="product-types">Pedestal</div>
                    <div className="product-types">Exhaust</div>
                    <div className="product-types">Ceiling</div>
                    <div className="product-types">Table</div>
                </div>
                <div className="sub-category">
                    <h4>Coolers</h4>
                </div>
                <div className="sub-category">
                    <h4>Cameras</h4>
                    <div className="product-types">Binoculars and Telescopes</div>
                    <div className="product-types">Digital Cameras</div>
                </div>
            </div>
        </div>
        <div className="category">
            <h4>Books</h4>
        </div>
		<div className="category">
            <h4>Grocery</h4>
        </div>
		<div className="category">
            <h4>Fashion</h4>
        </div>
		<div className="category">
            <h4>Offers</h4>
        </div>
    </div>
 
    );
}

export default Nav;
