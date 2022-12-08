const axios = require('axios')

const express =require('express')
const mongoose = require('mongoose')

const app = express()

const router = express.Router()

app.use(express.json())


//-----------------------connect the mongodb-----------------------------------
mongoose.connect('mongodb+srv://soniyayy:Soniya123@cluster0.ltjt0u7.mongodb.net/soniUser',
{ useNewUrlParser:true}
)
.then(()=> console.log("Mongodb is Connected"))
.catch((err)=>console.log({error: err.message}))

//------------------------Create Model------------------------------------------
const blockSchema = new mongoose.Schema({
    symbol:{
        type:String,
        unique:true},

    name:{
        type:String,
        unique:true},

    marketCapUsd:String,
    
    priceUsd: String,
    changePercent24Hr:String

})

const block = mongoose.model('coinData',blockSchema );

//------------------------------------axios Call-----------------------------------------------------------
let axiousCall = async function(req,res){
    try{
        let options ={
            method:'get',
            url:'https://api.coincap.io/v2/assets',
            headers:{Authorization: "Bearer 87a32648-b397-4ce1-afab-27f806e4dff7"}
              }
 
const result = await axios(options)
const {data} = result.data
let sortArr = data.sort((a,b)=>a.changePercent24Hr - b.changePercent24Hr)

        await block.insertMany(sortArr)
        sortArr.forEach(x => {
            delete x.explorer
            
        })
        
//--------------------------------create data--------------------------------------------------
        const finalData = data.map(a=>{
            return{
                symbol : a.symbol,
                name: a.name,
                marketCapUsd: a.marketCapUsd,
                priceUsd:a.priceUsd,
                changePercent24Hr:a.changePercent24Hr

        }})
        await block.create(finalData)

        return res.status(200).send({data:sortArr})

}
catch(err){ 
    //--------------------------------make unique------------------------------------------------
    if(err.code ==11000){
        return res.status(400).send({status:false, message:"Repetition of data"})
    }
    
    return res.status(500).send(err.message)}
 }

app.use('/',router)

//===============================route=============================================================
router.get("/blockdata",axiousCall )


//========================== Running Port===========================================================
app.listen(3000, ()=> console.log("Express is running on Port 3000"))