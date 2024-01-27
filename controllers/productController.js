import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import slugify from "slugify";
import orderModel from '../models/orderModel.js'
import fs from 'fs';
import braintree from "braintree";
import dotenv from 'dotenv'
dotenv.config();

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files
        console.log(photo)
        switch (true) {
            case !name:
                return res.status(500).send({ error: 'Name is Required' })
            case !description:
                return res.status(500).send({ error: 'description is Required' })
            case !price:
                return res.status(500).send({ error: 'price is Required' })
            case !category:
                return res.status(500).send({ error: 'category is Required' })
            case !quantity:
                return res.status(500).send({ error: 'quantity is Required' })
            case !photo && photo.size > 100000:
                return res.status(500).send({ error: 'photo is required and size should be less than 1mb' })
        }
        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(200).send({
            success: true,
            message: 'product created successfully',
            product
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Product',
            error: error.message
        })
    }
}
export const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } =
            req.fields;
        const { photo } = req.files;
        //alidation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is Required" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(
            req.params.pid,
            { ...req.fields, slug: slugify(name) },
            { new: true }
        );
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Updte product",
        });
    }
};
export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while deleting product',
            error
        })
    }
}
export const getAllProductController = async (req, res) => {
    try {
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createAt: -1 })
        res.status(200).send({
            success: true,
            totalCount: product.length,
            message: 'All Product',
            product

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting all product',
            error: error.massage
        })
    }
}
export const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).populate('category').select('-photo')
        res.status(200).send({
            success: true,
            message: 'single product',
            product,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error
        })
    }
}

export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select('photo')
        if (product.photo.data) {
            res.set('cotentType', product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while getting single product',
            error
        })
    }
}
export const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body
        let args = {}
        if (checked.length > 0) args.category = checked
        if (radio.length > 0) args.price = { $gte: radio[0], $lte: radio[1] }

        const products = await productModel.find(args);

        res.status(200).send({
            success: true,
            message: 'product filtered successfully',
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Somthing Went Wrong while filtering'
        })
    }
}
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            message: 'product counted successfully',
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'somthing went wrong while getting product count',
            error
        })
    }
}
export const productListController = async (req, res) => {
    try {
        const perPage = 6
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "success",
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in per page ctrl"
        })
    }
}

export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ]
        }).select('-photo')
        res.json(results)
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in Searching Product"
        })
    }
}
//Similair Product

export const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params
        const products = await productModel.find({
            category: cid,
            _id: { $ne: pid }
        }).select('-photo').limit(4).populate('category')
        res.status(200).send({
            success: true,
            message: "success",
            products
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error in Searching Product"
        })
    }
}

export const productCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ slug: req.params.slug })
        const products = await productModel.find({ category: category }).populate('category')

        res.status(200).send({
            success: true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in product Category',
            error
        })
    }
}
// PAYMENT GATEWAY API
export const braintreeTokenController = (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send({
                    err
                })
            } else {
                res.send(response)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const braintreePaymentController = async (req, res) => {
    try {
        const { cart, nonce } = req.body
        let total = 0
        cart.map(i =>
        (
            total += JSON.parse(i.price)
        ));
        let newTransaction = gateway.transaction.sale({
            amount:total,
            paymentMethodNonce:nonce,
            options:{
                submitForSettlement:true
            }
        },
        function(error,result){
            if(result){
                const order = new orderModel({
                    products:cart,
                    payment:result,
                    buyer:req.user._id,
                }).save()
                res.json({ok:true})

            }else{
                res.status(500).send(error)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

