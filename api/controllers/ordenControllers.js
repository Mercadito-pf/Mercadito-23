const {Orden} = require("../schemas/Orden.schema");
exports.crearOrden = (req,res)=>{
    if(!req.body) return res.status(404).send({message:"El cliente no envio los parametros"})

    const OrdenCliente = Orden(req.body);
    OrdenCliente.save()
     .then((data)=>{
        res.json(data)
     })
     .catch((e)=>{
        res.json({message:e})
     })


}

exports.traerTodaslasOrdenes = (req,res)=>{
    sh.find()
    .then((data)=>{
        res.json(data)
    })
    .catch((e)=>{
        res.json({message:e})
    })

}
// --------------------------
exports.getById = (req,res)=>{

    if(!req.params) return res.status(404).send({message:"Cliente sin parametros"})

    const {id} = req.params

    Orden.findById(id)

    .then((data)=>{
        res.json(data)
    })
    .catch((e)=>{
        res.json({message:e})
    });
}
//-----------------------------
exports.modificarOrden = (req,res)=>{
    if(!req.params || req.body) res.status(404).send({message:"El cliente no tiene parametros"})
    const {id} = req.params
    Orden.findByIdAndUpdate(id,req.body,
        async(err, lineUpdate)=>{
            if(err)return res.status(409).send({message:"error interno"})
            if(!lineUpdate) return res.status(404).send({message: "not found"})
            res.status(200).send({data:lineUpdate});
        })
}

exports.traerOrdenUsuario = (req,res)=>{
    const {userId}= req.body;
    Orden.find({userId:userId})
    .then((data)=>{
        res.json(data)
    })
    .catch((e)=>{
        res.json({message:e})
    })
}