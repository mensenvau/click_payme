const express = require("express");
const app = express();

const { poolPromise } = require("../../db/dbConnect")
const CheckPerformTransaction = require("./CheckPerformTransaction")
const CreateTransaction = require("./CreateTransaction")
const CheckTransaction = require("./CheckTransaction")
const PerformTransaction = require("./PerformTransaction")
const CancelTransaction = require("./CancelTransaction");

let config = require("../../config.json").payme
const password = config.password
const merchant = config.merchant
const return_url= config.return_url 
// function checkAuth
function checkAuth(auth) {
    return auth &&
        (buff = Buffer.from(auth.split(" ")[1], 'base64')) &&
        (str = buff.toString('utf-8')) &&
        str.split(":")[1] == password;
}

// Payme Go 
app.use("/payme/go", async(req, res) => {

    try {
        const pool = await poolPromise
        const request = await pool.request();
        req.body = req.query
        request.input("orderid", req.query.orderid || 0)

        let data = await request.query("SELECT *FROM orders WHERE  id = @orderid")
        let h = data.recordset

        if (h.length == 0)
            return res.redirect("http://archi.uz:1550")

        let string_buffer = Buffer.from(`m=${merchant};ac.user=${h[0].id};a=${h[0].amount*100};s=${return_url}`).toString('base64')
        return res.redirect(`https://checkout.paycom.uz/${string_buffer}`);
        // comment 
        //insert into orders (user_id , amount , payme_state , state , phone ,sana,praduct_id) values (@user_id,@amount,0,0,@phone ,GETDATE(),@praduct_id) ; 
    } catch(e){
        console.log(e)
        return res.redirect(return_url)
    }
})

// Payme listing ... 
app.use("/payme/listing", async(req, res) => {
    data = req.body
    console.log(data)

    if (!(data && data.id)) {
        return res.json({
            error: {
                code: -32504,
                message: 'AccessDeniet',
                data: null
            }
        })
    }

    if (!checkAuth(req.headers['authorization'])) {
        return res.json({
            error: {
                code: -32504,
                message: 'AccessDeniet',
                data: null
            }
        })
    }

    switch (data.method) {
        case "CheckPerformTransaction":
            CheckPerformTransaction(req.body, res);
            break;
        case "CreateTransaction":
            CreateTransaction(req.body, res);
            break;
        case "CheckTransaction":
            CheckTransaction(req.body, res);
            break;
        case "PerformTransaction":
            PerformTransaction(req.body, res);
            break;
        case "CancelTransaction":
            CancelTransaction(req.body, res);
            break;
        default:
            res.json({
                "error": {
                    code: "-0001",
                    message: "Not Method"
                }
            })
            break;
    }

})

module.exports = app;