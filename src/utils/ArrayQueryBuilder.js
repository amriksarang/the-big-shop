//{ features: "RAM" , values: [8, 12] }
/*
{$or: [
        { "features.RAM": { $elemMatch: { $eq: 8} } },
        { "features.RAM": { $elemMatch: { $eq: 12} } }
    ]
},
*/
export default class ArrayQueryBuilder{
    #query = {};

    constructor(queryData){
        this.queryData = queryData;
    }

    //returns - "{"$or":[{"features.RAM":{"$elemMatch":{"$eq":8}}},{"features.RAM":{"$elemMatch":{"$eq":12}}}]}"
    getQuery(){
        this.#query["$or"] = [];

        let key = "features." + this.queryData["features"];

        this.queryData.values.forEach(item => {
            
            this.#query["$or"].push({
                [key] : { "$elemMatch" : { "$eq" : parseInt(item)} }
            });
        });
        return this.#query;
    }
}
