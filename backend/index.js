const express = require('express');
const cors = require('cors');
const Jwt = require('jsonwebtoken');

require('./database/config');
const UsersSchema = require('./database/usersSchema');
const ProductSchema = require('./database/productSchema');

const app = express();

app.use(cors());
app.use(express.json());

const jwtKey = 'e-comm'

app.post("/signup",verifyToken, async (req,res) => {
    const data = new UsersSchema(req.body);
    let result = await data.save();
    result = result.toObject();
    delete result.userpass;
    Jwt.sign({result},jwtKey,{expiresIn:"1h"},(error,token) => {
        if(error) {
            res.send( {result : "Something Went Wrong"} );
        }
        res.send({
            result,
            authToken:token
        });
    });
});

app.post('/login', verifyToken,async (req,res) => {
    console.log(req.body);
    if(req.body.userpass && req.body.usermail) {
        const data = await UsersSchema.findOne(req.body).select("-userpass");
        if(data) {
            Jwt.sign({data},jwtKey,{expiresIn:"5h"},(error,token) => {
                if(error) {
                    res.send( {result : "Something Went Wrong"} );
                }
                res.send({
                    data,
                    authToken:token
                });
            });
        } else {
            res.send( {result : "No user Found "} );
        }
    } else {
        res.send( {result : "No user Found "} );
    }
});

app.post('/add-product', verifyToken,async (req,res) => {
    let product = new ProductSchema(req.body);
    let result = await product.save();
    res.send(result);
});

app.get('/products',verifyToken, async (req,res) => {
    let products = await ProductSchema.find();
    if(products.length > 0) {
        res.send(products);
    } else {
        res.send({
            result : "No products found!"
        })
    }
});

app.delete("/product/:id", verifyToken,async (req,res) => {
    const result = await ProductSchema.deleteOne({_id:req.params.id});
    res.send(result);
});

app.get('/product/:id', verifyToken,async (req,res) => {
    let result = await ProductSchema.findOne({_id : req.params.id});
    if(result) {
        res.send(result);
    } else {
        res.send({result :"No Records Found!"});
    }
});

app.put("/product/:id", verifyToken,async(req,res) => {
    let result = await ProductSchema.updateOne(
        { _id : req.params.id},
        { $set : req.body }
    );
    res.send(result);
});

app.get("/search/:key", verifyToken ,async(req,res) => {
    const searchKey = req.params.key.trim();
    let result = await ProductSchema.find({
        "$or" : [
            { productname: { $regex: new RegExp(searchKey, 'i') } },
            { productcompany: { $regex: new RegExp(searchKey, 'i') } },
            { productcategory: { $regex: new RegExp(searchKey, 'i') } }
        ]
    });
    res.send(result);
});

//middleware 

function verifyToken (req,res,next) {
    let token = req.headers['authorization'];
    if(token) {
        token = token.split(' ')[1];
        Jwt.verify(token,jwtKey, (error,success) => {
            if(error) {
                res.send({result : "Please Provide Valid Token"})
            } else {
                next();
            }
        })
    } else {
        res.send({result : "Please add token with header"})
    }
}

app.listen(8080);