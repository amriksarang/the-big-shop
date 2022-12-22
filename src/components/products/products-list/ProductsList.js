import React, {useEffect, useState} from 'react';
import { Link, useSearchParams } from "react-router-dom";

import SearchTool from '../search-tool/SearchTool';
import QueryBuilder from '../../../utils/QueryBuilder';

import {AppContext} from '../../../AppProvider';
import {UserContext} from '../../user/UserProvider';

import './products.css';
 
const ProductsList = () => {
	const [productsList, setProductsList] = useState([]);
    const [noDataFound, setNoDataFound] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchData, setSearchData] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
	const [mongoDB, setMongoDB] = useState(null);
	
	const context = React.useContext(AppContext);
	const userContext = React.useContext(UserContext);

    // [ { features: "Camera" , value: "20 - 40"} ,  { features: "Camera" , value: "40 - 60"} , { { features: "RAM" , value: 20} }]
	
	const app = context.app;
	const user = userContext.user;	

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
            let query = new QueryBuilder(mergedQueriesData, searchParams.get("search")).getQuery();
            
            return query;
    }
	
	useEffect(() => {
		
		const getDatabase = async () => {
            
            let database = await user?.mongoClient("mongodb-atlas");
            //console.log("Userrrrr", user);
            setMongoDB( database );
			
        }
        
        user && getDatabase();
		
	}, [user]);
	



	useEffect(() => {

        let query = mergeQueriesData();

		const getProducts = async () => {

            console.log("calling realm");
			const productsCollection =  mongoDB.db("the-big-shop").collection("products");
			
			const products = await productsCollection.aggregate(query);
            if(!products || products.length === 0 ){
                setNoDataFound(true);
            }else{
                setNoDataFound(false);
            }
            
            setProductsList(products);
			
		}
		
		mongoDB && getProducts();
		
	}, [searchData, mongoDB, searchParams]);



    useEffect(() => {
        
        
        if(productsList || productsList?.length === 0)
            setIsLoading(false);
        
    }, [productsList, setProductsList]);

    const clearSearch = () => {
        setSearchParams("");
    }



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
                    <div className="product">
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
            )
           
        });
    }


    return (
        <>  
            {
                searchParams.get("search") && <p className='search-text'>You searched for {searchParams.get("search")}. <button onClick={clearSearch} className='search-button'>x Clear</button></p>
            }
            {                
                    <div className="products-container">                        
                        {/*<SearchTool setSearchData={setSearchData} />*/}
                        {/*<Link to="/product?productId=14">ProductName</Link>*/}
                        <div className="products-list">
                        {
                            isLoading && <p className='no-data-found-or-loading' style={{textAlign: "center"}}><i className="spinner fa fa-spinner fa-spin"></i>&nbsp;Loading...</p>
            }
                            {noDataFound && <p className='no-data-found-or-loading'>No results found, please try a different search</p>}
                            {productsList && productsList.length > 0 && getProducts()}
                        </div>
                    </div> 
            }
            
        </>
    );


	/*
	return productsList.length > 0 && <ul className="products-list">
	{productsList.map( item => <li  key={item["product-title"]}>{item["product-title"]}</li>)}
	</ul>
	*/
	
}

export default ProductsList;
