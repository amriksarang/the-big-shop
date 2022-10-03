import mobileFeatures from '../components/products/mobileFeatures';
import SimpleQueryBuilder from './SimpleQueryBuilder';
import ArrayQueryBuilder from './ArrayQueryBuilder';
import RangeQueryBuilder from './RangeQueryBuilder';

export default class QueryBuilder{
    #limit = 12;
    #skip = 0;

    constructor(mergedQueriesData){
        this.mergedQueriesData = mergedQueriesData;
    }

    getQuery(){
        let queries = [];
        let query = "";

        this.mergedQueriesData.forEach( item => {
            let config = mobileFeatures.find(configItem => item.features === configItem.type);
            if(config.dataType === "array"){
                query = new ArrayQueryBuilder(item).getQuery();
            }else if(config.valueType === "range"){
                query = new RangeQueryBuilder(item).getQuery();
            }else if(config.valueType === "single" && (config.dataType === "number" || config.dataType === "string")){
                query = new SimpleQueryBuilder(item).getQuery();
            }
            
            queries.push(query);
        });

        return this.wrapQuery(queries);
    }

    wrapQuery(queries){

        if(queries.length === 0)
            return [{"$skip" : this.#skip }, {"$limit": this.#limit }];
        
        return  [
            {
                "$match" : {
                    "$and": queries
                }
            },
            {"$skip" : this.#skip },
            {"$limit": this.#limit }
        ];
    }
}
