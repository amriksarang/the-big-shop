import React from 'react';
import mobileFeatures from '../mobileFeatures';
import './SearchTool.css';

const SearchTool = ({setSearchData}) => {

    //let productType = new URLSearchParams(window.location.search).get('products');

    const handleSelection = (e) => {
        
        let value = e.target.getAttribute("data-search-value");

        if(Number.isInteger(parseInt(value)))
            value = parseInt(e.target.getAttribute("data-search-value"));

        if(e.target.checked){
            
            setSearchData(data => {
               
                const val = [
                    ...data,
                    {
                        features: e.target.getAttribute("data-search-field"),
                        value: value
                    }
                ];
                console.log("checked", val);
                return val});
        }else{
            setSearchData(data => {
                
                const val = data.filter( item => item.value !== value);
                console.log("unchecked", val)
                return val;
            });
        }
    }

    const getSearchItem = (feature) => {
        return feature.values.map( item => (
            <p key={item }> 
                <input type="checkbox" onChange={(e) => handleSelection(e)}  data-search-field={feature.type} data-search-value={item} /> 
                <span className="feature-value" >{item} {feature.unit}</span>
            </p>
        ));
    }

    const getSearchItems = () => {
        
        return mobileFeatures.map( feature => (
            <div className="search-tool-items" key={feature.type}>
                <p>{feature.type}</p>
                <div className="search-tool-item" >
                    {getSearchItem(feature)}
                </div>
            </div>
        ));
    }

    return (
        <div className="search-tool">
            {getSearchItems()}
        </div>
    );
}

export default SearchTool;

