import mobileFeatures from '../components/products/mobileFeatures';
import SimpleQueryBuilder from './SimpleQueryBuilder';
import ArrayQueryBuilder from './ArrayQueryBuilder';
import RangeQueryBuilder from './RangeQueryBuilder';

export default class QueryBuilder{
    #limit = 12;
    #skip = 0;

    constructor(mergedQueriesData, searchTerms){
        this.mergedQueriesData = mergedQueriesData;
        this.searchTerms = searchTerms;
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

    getSearchParams(){
        let pattern = this.searchTerms?.trim();

        if(!pattern)
            return;

        if(pattern.length === 0 || pattern.length > 100){
            return;
        }

        if(!pattern.match(/^[A-Za-z0-9\s]+$/)){
            return;
        }

        let searchText = pattern.split(/(\s+)/);

        return {
            "$search": {
                "index": "default",
                "text": {
                    "query": searchText,
                    "path": {
                        "wildcard": "*"
                    }
                }
            }
        };
    }


    wrapQuery(queries){

        let search = this.getSearchParams();

        let query = [];

        if(search){
            query.push(search);
        }

        if(queries.length === 0){
            query.push({"$skip" : this.#skip });
            query.push({"$limit": this.#limit });
            return query;
        }
            
        query.push({
            "$match" : {
                "$and": queries
            }
        });

        query.push({"$skip" : this.#skip });
        query.push({"$limit": this.#limit });

        return [
            ...query
        ];
        /*
        return  [
            {
                "$match" : {
                    "$and": queries
                }
            },
            {"$skip" : this.#skip },
            {"$limit": this.#limit }
        ];*/
    }
}

/*

 const query = [
                {
                  "$search": {
                    "index": "default",
                    "text": {
                      "query": searchText,
                      "path": {
                        "wildcard": "*"
                      }
                    }
                  }
                }
            ];

const query = [
                {
                    "$search": {
                        "index": "default",
                        "text": {
                            "query": searchText,
                            "path": {
                                "wildcard": "*"
                            }
                        }
                    }
                },
                {
                    "$match": {
                        "$and": [
                            {
                                "$or": [
                                    {
                                        "features.RAM": {
                                            "$elemMatch": {
                                                "$eq": 4
                                            }
                                        }
                                    }
                                ]
                            },
                            
                        ]
                    }
                }
                
            ];
*/
