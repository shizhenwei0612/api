const express = require('express'); //引入一个express模块
const app = express();//做一个express 实例化
const path=require('path')
const con=require('./db/connenct')//连接数据库
const bodyParser = require('body-parser'); //post请求
const utils=require('./util/util')
app.use(bodyParser.json())// 解析json 格式的post数据
app.use(bodyParser.urlencoded({extended:true}))//解析urlencode  格式的post数据

//静态目录
app.use(express.static(path.join(__dirname,'./public')))

//路由配置
//注册登陆
const  adminUser=require('./router/user/userRouter')
app.use('/admin',adminUser)
//图片上传
const  adminUpload=require('./router/upload/uploadRouter')
app.use('/admin',adminUpload)
//后台食物系统操作
const  adminFood=require('./router/food/foodRouter')
app.use('/admin',utils.verify,adminFood)
//监听服务器端口
app.listen(3000,()=>{    
    console.log('服务器启动 prot：'+3000)
})