const express = require('express');
const router = express.Router();
const pool = require('../../lib/pool');
const { verify } = require('../../lib/token');

router.post('/deleteproduct',verify,(req,res)=>{
    var {id}=req.body;
    pool.query('DELETE FROM products WHERE idproducts = ?',[id],(error,results)=>{
        if(error){
            res.json({
                status:error,
                message:error
            })
        }else{
            res.json({
                status:'ok',
                message: 'Producto eliminado'
            })
        }
    })
})

module.exports=router;