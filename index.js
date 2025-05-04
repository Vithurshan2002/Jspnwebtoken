const express=require('express');
const app=express();
const bp=require('body-parser');
const jwt=require('jsonwebtoken');
 app.use(express.json()); 
app.use(bp.urlencoded());


const users=require('./users.json');
/* console.log(users);  */
const cars=require('./cars.json');


app.post('/login',(req,res,next)=>
{
    const user=users.find((user)=>user.username===req.body.username);
    if(user){
        if(user.password===req.body.password)
        {
            const token=jwt.sign({userIdd:user.id},'ultro');
            res.send({"token":token});
        }
        else{
            res.send({"message":"acessdenied"});
        }
    }
    else{
        res.send({"message":"acessdenied"});
    }
});



app.get("/data",(req,res,next)=>{
    const token=req.headers['authorization'];
    if(token){
        jwt.verify(token,"ultro",(err,decoideinfor)=>{
            if(err){
                res.send({"message":"acessdenied"});
                return;
            }
            else{
                req.userrId=decoideinfor.userIdd;
                next();
            }
        })
    }
    else{
        res.send({"message":"acessdenied"});
    }

}, 
(req,res,next)=>{
    const filterdata=cars.filter((car)=>car.userId===req.userrId);
    res.send(filterdata);

}
);

app.listen(4000,()=>{
        console.log("port 4000 is listining");
})