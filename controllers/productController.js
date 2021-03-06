const express = require('express');
var router = express.Router();

// Add New Product Page (addOrEdit.hbs)
router.get('/',(req,res) => {
    res.render("product/addOrEdit" ,
              { viewTitle : "Add New Product" });
});

module.exports = router;

router.post('/',(req,res) => {
    if(req.body._id =='')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

const mongoose = require('mongoose');

const products = mongoose.model('products');

function insertRecord(req,res){
    var productList = new products();
    productList.title = req.body.title;
    productList.status = req.body.status;
    productList.sku = req.body.sku;
    productList.category = req.body.category;
    productList.condition = req.body.condition;
    productList.quantity = req.body.quantity;
    productList.clientCode = req.body.clientCode;
    productList.modelNumber = req.body.modelNumber;
    productList.brand = req.body.brand;
    productList.description = req.body.description;
    productList.dimensions = req.body.dimensions;
    productList.weight = req.body.weight;
    productList.images = req.body.images;
    productList.reserve = req.body.reserve;
    productList.amountReceived = req.body.amountReceived;
    productList.listedPrice = req.body.listedPrice;
    productList.sellingPrice = req.body.sellingPrice;
    productList.paymentMethod = req.body.paymentMethod;
    productList.transactionDetails = req.body.transactionDetails;

    productList.save((err,doc) => {
        if(!err)
            res.redirect('products/list');
        else{
                if(err.name == 'ValidationError')
                { 
                    handleValidationError(err, req.body);
                    res.render("product/addOrEdit" , {
                        viewTitle : "Add New Product",
                        product: req.body
                    });
                }
                else{
                        console.log('Error during record insertion : ' + err);
                    }
            }
    });
}

// Take data from DB
router.get('/list' , (req,res) => {
    products.find((err,docs) => {
        if(!err){
            res.render("product/list", {
                        list: docs
            });
        }
        else{
            console.log('Error in reteieving products list : ' + err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'title':
                body['titleError'] = err.errors[field].message;
                break;
            case 'dimensions':
                body['dimensions'] = err.errors[field].message;
                break;  
            case 'weight':
                body['weight'] = err.errors[field].message;
                break;
            case 'quantity':
                body['quantity'] = err.errors[field].message;
                break;
            case 'photos':
                body['photos'] = err.errors[field].message;
                break;
            case 'description':
                body['description'] = err.errors[field].message;
                break;
            case 'location':
                body['location'] = err.errors[field].message;
                break;
            case 'modelNumber':
                body['modelNumber'] = err.errors[field].message;
                break;
            case 'brand':
                body['brand'] = err.errors[field].message;
                break;
            case 'clientCode':
                body['clientCode'] = err.errors[field].message;
                break;
            case 'category':
                body['category'] = err.errors[field].message;
                break;
            case 'listedPrice':
                body['listedPrice'] = err.errors[field].message;
                break;  
            case 'sellingPrice':
                body['sellingPrice'] = err.errors[field].message;
                break;  
            case 'reserve':
                body['reserve'] = err.errors[field].message;
                break;
            // case 'condition':
            //     body['conditionError'] = err.errors[field].message;
            //     break;
            // case 'paymentMethod':
            //     body['paymentMethodError'] = err.errors[field].message;
            //     break;
            // case 'transactionDetails':
            //     body['transactionDetails'] = err.errors[field].message;
            //     break;
            // case 'amountReceived':
            //     body['amountReceived'] = err.errors[field].message;
            //     break;  
            // case 'status':
            //     body['statusError'] = err.errors[field].message;
            //     break;                   
            default:
                break;
        }
    }
}

function updateRecord(req,res){
    products.findOneAndUpdate({_id: req.body._id} , req.body , {new:true} , (err,doc) => {
        if(!err) {
            res.redirect('products/list');
        }
        else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                res.render("product/addOrEdit" , {
                    viewTitle: 'Update Product',
                    product: req.body
                });
            }
            else{
                console.log('Error during record update : ' + err);
            }
        }
    });
}

router.get('/:id', (req, res) => {
    products.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEdit", {
                viewTitle: "Update Product",
                product: doc,
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    products.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/products/list');
        }
        else { console.log('Error in product delete :' + err); }
    });
});

// display data from mongoDB on view page
// ERROR: display 5 forms, 4 forms are empty & display the correct record on the 4th form!
router.get('/viewProduct/:id', (req, res) => {
    products.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/viewProduct", {
                viewTitle: "View Product Details",
                list: doc
            });
        }
    });
});

// display data from mongoDB on view page
// ERROR: display all the forms with all the records on the DB!

// router.get('/viewProduct/:id' , (req,res) => {
//     products.find((err,doc) => {
//         if(!err){
//             res.render("product/viewProduct", {
//                         viewTitle: "View Product Details",
//                      list: doc
//             });
//         }
//         else{
//             console.log('Error view product page : ' + err);
//         }
//     });
// });