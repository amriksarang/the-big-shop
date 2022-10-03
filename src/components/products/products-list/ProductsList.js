import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './products.css';
import SearchTool from '../search-tool/SearchTool';
import QueryBuilder from '../../../utils/QueryBuilder';
import { AppContext } from '../../../AppProvider';

const ProductsList = () => {
    const [productsList, setProductsList] = useState(null);
    const [noDataFound, setNoDataFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState([]);
            // [ { features: "Camera" , value: "20 - 40"} ,  { features: "Camera" , value: "40 - 60"} , { { features: "RAM" , value: 20} }]

    const [mongoDB, setMongoDB] = useState(null);

    const app = React.useContext(AppContext).app;

    const mergeQueriesData = () => {
        const mergedQueriesData = [];
        // [ {features: "Camera", values: ["20 - 40", "60 - 80"] } , { features: "RAM" , values: [8, 12] } , { features: "Brand", values:["Samsung", "Oneplus"]} ] 
        /*
            db.products.aggregate([
                    {$match:    { $and: [
                                        {$or: [
                                                { "features.Camera": {$gte : 20, $lte: 40} }, 
                                                { "features.Camera": {$gte : 60, $lte: 80} }
                                            ]
                                        },
                                        {$or: [
                                                { "features.RAM": { $elemMatch: { $eq: 8} } },
                                                { "features.RAM": { $elemMatch: { $eq: 12} } }
                                            ]
                                        },
                                        {$or: [
                                                { "features.Brand": {$eq: "Samsung"} },
                                                { "features.Brand": {$eq: "OnePlus"} }
                                            ]
                                        }
                                    ]
                                }
                    },
                { $skip: 1 },
                { $limit: 2 }
                    
            ])
        */
            searchData.forEach(item => {
                let data = mergedQueriesData.find( field => field.features === item.features );
                if(data){
                    data.values.push( item.value );
                }else{
                    mergedQueriesData.push( { "features": item.features, values : [item.value]  } );
                }
            });
            let query = new QueryBuilder(mergedQueriesData).getQuery();
            
            return query;
    }
    

    useEffect(() => {

        const getDatabase = async () => {
            let database = app.currentUser.mongoClient("mongodb-atlas");
            setMongoDB( database );
        }

        getDatabase();
        
    }, [app]);


    useEffect(() => {
        setIsLoading(false);
        
        if(productsList && productsList.length === 0)
            setNoDataFound(true);
        else
            setNoDataFound(false);
        
    }, [productsList, setProductsList]);


    useEffect(() => {        
        
        let query = mergeQueriesData();

        const getProducts = async () => {
            
            if (!mongoDB) {
                return;
            }
            console.log("calling realm");
            const productsCollection =  mongoDB.db("the-big-shop").collection("products");
            
            const products = await productsCollection.aggregate(query);
            
            setProductsList(products);

        }
        
        getProducts();

    }, [searchData, setSearchData, mongoDB, setMongoDB]);


    const getProducts = () => {

        return productsList.map( product => {
            
            let mrp = parseInt(product.mrp.replace(",", ""));
            let discount = parseInt(product.discount.replace('%', ''));
            let discountedPrice = mrp - mrp * discount / 100;
            let ratingStars = parseFloat(product.features.Rating);
            let startWidthPercentage = ratingStars * 100 / 5;
            let style = { "--width": `${startWidthPercentage}%` };

            return (
                <Link to={`/product?productId=${product["product-id"]}`} key={product['product-title']}>
                <div className="product" >
                    <img src={product.images.small} alt={product['product-title']} />
                    <div className="discounted-price">₹ {discountedPrice}&nbsp;</div>
                    <div className="mrp-price">₹ {product.mrp}</div>
                    <div className="product-title">{product['product-title']}</div>
                    <div className="product-ratings">
                        <div className="empty-stars">&nbsp;</div>
                        <div className="filled-stars" style={style}></div>
                    </div>
                    <div className="rating-reviews">({product.features.Reviews})</div>
                </div>
                </Link>
            );
        });
    }

    return (
        <>  
            {
                isLoading && <p className='no-data-found-or-loading'><i className="spinner fa fa-spinner fa-spin"></i>&nbsp;Loading...</p>
            }
            {                
                    <div className="products-container">                        
                        <SearchTool setSearchData={setSearchData} />
                        
                        <div className="products-list">
                            {noDataFound && <p className='no-data-found-or-loading'>No results found, please try a different search</p>}
                            {productsList && productsList.length > 0 && getProducts()}
                        </div>
                    </div> 
            }
            
        </>
    );
}

export default ProductsList;
