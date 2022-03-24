const mongoose = require("mongoose");

const { ProductModel } = require("../models/ProductModel");

function createProduct(request, response) {
    const product = new ProductModel({
        _id: mongoose.Types.ObjectId(),
        Name: request.body.Name,
        Type: request.body.Type,
        Brand: request.body.Brand,
        ImageUrl: request.body.ImageUrl,
        ImageArr: request.body.ImageArr,
        BuyPrice: request.body.BuyPrice,
        Quantity: request.body.Quantity,
        PromotionPrice: request.body.PromotionPrice,
        Description: request.body.Description,
    });

    product.save()
        .then((newProduct) => {
            return response.status(200).json({
                message: 'create product success',
                product: newProduct
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'create product fail',
                error: error.message
            })
        })
}

function getAllProduct(request, response) {
    let perPage = request.query.limit // Số lượng sản phẩm trên 1 page
    let page = (request.query.skip - 1) * perPage
    // var condition = {}
    // if (request.query.name) {
    //     condition.Name = {
    //         $regex: request.query.name
    //     }
    // }
    // if (request.query.priceMin || request.query.priceMax) {
    //     condition.BuyPrice = {
    //         $gt: request.query.priceMin || 0,
    //         $lt: request.query.priceMax || 1000000
    //     }
    // }
    // if (request.query.valueSelected != "none" && request.query.valueSelected != undefined) {
    //     condition.Type = {
    //         $regex: request.query.valueSelected
    //     }
    // }
    ProductModel
        .find()
        .limit(perPage)
        .skip(page)
        .select("_id Name Type ImageUrl ImageArr Brand BuyPrice PromotionPrice Description TimeCreated TimeUpdated")
        // .then((data) => {
        //     return response.status(200).json({
        //         message: 'load data by id success',
        //         product: data
        //     })
        // })
        .exec((err, products) => {
            ProductModel.countDocuments((err, count) => {
                if (err) return next(err);

                response.status(200).json({
                    pages: Math.ceil(count / perPage),
                    products
                })
            })
        })
}

function getProductById(request, response) {
    const productId = request.params.productId;

    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findById(productId)
            .then((data) => {
                return response.status(200).json({
                    message: 'load data by id success',
                    product: data
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'load data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "product Id is not valid"
        })
    }
}

function getProductByType(request, response) {
    const type = request.params.type;

    ProductModel.find({ Type: type })
        .then((data) => {
            return response.status(200).json({
                message: 'load data by id success',
                product: data
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data by id fail',
                error: error.message
            })
        })
}

function getProductByTypeAndName(request, response) {
    const type = request.params.type;
    const name = request.params.name
    ProductModel.find({ Type: type, Name: { $regex: name } })
        .then((data) => {
            return response.status(200).json({
                message: 'load data by id success',
                product: data
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data by id fail',
                error: error.message
            })
        })
}

function getProductByPrice(request, response) {
    const condition = request.params.condition; //1: giá thấp đến cao, -1: giá cao đến thâps
    var typeD = {}

    if (request.params.type !== 'null') {
        typeD = { Type: request.params.type }
    }

    ProductModel.find(typeD)
        .sort({ PromotionPrice: condition })
        .then((data) => {
            return response.status(200).json({
                message: 'load data by id success',
                product: data
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data by id fail',
                error: error.message
            })
        })
}

function updateProductById(request, response) {
    const productId = request.params.productId;

    const updateObj = request.body;
    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findByIdAndUpdate(productId, updateObj)
            .then((updateObj) => {
                return response.status(200).json({
                    message: 'update data by id success',
                    updateObj: updateObj
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'update data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "product Id is not valid"
        })
    }
}

function deleteProductById(request, response) {
    const productId = request.params.productId;

    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findByIdAndDelete(productId)
            .then(() => {
                return response.status(200).json({
                    message: 'delete data by id success',
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'delete data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "product Id is not valid"
        })
    }
}

function getQuantityProductById(request, response) {
    const productId = request.params.productId;

    if (mongoose.Types.ObjectId.isValid(productId)) {
        ProductModel.findById(productId)
            .select('Quantity')
            .then((data) => {
                return response.status(200).json({
                    message: 'load data by id success',
                    product: data
                })
            })
            .catch((error) => {
                return response.status(500).json({
                    message: 'load data by id fail',
                    error: error.message
                })
            })
    }
    else {
        // Nếu không phải objectId thì trả ra lỗi 400 - bad request
        response.status(400).json({
            message: "fail",
            error: "product Id is not valid"
        })
    }
}
module.exports = { createProduct, getAllProduct, getProductByTypeAndName, getProductByPrice, getQuantityProductById, getProductById, getProductByType, updateProductById, deleteProductById }