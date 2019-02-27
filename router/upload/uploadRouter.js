//图片上传
const express =require('express');
const router=express.Router();
const  multer  = require('multer');//上传图片用的模块
const upload=multer({dest:'uploads/'})//指定上传的缓存目录
const fs=require('fs')
const utils=require('../../util/util')
const Path=require('path')
router.post('/img',upload.single('srcimg'),(req,res)=>{
              //single 上传的数据key值
              console.log(req.file) //获取的信息 
              let{path,mimetype}=req.file
               // 只允许后缀名  png  jpg jpeg gif
               let ext=mimetype.split('/')[1] //ext表示后缀名  split截取字符串
               if(['jpg','png','gif','jpeg'].indexOf(ext)==-1){
                return  res.send({err:0,msg:'图片格式不正确'})
              }
              let name=(Date.now()+parseInt(Math.random()*999999))
               fs.readFile(path,(err,data)=>{
                  if(err){return res.send({err:-1,msg:'上传失败'})}
                fs.writeFile(Path.join(__dirname,`../../public/img/${name}.${ext}`),data,'binary',(err)=>{
                    if(err){return res.send({err:-2,msg:'上传失败'})}
                    let url =`/img/${name}.${ext}`
                    return res.send({err:0,msg:'上传成功',data:url})
                })  
              })
})

module.exports=router