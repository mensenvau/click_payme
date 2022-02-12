module.exports = CheckPerformTransaction = async(data,javob)=>
{
  
    if(!(data.params.account.user))  {
        return   javob.json({error:{
            code : -32504,
            message : 'AccessDeniet',
            data : null
        }})
}


    let order = data.params.account.user || data.params.account.itleader  

    const BilingErrors = require("./BilingErrors")
    const { poolPromise } = require("../../db/dbConnect")
    const pool = await poolPromise
    const request = await pool.request();
    request.input("id", order); 
    request.query("SELECT *FROM orders WHERE id=@id")
    .then((rest) => {
        console.log(rest.recordset)
       if(rest.recordset.length==0) return  javob.json({error: BilingErrors.OrderNotFound()})
       if(rest.recordset[0].state != 0 ) return javob.json({error:BilingErrors.OrderAvailable()})
       if(rest.recordset[0].amount*100!==data.params.amount)return javob.json({error:BilingErrors.IncorrectAmount()}) 
    
       return javob.json({
            result : { 
                allow : true 
            }
        })
     }).catch((err) => {
         console.log(err)
        javob.json({ error: 2, error_note: "Not" });
   })
}


