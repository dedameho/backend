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
router.post('/product',verify,(req,res)=>{
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
router.put('/product',verify,(req,res)=>{
    var {idproducto,codigo,nombre,referencia,ubicacion,sede_bodega,descripcion} = req.body;
    if(req.files){
        var nuevafoto = req.files.foto;
        var productoActualizado = {
            codigo:codigo,
            nombre:nombre,
            referencia:referencia,
            ubicacion:ubicacion,
            sede_bodega:sede_bodega,
            descripcion:descripcion,
            imagen:`img/${nuevafoto.name}`
        }
        nuevafoto.mv(`./public/img/${nuevafoto.name}`,(error)=>{
            if(error){
                res.json({
                    status:'error',
                    message:'No se pudo actualizar la foto'
                })
            }else{
                pool.query('UPDATE products SET ? WHERE idproducts = ?',[productoActualizado,idproducto],(err,results)=>{
                    if(err){
                        res.json({
                            status:'error',
                            message:err
                        })
                    }else{
                        res.json({
                            status:'ok',
                            message:'Producto actualizado'
                        })
                    }
                })
            }
        })
    }else{
        var productoActualizado = {
            codigo:codigo,
            nombre:nombre,
            referencia:referencia,
            ubicacion:ubicacion,
            sede_bodega:sede_bodega,
            descripcion:descripcion
        }
        pool.query('UPDATE products SET ? WHERE idproducts = ?',[productoActualizado,idproducto],(err,results)=>{
            if(err){
                res.json({
                    status:'error',
                    message:err
                })
            }else{
                res.json({
                    status:'ok',
                    message:'Producto actualizado'
                })
            }
        })
    }
})

module.exports = router;