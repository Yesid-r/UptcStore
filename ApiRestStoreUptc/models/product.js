import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    images:[{
        type: String, 
        required: true
    }],
    stock:{
        type: Number,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },    
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    subcategory:{
        type: String,
        required: false 
    }
}, {timestamps: true})

export default mongoose.model('product', productSchema)