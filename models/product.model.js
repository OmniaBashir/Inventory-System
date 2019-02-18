const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: 'This field is required'
    },
    category: {
        type: String,
    },
    clientCode: {
        type: String
    },
    brand: {
        type: String
    },
    modelNumber: {
        type: String
    },
    dimensions: {
        type: String
    },
    weight: {   
        type: Number
    },
    quantity: {
        type: Number
    },
    description: {  
        type: String
    },
    photos: {  
        type: String
    },
    location: {
        type: String
    },
    listedPrice: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    reserve: {
        type: Number
    },
    // sku: {
    //     type: Number  
    // },
    // condition: {
    //     type: String,
    //     required: 'You have to choose condition'
    // },
    // paymentMethod: {
    //     type: String,
    //     required: 'You have to choose payment method'
    // },
    // transactionDetails: {
    //     type: String,
    // //    required: 'This field is required'
    // },
    // amountReceived: {
    //     type: String
    // },
    // status: {
    //     type: String,  
    //     required: 'You have to choose status'
    // },
});


mongoose.model('products', productSchema);


// Custom validation
productSchema.path('title').validate((val) => {
    titleRegex = /^[a-zA-Z0-9]+$/; 
    return titleRegex.test(val);
}, 'Invalid title. Please write alphanumeric only');

productSchema.path('clientCode').validate((val) => {
    clientCodeRegex = /^[a-zA-Z0-9]+$/;
    return clientCodeRegex.test(val);
}, 'Invalid client code. Please write alphanumeric only');

productSchema.path('brand').validate((val) => {
    brandRegex = /^[a-zA-Z0-9]+$/;
    return brandRegex.test(val);
}, 'Invalid brand. Please write alphanumeric only');

productSchema.path('modelNumber').validate((val) => {
    modelNumberRegex = /^[a-zA-Z0-9]+$/;
    return modelNumberRegex.test(val);
}, 'Invalid model number. Please write alphanumeric only');

productSchema.path('dimensions').validate((val) => {
    dimensionsRegex = /^[a-zA-Z0-9]+$/;
    return dimensionsRegex.test(val);
}, 'Invalid dimensions. Please write alphanumeric only');

productSchema.path('category').validate((val) => {
    categoryRegex = /^[a-zA-Z0-9]+$/;
    return categoryRegex.test(val);
}, 'Invalid category. Please write alphanumeric only');

productSchema.path('description').validate((val) => {
    descriptionRegex = /^[a-zA-Z0-9]+$/;
    return descriptionRegex.test(val);
}, 'Invalid description. Please write alphanumeric only');

productSchema.path('location').validate((val) => {
    locationRegex = /^[a-zA-Z0-9]+$/;
    return locationRegex.test(val);
}, 'Invalid location. Please write alphanumeric only');

productSchema.path('weight').validate((val) => {
    weightRegex = /^[1-9]+[0-9]*$/;
    return weightRegex.test(val);
}, 'Invalid weight. Please write positive integer only');

productSchema.path('quantity').validate((val) => {
    quantityRegex = /^[1-9]+[0-9]*$/;
    return quantityRegex.test(val);
}, 'Invalid quantity. Please write positive integer only');

productSchema.path('listedPrice').validate((val) => {
    listedPriceRegex = /^[1-9]+[0-9]*$/;
    return listedPriceRegex.test(val);
}, 'Invalid listed price. Please write positive integer only');

productSchema.path('sellingPrice').validate((val) => {
    sellingPriceRegex = /^[1-9]+[0-9]*$/;
    return sellingPriceRegex.test(val);
}, 'Invalid selling price. Please write positive integer only');

productSchema.path('reserve').validate((val) => {
    reserveRegex = /^[1-9]+[0-9]*$/;
    return reserveRegex.test(val);
}, 'Invalid reserve. Please write positive integer only');

// productSchema.path('transactionDetails').validate((val) => {
//     transactionDetailsRegex = /^[a-zA-Z0-9]+$/;
//     return transactionDetailsRegex.test(val);
// }, 'Invalid transaction details. Please write alphanumeric only');

// productSchema.path('amountReceived').validate((val) => {
//     amountReceivedRegex = /^[a-zA-Z0-9]+$/;
//     return amountReceivedRegex.test(val);
// }, 'Invalid amount received. Please write alphanumeric only');
