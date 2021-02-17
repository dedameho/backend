const express = require('express');
const pool = require('../../lib/pool');
const router = express.Router();
const { verify } = require('../../lib/token');

router.post('/add',verify,(req,res)=>{
    if(req.files.foto){
        var foto = req.files.foto;
        var { codigo,nombre,referencia,ubicacion,sede_bodega,descripcion } = req.body;
        var nuevoProducto = {
            codigo:codigo,
            nombre:nombre,
            referencia:referencia,
            nombre:nombre,
            imagen:`img/${foto.name}`,
            ubicacion:ubicacion,
            sede_bodega:sede_bodega,
            descripcion:descripcion
        }
        foto.mv(`./public/img/${foto.name}`,(error)=>{
            if(error){
                res.json({
                    status:'error',
                    message:error
                })
            }else{
                pool.query('INSERT INTO products SET ?',[nuevoProducto],(err,results,fields)=>{
                    if(err){
                        res.json({
                            status:'error',
                            message:err
                        })
                    }else{
                        res.json({
                            status:'ok',
                            message:'Producto guardado'
                        })
                    }
                })
            }
        })
    }else{
        res.json({
            status:'error',
            message:'No se adjuntó la foto del producto'
        })
    }
})

module.exports= router;