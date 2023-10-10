const mongoose=require("mongoose")
mongoURI = process.env.mongoURI;

const mongoDB=()=>{
mongoose.connect(mongoURI,{useNewUrlParser:true},async(err,result) =>{
    if(err){console.log(err)}
    else{
     console.log("Connected");
     const fetchData=await mongoose.connection.db.collection("food");
     fetchData.find({}).toArray(async function(err,data){
        const fetchCategory = await mongoose.connection.db.collection("category");
              fetchCategory.find({}).toArray(function(err,catData){
                if(err){console.log(err)}
                else{
                    global.food=data;
                    global.category=catData
                }
              })
        if (err){console.log(err)}
        else{
            global.food=data;
        }
     })
    }
 
});
}
module.exports=mongoDB

