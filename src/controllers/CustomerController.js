const mongoose = require("mongoose");

const { CustomerModel } = require("../models/CustomerModel");

function createCustomer(request, response) {
    const customer = new CustomerModel({
        _id: mongoose.Types.ObjectId(),
        FullName: request.body.FullName,
        PhoneNumber: request.body.PhoneNumber,
        Email: request.body.Email,
        Address: request.body.Address,
        City: request.body.City,
        District: request.body.District,
        Carts: request.body.Carts,
        Orders: request.body.Orders,
        Username: request.body.Username,
        Password: request.body.Password,
        TimeCreated: request.body.TimeCreated,
        TimeUpdated: request.body.TimeUpdated,
    });

    customer.save()
        .then((newCustomer) => {
            return response.status(200).json({
                message: 'create customer success',
                customer: newCustomer
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'create customer fail',
                error: error.message
            })
        })
}

function getAllCustomer(request, response) {
    CustomerModel.find()
        .select("_id FullName PhoneNumber Email Address Carts City District")
        .then((customerList) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function get_idCustomerByEmail(request, response) {
    const email = request.params.email;
    CustomerModel.find({ Email: email })
        .select("_id")
        .then((customerList) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function get_idCustomerByUsername(request, response) {
    const username = request.params.username;
    CustomerModel.find({ Username: username })
        .select("_id")
        .then((customerList) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function getCustomerByPhone(request, response) {
    const phonenumber = request.params.phonenumber;
    CustomerModel.find({ PhoneNumber: phonenumber })
        .then((customer) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customer
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}


function getDataForCheck(request, response) {
    CustomerModel.find()
        .select("Email Username PhoneNumber")
        .then((customerList) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function getDataForLogin(request, response) {
    const username = request.params.username;
    CustomerModel.find({ Username: username })
        .then((customerList) => {
            return response.status(200).json({
                message: 'load data success',
                customer: customerList
            })
        })
        .catch((error) => {
            return response.status(500).json({
                message: 'load data fail',
                error: error.message
            })
        })
}

function getCustomerById(request, response) {
    const customerId = request.params.customerId;

    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findById(customerId)
            .then((data) => {
                return response.status(200).json({
                    message: 'load data by id success',
                    customer: data
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
            error: "customer Id is not valid"
        })
    }
}

function updateCustomerById(request, response) {
    const customerId = request.params.customerId;

    const updateObj = request.body;
    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findByIdAndUpdate(customerId, updateObj)
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
            error: "customer Id is not valid"
        })
    }
}

function deleteCustomerById(request, response) {
    const customerId = request.params.customerId;

    if (mongoose.Types.ObjectId.isValid(customerId)) {
        CustomerModel.findByIdAndDelete(customerId)
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
            error: "customer Id is not valid"
        })
    }
}
module.exports = { createCustomer, getAllCustomer,  getCustomerByPhone, getCustomerById, get_idCustomerByUsername, get_idCustomerByEmail, getDataForLogin, getDataForCheck, updateCustomerById, deleteCustomerById }