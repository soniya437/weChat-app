const axios = require('axios')

let getSortedCities = async function(req,res){
    try{
    let cities=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
    let cityObjArray=[]
    
    for(i=0;i<cities.length;i++){
    let obj={city:cities[i]}
    let resp=await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=526d3cc55ceea1dd39ca56cff5d00426`)
    
    console.log(resp.data.main.temp)
    
    obj.temp= resp.data.main.temp //city :bangluru, temp:301.2
    cityObjArray.push(obj)
    }
    
    let sorted = cityObjArray.sort(function(a,b){return a.temp-b.temp})
    console.log(sorted)
    res.status(200).send({status:true,data:sorted})
    
    }
    catch (error) {
                console.log(error)
                res.status(500).send({ msg: error.message })
            }
        }

module.exports.getSortedCities = getSortedCities