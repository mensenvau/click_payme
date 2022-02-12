const express = require("express");
const app = express();
const { poolPromise } = require("../../db/dbConnect")
const md5 = require("md5")
let config = require("../../config.json").click

//bullar barchasi config ichidan kelopti .
const card_type = config.card_type ;
const merchant_id =config.merchant_id
const merchant_user_id= config.merchant_user_id
const service_id = config.service_id
const return_url= config.return_url
const SECRET_KEY= config.SECRET_KEY


// click go api 
app.get("/click/go", async(req, res) => {
    try {
        const pool = await poolPromise
        const request = await pool.request();
        req.body = req.query 
        request.input("orderid", req.query.orderid || 0) 
        let data = await request.query("SELECT *FROM orders WHERE  id = @orderid")
        let h = data.recordset
        if (h.length == 0)
            return res.redirect(config.return_url )

        return res.redirect(`https://my.click.uz/services/pay?transaction_param=${h[0].id}&amount=${h[0].amount}&card_type=${card_type}&merchant_id=${merchant_id}&merchant_order_id=${merchant_user_id}&service_id=${service_id}&return_url=${return_url}`)

    } catch(e){
        console.log(e)
        return res.redirect(config.return_url )
    }
})

//  Click step first 
app.use("/click/first", async(req, res) => {
    console.log(req.body)
try {
    const h =req.body 
    if (h.action == '0' && h.error == '0') {
        const pool = await poolPromise
        const request = await pool.request();
        request.input("service_id", h.service_id)
        request.input("click_paydoc_id",h.click_paydoc_id)
        request.input("order_id",  h.merchant_trans_id )
        request.input("action",h.action)
        request.input("sign_time", h.sign_time)
        request.input("error", h.error)
        request.input("error_note", h.error_note)
        request.input("sign_string", h.sign_string)
        request.input("click_trans_id", h.click_trans_id)

        let rest = await request.query(`INSERT INTO click_order 
            (service_id,click_paydoc_id,order_id,action,sign_time,error,error_note,sign_string,click_trans_id) VALUES
            (@service_id,@click_paydoc_id,@order_id,@action,@sign_time,@error,@error_note,@sign_string,@click_trans_id);
            SELECT max(id) as id FROM click_order WHERE order_id=@order_id`) 
            
        return res.json({ 
                merchant_trans_id: h.merchant_trans_id, 
                merchant_prepare_id: rest.recordset[0].id  ,
                error: 0,
                error_note: "Success" })
        }

        throw new Error('Уупс!');
       
     } catch(e){
          console.log(e)
          return   res.json({ error: 2, error_note: "Not" });
    }

})

// click etab 3
app.use("/click/last", async(req, res) => {
   console.log(req.body)
   try{
    const h =req.body  
    if (h.action == '1' && h.error == '0') {
        const pool = await poolPromise
        const request = await pool.request();
        const md5hash = md5(h.click_trans_id+h.service_id+SECRET_KEY+h.merchant_trans_id+h.merchant_prepare_id+h.amount+h.action+h.sign_time)
        if(md5hash==req.body.sign_string){
            await request.input("order_id",  h.merchant_trans_id )
            await request.query(`UPDATE click_order SET action=1 WHERE order_id=@order_id ; 
                           UPDATE orders SET click_state = 1 , state = 2  WHERE id=@order_id ;`)
            
            return   res.json({ error: 0, error_note: "Success" });
        } 
      }

      throw new Error('Уупс!');

   } catch {
       return  res.json({ error: 1, error_note: "Not" }); 
    }
})

module.exports = app;