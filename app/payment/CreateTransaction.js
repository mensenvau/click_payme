module.exports = CreateTransaction =async(data,javob)=>
{
   if(!(data.params.account.user))  {
      return   res.json({error:{
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
    request.query("SELECT TOP 1 *FROM transactions WHERE order_id=@id; SELECT TOP 1 *FROM orders WHERE id=@id")
    .then(async(rest)=>
    {
     
       if(rest.recordsets[0].length>0)
       {
          if(rest.recordsets[0][0].state !== 1 ) return javob.json({error:BilingErrors.UnexpectedTransactionState()});                
          if(rest.recordsets[0][0].transaction_id != data.params.id ) return javob.json({error:BilingErrors.OrderNotFound()});   
          if(data.params.amount) 
              if(!rest.recordsets[1][0].amount*100==data.params.amount) return javob.json({error:BilingErrors.IncorrectAmount()});       

          return javob.json({result: {
                       state : rest.recordsets[0][0].state,
                       create_time : parseInt(rest.recordsets[0][0].create_time),
                       transaction :rest.recordsets[0][0].transaction_id.toString()
          }});
        }
       else
       {

        
        if(!(rest.recordsets[1].length>0 ))
               return javob.json({error:BilingErrors.OrderNotFound()}); 

         
        if(data.params.amount){ 
            if(!rest.recordsets[1][0].amount*100==data.params.amount)
                      return javob.json({error:BilingErrors.IncorrectAmount()});  
        }   

        console.log(rest.recordsets[1])

        const request2 = await pool.request();
        const datee =new Date().getTime() ;
        request2.input("order_id", order); 
        request2.input("time", data.params.time .toString()); 
        request2.input("transaction_id", data.params.id); 
        request2.input("state", 1); 
        request2.input("create_time", datee.toString()); 
        request2.query(`INSERT INTO transactions (time,state,create_time,order_id,transaction_id) VALUES (@time,@state,@create_time,@order_id,@transaction_id)`)
        .then((rest)=>
     { 
              return javob.json({result: {
                       state : 1,
                       create_time : datee,
                       transaction : data.params.id
          }});

        }).catch((err) => {
           console.log(err)
           javob.json({ error: 2, error_note: "Not" });
        })
       }
    }).catch((err) => {
        console.log(err)
       javob.json({ error: 2, error_note: "Not" });
  })
    
}
