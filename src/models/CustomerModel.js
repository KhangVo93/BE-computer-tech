// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const customerSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    FullName: {
        type: String,
    },
    PhoneNumber: {
        type: String,
    },
    Email: {
        type: String,
    },
    Address: {
        type: String,
    },
    City: {
        type: String
    },
    District: {
        type: String
    },
    Carts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'cart'
        }
    ],
    Orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ],
    Username: {
        type: String,
    },
    Password: {
        type: String
    },
    TimeCreated: {
        type: String,
    },
    TimeUpdated: {
        type: String,
    }

})

// Tạo course model
const CustomerModel = mongoose.model("customer", customerSchema);

// Export course model
module.exports = { CustomerModel };