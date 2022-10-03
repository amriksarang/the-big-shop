import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <section className="section5">
		<div className="footer">
			<img src="./img/logo.png" alt="=logo"/>
			<ul>
				<li>Home</li>
				<li>Shop All</li>
				<li>Our Story</li>
				<li>Our Craft</li>
				<li>Contact</li>
			</ul>
			<ul>
				<li>FAQ</li>
				<li>Shipping and Returns</li>
				<li>Store Policy</li>
				<li>Payment Methods</li>
				<li>Customer Service</li>
			</ul>
			<ul>
				<li>Facebook</li>
				<li>Instagram</li>
				<li>Twitter</li>
				<li>Pinterest</li>
			</ul>
		</div>
        <div className="copyright">@2023 The Big Shop</div>
	</section>
    );
}

export default Footer;
