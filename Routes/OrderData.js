const express = require('express');
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });
  //if email not existing in DB then create: else:insertMeny()
  let eId = await Order.findOne({ 'email': req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("server error", error.message);
    }
  }
  else{
    try {
        await Order.findOneAndUpdate({email:req.body.email},{$push:{order_data:data}}).then(()=>{
            res.json({success:true})
        })
    } catch (error) {
       res.send("Server error",error.message) 
    }
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myOrder=await Order.findOne({"email":req.body.email})
    res.json({orderData:myOrder})
  } catch (error) {
    
  }

})
module.exports= router
