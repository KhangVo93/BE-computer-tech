// import thư viện mongoose
const mongoose = require("mongoose");

// Sử dụng phép gán phá hủy cấu trúc đổi tượng để lấy thuộc tính Schema của mongoose
const { Schema } = mongoose;

// Khởi tạo Courst Schema MongoDB
const productSchema = new Schema({
    _id: Schema.Types.ObjectId, // trường _id có kiểu dữ liệu objectid, 16 ký tự
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true,
    },
    ImageUrl: {
        type: String,
        required: true,
    },
    BuyPrice: {
        type: Number,
        required: true,
    },
    PromotionPrice: {
        type: Number,
        required: false
    },
    Description: {
        type: Array,
        default: []
    },
    Brand: {
        type: String,
        default: "hot"
    },
    Quantity: {
        type: Number,
    },
    ImageArr: {
        type: Array,
        default: []
    },
    Comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    TimeCreated: {
        type: Date,
        default: Date.now
    },
    TimeUpdated: {
        type: Date,
        default: Date.now
    }

})

// Tạo course model
const ProductModel = mongoose.model("product", productSchema);

// Export course model
module.exports = { ProductModel };