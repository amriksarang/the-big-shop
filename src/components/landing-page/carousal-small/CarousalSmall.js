import React, {useEffect} from 'react';
import carousalSmallScript from './CarousalSmallScript';
import './CarousalSmall.css';

const CarousalSmall = () => {
    useEffect( () => {
        carousalSmallScript();
    }, []);

    return (
        <section className="section2">
		<h2 className="best-seller-title">Best Sellers</h2>
		<div className="left"><i className="fas fa-chevron-left"></i></div>
        <div className="right"><i className="fas fa-chevron-right"></i></div>

		<div className="container-small">
        
        <div className="carousal-small">
			<div>
				<img data-src="./img/products/1_medium_2.jpg" alt=""/>
				<p>Samsung</p>
				<p>Rs14,000</p>
			</div>
            <div>
                <img data-src="./img/products/2_medium_2.jpg" alt=""/>
                <p>Samsung</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/3_medium_2.jpg" alt=""/>
                <p>Samsung</p>
                <p>Rs 25,000</p>
            </div>
            <div>
                <img data-src="./img/products/4_medium_2.jpg" alt=""/>
                <p>Redmi 9A</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/5_medium_2.jpg" alt=""/>
                <p>M2</p>
                <p>Rs 32,000</p>
            </div>
            <div>
                <img data-src="./img/products/6_medium_2.jpg" alt=""/>
                <p>Oppo</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/7_medium_2.jpg" alt=""/>
                <p>Redmi Note 9 Pro</p>
                <p>Rs 18,000</p>
            </div>
            <div>
                <img data-src="./img/products/8_medium_2.jpg" alt=""/>
                <p>Micromax</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/9_medium_2.jpg" alt=""/>
                <p>Mi 10i</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/10_medium_2.jpg" alt=""/>
                <p>Vivo Y31</p>
                <p>Rs 20,000</p>
            </div>
            <div>
                <img data-src="./img/products/11_medium_2.jpg" alt=""/>
                <p>Samsung</p>
                <p>Rs 28,000</p>
            </div>
            
        </div>
    </div>
	
	</section>
    );

}

export default CarousalSmall;
