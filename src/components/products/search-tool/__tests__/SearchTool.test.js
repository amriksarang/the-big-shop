import { screen, fireEvent, waitFor, rerender } from "@testing-library/react";
import nock from 'nock';
import {render} from '../../../../test-utils/testing-library-utils';
import { act } from 'react-dom/test-utils';
import userEvent from "@testing-library/user-event";
import AppRoutes from '../../../../routes';

jest.setTimeout(60 * 1000); 


test("button has correct initial color", async () => {    


	nock("https://realm.mongodb.com")
    .persist()
    .get('/api/client/v2.0/app/the-big-shop-poikl/location')
    .reply(() => {
        return [ 200, {"deployment_model":"LOCAL","location":"US-VA","hostname":"https://us-east-1.aws.realm.mongodb.com","ws_hostname":"wss://ws.us-east-1.aws.realm.mongodb.com"}]
    });

    nock("https://us-east-1.aws.realm.mongodb.com")
    .persist()
    .post('/api/client/v2.0/app/the-big-shop-poikl/auth/providers/anon-user/login')
    .reply(200, 
        {"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RldmljZV9pZCI6IjYzNmE5ZGIzYmRlZWM0YTAzNzQwMzBkOCIsImJhYXNfZG9tYWluX2lkIjoiNjA2NzAyZTM2ZmU5Zjc1Yjc0YmY0ZGM3IiwiZXhwIjoxNjY3OTMzMzcyLCJpYXQiOjE2Njc5MzE1NzIsImlzcyI6IjYzNmE5ZGI0YmRlZWM0YTAzNzQwMzEyNCIsInN0aXRjaF9kZXZJZCI6IjYzNmE5ZGIzYmRlZWM0YTAzNzQwMzBkOCIsInN0aXRjaF9kb21haW5JZCI6IjYwNjcwMmUzNmZlOWY3NWI3NGJmNGRjNyIsInN1YiI6IjYzNmE5ZGIzYmRlZWM0YTAzNzQwMzBkNCIsInR5cCI6ImFjY2VzcyJ9.KCq0rPr06Z-YYsJVO2UyuzKy3EXmthFBckffiLMlf_0","refresh_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RhdGEiOm51bGwsImJhYXNfZGV2aWNlX2lkIjoiNjM2YTlkYjNiZGVlYzRhMDM3NDAzMGQ4IiwiYmFhc19kb21haW5faWQiOiI2MDY3MDJlMzZmZTlmNzViNzRiZjRkYzciLCJiYWFzX2lkIjoiNjM2YTlkYjRiZGVlYzRhMDM3NDAzMTI0IiwiYmFhc19pZGVudGl0eSI6eyJpZCI6IjYzNmE5ZGIzYmRlZWM0YTAzNzQwMzBjZi11cGpoY25saXVqbmxwdW10emVpZ2x5bHEiLCJwcm92aWRlcl90eXBlIjoiYW5vbi11c2VyIiwicHJvdmlkZXJfaWQiOiI2MDY3MGNjZTZmZTlmNzViNzRjMDI4OWIifSwiZXhwIjozMjQ0NzMxNTcyLCJpYXQiOjE2Njc5MzE1NzIsInN0aXRjaF9kYXRhIjpudWxsLCJzdGl0Y2hfZGV2SWQiOiI2MzZhOWRiM2JkZWVjNGEwMzc0MDMwZDgiLCJzdGl0Y2hfZG9tYWluSWQiOiI2MDY3MDJlMzZmZTlmNzViNzRiZjRkYzciLCJzdGl0Y2hfaWQiOiI2MzZhOWRiNGJkZWVjNGEwMzc0MDMxMjQiLCJzdGl0Y2hfaWRlbnQiOnsiaWQiOiI2MzZhOWRiM2JkZWVjNGEwMzc0MDMwY2YtdXBqaGNubGl1am5scHVtdHplaWdseWxxIiwicHJvdmlkZXJfdHlwZSI6ImFub24tdXNlciIsInByb3ZpZGVyX2lkIjoiNjA2NzBjY2U2ZmU5Zjc1Yjc0YzAyODliIn0sInN1YiI6IjYzNmE5ZGIzYmRlZWM0YTAzNzQwMzBkNCIsInR5cCI6InJlZnJlc2gifQ.rYEs6vKKBwXTybOqToNanCFT9ijQfXh3nSEjFfLp43E","user_id":"636a9db3bdeec4a0374030d4","device_id":"636a9db3bdeec4a0374030d8"}
    );

    nock("https://us-east-1.aws.realm.mongodb.com")
    .persist()
    .get('/api/client/v2.0/auth/profile')
    .reply(200, 
        {"user_id":"636a9db30cc445e50b8dc213","domain_id":"606702e36fe9f75b74bf4dc7","identities":[{"id":"636a9db30cc445e50b8dc210-vjacfpgmgcfdfqogbdwplpyx","provider_type":"anon-user","provider_id":"60670cce6fe9f75b74c0289b"}],"data":{},"type":"normal"}
    );
    
    
    nock("https://us-east-1.aws.realm.mongodb.com")
    .persist()
    .post('/api/client/v2.0/app/the-big-shop-poikl/functions/call', {"name":"aggregate","arguments":[{"database":"the-big-shop","collection":"products","pipeline":[{"$match":{"$and":[{"$or":[{"features.Processor":{"$eq":"Kirin"}}]}]}},{"$skip":{"$numberInt":"0"}},{"$limit":{"$numberInt":"12"}}]}],"service":"mongodb-atlas"})
    .reply(200, 
        [
            {
                "_id": {
                    "$oid": "606983f211076e1a5ea15e4e"
                },
                "category": "Mobiles",
                "sub-category": "Smart Phones",
                "product-id": {
                    "$numberInt": "18"
                },
                "product-title": "Huawei Y9 Prime 2019 (Emerald Green, 4GB RAM, 128GB Storage)",
                "mrp": "18,999",
                "discount": "11%",
                "details": "16MP front Auto Pop-up camera with f/2.2 aperture | 16MP+8MP+2MP triple rear camera with f/1.8 aperture, f/2.4 aperture and f/2.4 aperture \n 16.7 centimeters (6.59-inch) TFT LCD LTPS multi-touch capacitive touchscreen with 2340 x 1080 pixels resolution, 391 ppi pixel density | 16.7M color support \n Memory, Storage & SIM: 4GB RAM | 128GB internal memory expandable up to 512GB | Dual SIM (nano+nano) dual-standby (4G+4G) \n Android Pie v9.0 +EMUI 9.0.1 operating system with 2.2GHz Cortex A73 + 1.7GHz Cortex A53 Hisilicon Kirin 710F octa core processor \n 4000mAH lithium-ion battery \n 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase \n Box also Includes: Handset, Charger, USB Cable, Quick Start Guide, Warranty Card, Eject tool, TP Protective Case. The box does not include earphones. Country of Origin: China",
                "features": {
                    "RAM": [
                        {
                            "$numberInt": "4"
                        }
                    ],
                    "Camera": {
                        "$numberInt": "16"
                    },
                    "Battery": {
                        "$numberInt": "4000"
                    },
                    "Processor": "Kirin",
                    "Screen Size": {
                        "$numberDouble": "6.59"
                    },
                    "Storage": [
                        {
                            "$numberInt": "128"
                        }
                    ],
                    "Rating": {
                        "$numberInt": "4"
                    },
                    "Brand": "Huawei",
                    "Reviews": {
                        "$numberInt": "356"
                    }
                },
                "varients": [
                    {
                        "type": "Color",
                        "value": [
                            {
                                "id": "18_1",
                                "value": "Emerald Green"
                            }
                        ]
                    },
                    {
                        "type": "RAM",
                        "value": [
                            {
                                "id": "18_2",
                                "value": "4GB, 128GB",
                                "price": "18,999"
                            }
                        ]
                    }
                ],
                "images": {
                    "small": "img/products/18_medium_2.jpg",
                    "large": [
                        "img/products/18_large_1.jpg",
                        "img/products/18_large_2.jpg",
                        "img/products/18_large_3.jpg",
                        "img/products/18_large_4.jpg",
                        "img/products/18_large_5.jpg",
                        "img/products/18_large_6.jpg"
                    ],
                    "thumbs": [
                        "img/products/18_thumb_1.jpg",
                        "img/products/18_thumb_2.jpg",
                        "img/products/18_thumb_3.jpg",
                        "img/products/18_thumb_4.jpg",
                        "img/products/18_thumb_5.jpg",
                        "img/products/18_thumb_6.jpg"
                    ]
                },
                "owner_id": "60671fc7579a811c0297ae2b"
            },
            {
                "_id": {
                    "$oid": "606983f211076e1a5ea15e4f"
                },
                "category": "Mobiles",
                "sub-category": "Smart Phones",
                "product-id": {
                    "$numberInt": "19"
                },
                "product-title": "Nokia 4.2 (Black, 3GB RAM, 32GB Storage)",
                "mrp": "12,490",
                "discount": "8%",
                "details": "5.71-inch (14.5 cm) HD+ \n Latest Android 10 ready \n Dedicated Google Assistant Button \n 3GB RAM, 32GB internal memory expandable up to 400GB \n 13MP primary camera and 8MP front camera \n Customer care number - 1800 1028 169",
                "features": {
                    "RAM": [
                        {
                            "$numberInt": "3"
                        }
                    ],
                    "Camera": {
                        "$numberInt": "13"
                    },
                    "Battery": {
                        "$numberInt": "4000"
                    },
                    "Processor": "Kirin",
                    "Screen Size": {
                        "$numberDouble": "5.71"
                    },
                    "Storage": [
                        {
                            "$numberInt": "32"
                        }
                    ],
                    "Rating": {
                        "$numberInt": "3"
                    },
                    "Brand": "Nokia",
                    "Reviews": {
                        "$numberInt": "278"
                    }
                },
                "varients": [
                    {
                        "type": "Color",
                        "value": [
                            {
                                "id": "19_1",
                                "value": "Black"
                            }
                        ]
                    },
                    {
                        "type": "RAM",
                        "value": [
                            {
                                "id": "19_2",
                                "value": "3GB, 32GB",
                                "price": "12,490"
                            }
                        ]
                    }
                ],
                "images": {
                    "small": "img/products/19_medium_2.jpg",
                    "large": [
                        "img/products/19_large_1.jpg",
                        "img/products/19_large_2.jpg",
                        "img/products/19_large_3.jpg",
                        "img/products/19_large_4.jpg",
                        "img/products/19_large_5.jpg",
                        "img/products/19_large_6.jpg"
                    ],
                    "thumbs": [
                        "img/products/19_thumb_1.jpg",
                        "img/products/19_thumb_2.jpg",
                        "img/products/19_thumb_3.jpg",
                        "img/products/19_thumb_4.jpg",
                        "img/products/19_thumb_5.jpg",
                        "img/products/19_thumb_6.jpg"
                    ]
                },
                "owner_id": "60671fc7579a811c0297ae2b"
            }
        ]
    );


    const {container} = render(<AppRoutes/>);
    
    

    const link = screen.getByRole("link", {
        name: "Mobiles"
    })

    await act( async () => {
        userEvent.click(link);    
    }); 
		 		
    const brandCheckbox = container.querySelector('[data-search-field="Processor"][data-search-value="Kirin"]');
    
    screen.debug(brandCheckbox);

    await act( async () => {
        userEvent.click(brandCheckbox);
    }); 
    
    await waitFor(async () => {

        const elem = await screen.findAllByText("Nokia 4.2 (Black, 3GB RAM, 32GB Storage)");
        //let boxes  = container.getElementsByClassName("products-list");

        //const elem = screen.getByRole("list");

        expect(elem).toBeInTheDocument; 
        
        screen.debug(elem);

        const elem1 = await screen.findAllByText("Huawei Y9 Prime 2019 (Emerald Green, 4GB RAM, 128GB Storage)");

        expect(elem1).toBeInTheDocument; 
        
        screen.debug(elem1);
        
    });
        

    
    


    /*
    await act( async () => {
        render(<AppProvider appId={APP_ID}>
                    <ProductsList/>
        </AppProvider>);

    })    

        //screen.debug(undefined, Infinity);
        /*const link = screen.getByRole("link", {
            name: "Mobiles"
        })*/
        
    /*    //screen.debug(link);    
        await act( async () => {
        userEvent.click(link);    
        });    

        //screen.debug(undefined, Infinity);

        await waitFor(async () => {
        const products = await screen.findAllByText(/Oppo/);
        //screen.debug(undefined, Infinity);
        //screen.debug(products);

        expect(products).toBeInTheDocument;  
        })
*/
    
});
