//登陆注册
const express =require('express');
const router=express.Router();
const userModel=require('../../db/model/userModel');
const utils=require('../../util/util')
const jsonWebToken=require('../../module/jwt')
const mail=require('../../module/mail')
let checks={} //保存账号和验证码 //redis memache
let start;
let   end;
//用户注册逻辑
router.post('/reg',(req,res)=>{
  //获取用户输入的数据
  const  newUser= new  userModel({
    name:req.body.name,
    pass:req.body.pass,
  });
 //利用账号对比库里是否存在
 const name=req.body.name;
 userModel.find({name:name})
 .then((data)=>{
    if(data.length>0){
        res.send({err:-1,msg:'用户名已经存在'})
    }
 return  userModel.insertMany(newUser)
  })//向数据库插入数据
  .then((data)=>{
            utils.log(data)
            res.send({err:0,msg:'注册成功'})
        })
 .catch((err)=>{
    console.log(err)
 })
})

// 用户登录逻辑
router.post('/login',(req,res)=>{
  const name=req.body.name;
  const pass=req.body.pass;
  userModel.findOne({name:name,pass:pass})
    .then((data)=>{
      if(data!=null){
        utils.log(data)
        let token=jsonWebToken.creatToken({id:'这是id'});
        res.send({err:0,msg:"登陆成功",data:{token}});
      }else{
        res.send({err:-1,msg:"账号或密码错误请重试"})
      }
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:"账号或密码错误请重试"})
      })
})
router.post('/test',(req,res)=>{
  console.log(req.body.token)
  if(!req.body.token){return utils.sendRes(res,-5,'token 缺失')}
  jsonWebToken.checkToken(req.body.token)
  .then((data)=>{
      //接下来的逻辑处理
      res.send({err:0,msg:"成功"})
  })
  .catch(()=>{
    utils.sendRes(res,-999,'token 验证失败请重新登录')
  })
})
router.post('/getEmailCode',(req,res)=>{
  let {email}=req.body
  // let email=req.body.email
  let code=parseInt((Math.random()*9+1)*100000)
  // 邮箱记录 数据库 
  checks[email]=code
  mail.send(email,code)
  .then((data)=>{
      res.send({err:0,msg:'获取验证码ok'},data)
      // start=Date.now();
      // console.log(start)
      console.log(data)
  })
  .catch(()=>{
      res.send({err:-1,msg:'获取验证码失败'})
  })
})
module.exports=router