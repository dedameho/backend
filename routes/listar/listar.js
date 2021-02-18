const express = require('express');
const router = express.Router();
const pool = require('../../lib/pool');
const {verify} = require('../../lib/token');

router.get('/getproducts',verify,(req,res)=>{
    pool.query('SELECT * FROM products',(error,productos)=>{
        if(error){
            res.json({
                status:'error',
                message:error
            })
        }else{
            res.json(productos);
        }
    })
})
router.post('/getproduct',verify,(req,res)=>{
    pool.query('SELECT * FROM products WHERE idproducts = ?',[req.body.id],(error,productos)=>{
        if(error){
            res.json({
                status:'error',
                message:error
            })
        }else{
            res.json(productos);
        }
    })
})

module.exports = router;