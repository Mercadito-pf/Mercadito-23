const {FormBuymodel} = require('../schemas/FormBuy.schema');

exports.getFormBuy =async function(req,res){
    try{
        var getForm = await FormBuymodel.findById(req.params.id);
        res.send(getForm);
    }
    catch(e){
        console.log(e)
    }
}

exports.sabeForm = async (req, res) => {
    const newFormBuy=new FormBuymodel(req.body)
    await newFormBuy.save()
    res.send(newFormBuy);
}

