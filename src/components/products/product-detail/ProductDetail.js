import React , {useState, useEffect} from 'react';
import {  useSearchParams } from "react-router-dom";
import { AppContext } from '../../../AppProvider';
import { CartContext } from '../cart/CartProvider';
import {Link} from 'react-router-dom';
import './ProductDetail.css';


const ProductDetail = () => {
    let selector, imageContainer, imageContainerRect, imageContainerRectLeft, imageContainerRectRight, imageContainerRectTop, imageContainerRectBottom ,selectorWidth, selectorHeight,
    largeImage, magnifiedImage, magnifiedImageCanvas;

    const [product, setProduct] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const [varients, setVarients] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [position, setPosition] = useState({});

    const [mongoDB, setMongoDB] = useState(null);

    const app = React.useContext(AppContext).app;
    const user = React.useContext(AppContext).user;
    const cart = React.useContext(CartContext);


    useEffect(() => {

        const getDatabase = async () => {
            
            let database = await user?.mongoClient("mongodb-atlas");
            setMongoDB( database );
        }

        getDatabase();
        
    }, [app, user]);


    useEffect( () => {
        
        const func = async () => {
            const id = searchParams.get("productId");
            if(!id) return;

            console.log("calling realm");
            let product = await mongoDB?.db("the-big-shop").collection("products").findOne({
                "product-id": parseInt(id)
            });
            
            setProduct(product);            
        }

        func();
    }, [mongoDB, searchParams]);


    const handleVarients = (type, index, varient) => {

        let items = varients.reduce((prev, item) => { //collect all other varients except this one
            if(item.type !== varient.type)  prev.push(item) ;        
            return prev;
        }, []);

        setPosition(position => ({...position, [type]: index}));
        setVarients([...items, varient]);    //spread other varients and then add this one
    }

    useEffect(() => {
       let varientsList = []
       product?.varients.forEach(varient => {
            varientsList.push({...varient["value"][0], type: varient["type"]}); //set default varients
       });
       setVarients(varientsList);
    },[product, setProduct]);

    

    const getFeatures = (features) => {
        
        return Object.entries(features).map( ([key, value]) => <li key={key}>
            {`${key}: ${value}`}
        </li>)
    }

    const getVarients = (varients) => {
        
        return varients.map( (varient, index) => {
            if(!position[varient.type]) position[varient.type] = 0;
            return <li key={varient.type} className="varient-list">
                        {`${varient.type}`}&nbsp;
                        {
                        varient.value.map((item, index1) => 
                            <span  key={item.id + item.value} className={position[varient.type] === index1 ? "selected-varient" : "not-selected-varient"}
                                onClick={() => handleVarients(varient.type, index1, {"type": varient.type, "id": item.id, "value": item.value, "price": item.price})}>
                                &nbsp;&nbsp;{item.value} &nbsp;&nbsp;
                            </span>
                        )
                        }
                    </li>
        })
    }

    const handleProduct = () => {
        
        cart.setItem(product, quantity, varients);
    }

    const checkImageElementInitialization = function(){
        if(!largeImage)
            largeImage = document.getElementById("large-image"); 
        if(!magnifiedImage)
            magnifiedImage = document.getElementsByClassName("magnified-image")[0];
        if(!magnifiedImageCanvas)
            magnifiedImageCanvas = document.getElementsByClassName("magnifier-canvas")[0];
    }

    const setLargeImage = (e) => {
        checkImageElementInitialization();

        let src = e.target.src.replace("thumb", "large");

        largeImage.src = src;
        magnifiedImage.src = src;
        
    }

    const pointerCloseToBottomEdge = function(clientY){
        checkElementInitialization();
        
        const pointerY = clientY;
        const yPos = (imageContainerRectBottom - pointerY);
        
        if(yPos > selectorHeight / 2){
            return false;
        }
       
        return true;
    }

    const moveSelectorToBottomEdge = function(){
        checkElementInitialization();
            
        selector.style.bottom = 0;
    }

    const moveSelectorYPositionToPointerCenter = function(clientY){
        checkElementInitialization();      
              
        selector.style.top = clientY  - imageContainerRectTop - selectorHeight/2  + 'px';
        
    }

    

    const pointerCloseToTopEdge = (clientY) => {
        checkElementInitialization();
        
        const pointerY = clientY;
        const yPos = (pointerY - imageContainerRectTop);
        
        if(yPos > selectorHeight / 2){
            return false;
        }
        return true;
    }

    const moveSelectorToTopEdge = function(){
        checkElementInitialization();
        selector.style.top = 0;
    }

    const pointerCloseToLeftEdge = function(clientX){
        checkElementInitialization();

        const xPos = (clientX - imageContainerRectLeft);

        if(xPos > selectorWidth / 2){
            return false;
        }
        return true;

    }

    const moveSelectorToLeftEdge = function(){
        checkElementInitialization();
        selector.style.left = 0;
    }

    const pointerCloseToRightEdge = function(clientX){
        checkElementInitialization();

        const xPos = ( imageContainerRectRight- clientX);

        if(xPos > selectorWidth / 2){
            return false;
        }
        return true;

    }

    const moveSelectorToRightEdge = function(){
        checkElementInitialization();
        selector.style.right = 0;
    }

    const moveSelectorXPositionToPointerCenter = function(clientX){
        checkElementInitialization();        
           
        selector.style.left = clientX - imageContainerRectLeft - selectorWidth/2 + 'px';
        
    }

    const checkElementInitialization = function(){
        if(!selector) {
            selector = document.getElementsByClassName("mouseover-selector")[0];  //get selector rectangle
            selectorWidth = selector.offsetWidth;
            selectorHeight = selector.offsetHeight;
        }
        if(!imageContainer){
            imageContainer = document.getElementsByClassName("image-container")[0]; // get regular size image container
        }
        
        imageContainerRect = imageContainer.getBoundingClientRect();
        imageContainerRectLeft = imageContainerRect.left;
        imageContainerRectTop = imageContainerRect.top
        imageContainerRectRight = imageContainerRect.right;
        imageContainerRectBottom = imageContainerRect.bottom;
        
        
    }

    const positionMagnifiedImageInCanvas = function(){
        checkImageElementInitialization();

        
        magnifiedImageCanvas.style.height = '70vh';

        let magnifiedHeight = magnifiedImage.height;
        let magnifiedWidth = magnifiedImage.width;

        let imageHeight = largeImage.height;
        let imageWidth = largeImage.width;

        let heightRatio = magnifiedHeight/imageHeight;
        let widthRatio = magnifiedWidth/imageWidth;

        let rect = selector.getBoundingClientRect();
        let rect2 = largeImage.getBoundingClientRect();

        let netBottom = rect2.bottom - rect.bottom;
        let adjustedNetBottom = netBottom * heightRatio;

        let netLeft = rect.left - rect2.left;
        let adjustedNetLeft = netLeft * widthRatio;

        magnifiedImage.style.bottom = -adjustedNetBottom + 'px';
        magnifiedImage.style.left = -adjustedNetLeft + 'px';
    }

    const mouseoverSelectorPositionController = function(e) { 
        
        checkElementInitialization();
        selector.style.display = 'unset';
        
        // control Y position of rectangle
        if(pointerCloseToBottomEdge(e.clientY)){
            moveSelectorToBottomEdge(); // restrict travel beyond bottom edge 
        }else if(pointerCloseToTopEdge(e.clientY)){
            moveSelectorToTopEdge()     // restrict travel beyond top edge 
        }else{
            moveSelectorYPositionToPointerCenter(e.clientY);
        }

        // control X position of rectangle
        if(pointerCloseToLeftEdge(e.clientX)){
            moveSelectorToLeftEdge();
        }else if(pointerCloseToRightEdge(e.clientX)){
            moveSelectorToRightEdge();
        }else{
            moveSelectorXPositionToPointerCenter(e.clientX);
        }

        positionMagnifiedImageInCanvas();

    }

    const handleMouseLeave = function(e){
        if(magnifiedImageCanvas)
            magnifiedImageCanvas.style.height = 0;
        if(selector)
            selector.style.display = 'none';
    }

    const ratingStyle = () => {
        let ratingStars = parseFloat(product.features.Rating);
        let startWidthPercentage = ratingStars * 100 / 5;
        let style = { "--width": `${startWidthPercentage}%` };
        return style;
    }
    
    const discountedPrice = () => {
        let mrp = parseInt(product.mrp.replace(",", ""));
        let discount = parseInt(product.discount.replace('%', ''));
        
        return mrp - mrp * discount / 100;
    }

    const productDetailHtml = () => {
        return product.details.split("|").map(item => <li key={item}>{item}</li>);
    }

    return <>
     {
        product && <>
            
            <div className="product-details-container">
                <div className='product-image-large'>
                    
                    <div className='product-thumbs'>
                        {
                            product.images.thumbs.map(thumb => <img key={thumb} src={thumb} onClick={setLargeImage} alt="thumbs"/>)
                        }
                    </div>
                    <div onMouseMove={mouseoverSelectorPositionController} className="image-container" onMouseLeave={handleMouseLeave}>
                        <div className="mouseover-selector" ></div>
                        <img id="large-image" src={product.images.large[0]} alt="main"/>
                    </div>
                </div>
                <div className='product-details'>
                    <div className="magnifier-canvas"><img src={product.images.large[0]} className="magnified-image" alt="Magnified"/></div>
                    <h3>{product["product-title"]}</h3>
                    <p><a href="#" className='product-detail-store'>Visit the {product.features["Brand"]} Store</a></p>
                    <div> <div className="product-ratings">
                        <div className="empty-stars">&nbsp;</div>
                        <div className="filled-stars" style={ratingStyle()}></div>
                    </div>&nbsp;{product.features["Reviews"]}&nbsp; ratings</div>
                    <p className='mrp-price' style={{'marginLeft': 0}}>MRP: Rs.{product.mrp}</p>
                    <p>Rs. {discountedPrice()} (less {product.discount})</p>
                    <p className='product-detail-features'>Features:</p>
                    <ul>
                        {getFeatures(product.features) }
                    </ul>
                    <p className='product-detail-select-option-text'>Select options</p>
                    <ul>
                        {getVarients(product.varients)}
                    </ul>
                    <p className='product-detail-text'>Details</p>
                    <ul className="product-detail-details">{productDetailHtml()}</ul>
                    <button className='product-detail-decrease-button' onClick={() => setQuantity( quantity => quantity > 1 ? quantity - 1 : 1) }> - </button> {quantity} 
                    <button className='product-detail-increase-button' onClick={() => setQuantity( quantity => quantity + 1) }> + </button>
                    <button  className='product-detail-add-button' onClick={handleProduct}>Add Product</button>
                    <Link to="/cart" className="product-detail-add-button">Go to Cart</Link>
                </div>
            </div>
        </>
     }
     {
        !product && <p style={{textAlign: "center", marginTop: "20px"}}>Product Not Found</p>
     }
    
    </>

}

export default ProductDetail;
