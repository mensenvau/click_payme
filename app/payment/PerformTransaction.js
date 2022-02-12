module.exports = PerformTransaction =async(data,javob)=>
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
             return  javob.json({error:BilingErrors.TransactionNotFound()})
       else
       {    
         if(rest.recordsets[0][0].state==2)
            return javob.json({result: {
                state : rest.recordsets[0][0].state,
                perform_time : parseInt(rest.recordsets[0][0].perform_time),
                transaction : rest.recordsets[0][0].transaction_id.toString()
            }});
         else
          if(rest.recordsets[0][0].state==1) 
          {
            const datee =new Date().getTime() ;
            const request2 = await pool.request();
            request2.input("transaction_id", data.params.id); 
            request2.input("perform_time", datee.toString()); 
            request2.query(`
               UPDATE transactions SET state=2,perform_time=@perform_time WHERE transaction_id=@transaction_id;
               UPDATE orders SET state=2  WHERE  id IN  ( SELECT TOP 1 order_id FROM transactions WHERE transaction_id=@transaction_id);
              `)
            .then(async(rest)=>
            {  
                return javob.json({result: {
                    state : 2,
                    perform_time : datee,
                    transaction : data.params.id
                }});
               
            }).catch((err) => {
                 console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })
        }
        else
        return  javob.json({error:BilingErrors.UnexpectedTransactionState()})
       }
  
    
    }).catch((err) => {
        console.log(err)
        javob.json({ error: 2, error_note: "Not" });
  })

}