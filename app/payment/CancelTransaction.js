module.exports = CancelTransaction =async(data,javob)=>
{
    const BilingErrors = require("./BilingErrors")
    const { poolPromise } = require("../../db/dbConnect")
    const pool = await poolPromise
    const request = await pool.request();
    request.input("transaction_id", data.params.id); 
    
    request.query("SELECT TOP 1 *FROM transactions WHERE transaction_id=@transaction_id; ")
    .then(async(rest)=>
    {
       //console.log(rest)
       if(rest.recordsets[0].length==0)
        return  javob.json({error:BilingErrors.TransactionNotFound()})
       else
       {    
       
         if(rest.recordsets[0][0].state==1) 
         {
            const datee =new Date().getTime() ;
            const request2 = await pool.request();
            request2.input("transaction_id", data.params.id); 
            request2.input("reason", data.params.reason)
            request2.input("cancel_time", datee.toString()); 
            request2.query(`
               UPDATE transactions SET state= -1 ,cancel_time=@cancel_time ,reason=@reason WHERE transaction_id=@transaction_id;
               UPDATE orders SET state=0  WHERE  id IN  ( SELECT TOP 1 order_id FROM transactions WHERE transaction_id=@transaction_id);
              `)
            .then(async(rest)=>
            {
                return javob.json({result: {
                    state : -1,
                    cancel_time : datee,
                    transaction : data.params.id
                }});
            }).catch((err) => {
                 console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })

        }
        else 
        if(rest.recordsets[0][0].state==2) 
         {

            const request2 = await pool.request();
            request2.input("transaction_id", data.params.id); 
            request2.query(`SELECT *FROM orders WHERE  id IN  ( SELECT TOP 1 order_id FROM transactions WHERE transaction_id=@transaction_id);`)
            .then(async(rest2)=>
            {
               if(rest2.recordsets[0][0].state==3) return   javob.json({error: BilingErrors.OrderNotСanceled()})
               if(rest2.recordsets[0][0].state==2) 
               {
                const datee1 =new Date().getTime() ;
                const request3 = await pool.request();
                request3.input("transaction_id", data.params.id); 
                request3.input("reason", data.params.reason)
                request3.input("cancel_time", datee1.toString()); 
                request3.query(`
                   UPDATE transactions SET state= -2 ,cancel_time=@cancel_time , reason=@reason WHERE transaction_id=@transaction_id;
                   UPDATE orders SET state=-2  WHERE  id IN  ( SELECT TOP 1 order_id FROM transactions WHERE transaction_id=@transaction_id);
                  `)
                .then(async(rest)=>
                {
                    return javob.json({result: {
                        state : -2,
                        cancel_time : datee1,
                        transaction : data.params.id
                    }});
                }).catch((err) => {
                     console.log(err)
                     return  javob.json({ error: 2, error_note: "Not" });
               })
               }
            }).catch((err) => {
                 // console.log(err)
                 return  javob.json({ error: 2, error_note: "Not" });
           })
        } 
        else
        return javob.json({result: {
            state : rest.recordsets[0][0].state,
            cancel_time : parseInt(rest.recordsets[0][0].cancel_time),
            transaction : data.params.id
        }});
       //  return  javob.json({ error: 2, error_note: "Not" });
     }
    }).catch((err) => {
        // console.log(err)
       return  javob.json({ error: 2, error_note: "Not" });
  })

}