module.exports = CheckTransaction =async(data,javob)=>
{
    const BilingErrors = require("./BilingErrors")
    const { poolPromise } = require("../../db/dbConnect")
    const pool = await poolPromise
    const request = await pool.request();
    request.input("transaction_id", data.params.id);  
    request.query("SELECT TOP 1 *FROM transactions WHERE transaction_id=@transaction_id ")
    .then(async(rest)=>
    {
    
       if(rest.recordsets[0].length==0)
        return  javob.json({error:BilingErrors.TransactionNotFound})
       else
        return javob.json({result:{
         state : rest.recordsets[0][0].state,
         create_time : parseInt(rest.recordsets[0][0].create_time),
         perform_time : parseInt(rest.recordsets[0][0].perform_time) || 0,
         cancel_time:  parseInt(rest.recordsets[0][0].cancel_time) || 0,
         transaction : rest.recordsets[0][0].transaction_id.toString(),
         reason: parseInt(rest.recordsets[0][0].reason)
       }});
    }).catch((err) => {
        // console.log(err)
        javob.json({ error: 2, error_note: "Not" });
  })

}