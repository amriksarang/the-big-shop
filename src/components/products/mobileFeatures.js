let mobileFeatures = [
    { "type" : "RAM", "unit" : "GB", "values" : [2,4,6,8,12,16,32] , "valueType": "single", "dataType": "array"},
    {"type" : "Brand", "values" : ["Samsung", "Oppo", "Vivo", "Redmi", "Nokia", "One Plus", "Mi", "Huawei", "LG"], "valueType": "single", "dataType": "string"},
    {"type": "Camera", "unit" : "Mega Pixels", "values" : ["20 - 40", "40 - 60", "60 - 80", "80 - 100", "100 - 120"] , "valueType": "range", "dataType": "number"},
    {"type": "Battery", "unit" : "mAH", "values" : ["2000 - 3000", "3000 - 4000", "4000 - 5000", "5000 - 6000"], "valueType": "range", "dataType": "number"},
    {"type": "Screen Size", "values" : [ "4 - 4.5", "4.5 - 5", "5 - 5.5", "5.5 - 6", "6 - 6.5", "6.5 - 7" ], "valueType": "range" , "dataType": "number"},
    {"type": "Processor", "values" : [ "LG", "Kirin", "SDM450", "Snapdragon", "Exynos", "Mediatek", "Helio" ], "valueType": "single", "dataType": "string"},
    {"type": "Storage", "unit" : "GB" , "values" : [ 16, 32, 64, 128 ], "valueType": "single" , "dataType": "array"},
    {"type": "Rating", "values" : [ 1, 2, 3, 4, 5 ], "valueType": "single" , "dataType": "number"}
]
export default mobileFeatures;
