const express = require("express");// Tương ứng import express from 'express'

var cors = require('cors')
const mongoose = require("mongoose")// Tương ứng import mongoose from 'mongoose'

const productRouter = require("./src/routers/ProductRouter")
const customerRouter = require("./src/routers/CustomerRouter")
const orderRouter = require("./src/routers/OrderRouter")
const orderDetailRouter = require("./src/routers/OrderDetailRouter")
const cartRouter = require("./src/routers/CartRouter")

const app = express(); //

// Khai báo body lấy tiếng việt
app.use(express.urlencoded({
    extended: true
}))
// Khai báo body dạng json
app.use(express.json());

const port = 8888;

// Kết nối với mongoDB
async function connectMongoDB() {
    await mongoose.connect("mongodb://localhost:27017/CRUD_SHOP24")
}

// Thực thi kết nối
connectMongoDB()
    .then(() => console.log("Connect MongoDB Successfully"))
    .catch((error) => console.log(error))

app.get("/", (request, response) => {
    response.json({
        message: "CRUD course API"
    })
})

app.use(cors())

app.use("/products", productRouter)
app.use("/customers", customerRouter)
app.use("/orders", orderRouter)
app.use("/orderDetail", orderDetailRouter)
app.use("/cart", cartRouter)

app.listen(port, () => {
    console.log("App listening on port", port)
})