//{ features: "Brand", values:["Samsung", "Oneplus"]}

/*
{$or: [
        { "features.Brand": {$eq: "Samsung"} },
        { "features.Brand": {$eq: "OnePlus"} }
    ]
}
*/

export default class SimpleQueryBuilder{
    #query = {};

    constructor(queryData){
        this.queryData = queryData;
    }

    //returns - "{"$or":[{"features.Brand":{"$eq":"Samsung"}},{"features.Brand":{"$eq":"Oneplus"}}]}"
    getQuery(){
        this.#query["$or"] = [];

        let key = "features." + this.queryData["features"];

        this.queryData.values.forEach(item => {
            this.#query["$or"].push({
                [key] : { "$eq" : item }
            });
        });
        return this.#query;
    }
}
