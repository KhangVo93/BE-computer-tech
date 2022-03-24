// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const orderSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    Customer: {
        type: Schema.Types.ObjectId,
        ref: 'customer'
    },
    OrderDate: {
        type: String,
    },
    RequiredDate: {
        type: String,
    },
    ShippedDate: {
        type: String,
    },
    Note: {
        type: String,
        required: false,
    },
    Status: {
        type: String
    },
    OrderDetail: [
        {
            type: Schema.Types.ObjectId,
            ref: 'orderDetail'
        }
    ],
    TimeCreated: {
        type: String
    },
    TimeUpdated: {
        type: String,
    }

})

// Tạo course model
const OrderModel = mongoose.model("order", orderSchema);

// Export course model
module.exports = { OrderModel };