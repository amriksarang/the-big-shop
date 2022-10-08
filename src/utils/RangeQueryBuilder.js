//{features: "Camera", values: ["20 - 40", "60 - 80"] }

/*{$or: [
    { "features.Camera": {$gte : 20, $lte: 40} }, 
    { "features.Camera": {$gte : 60, $lte: 80} },
]}*/

export default class RangeQueryBuilder{
    #query = {};

    constructor(queryData){
        this.queryData = queryData;
    }

    //"{"$or":[{"features.Camera":{"$gte":20,"$lte":40}},{"features.Camera":{"$gte":60,"$lte":80}}]}"
    getQuery(){
        this.#query["$or"] = [];

        let key = "features." + this.queryData["features"];

        this.queryData.values.forEach(item => {

            let values = item.split("-");

            let val1 = parseInt(values[0].trim());
            let val2 = parseInt(values[1].trim());

            this.#query["$or"].push({
                [key] : { "$gte" : val1, "$lte" : val2 }
            });
        });
        return this.#query;
    }
}
