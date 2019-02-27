// 无状态请求
// 1.session 存服务器端 +cookie 存前端
// 2.jwt jsonWebToken
//     用户登录 服务器端产生一个token (加密字符串) 发送给前端 
//     前端将token 进行保存  
//     前端发起ajax请求的时候携带token  
//     服务端 验证token 是否合法  如果合法继续操作   不合法终止操作
//     token 的使用场景   无状态请求   保持用户的登录状态  第三方登录（token+auth2.0）
// 保持用户的登陆状态   无状态请求


// hash 加密  hs256 加密格式 彩虹表
// const jwt = require('jsonwebtoken');
// //生成token
// let palyload={'id':'13436666468'} //第一个参数是id信息
// let scrict='zhe_shi_sha'//第二个是密钥 相当于密码 保存在服务器端
// // let token = jwt.sign(palyload, scrict);
// // console.log(token)
// //验证token是否合法
// let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IueUqOaIt2lkIiwiaWF0IjoxNTUxMjMyNzY2fQ.F2D3AnNtDg8YlZGhsYykvhQwLIbGsN8yTAKsydZAFTY'
// let decoded = jwt.verify(token, scrict);
// console.log(decoded)

//非对称加密 通过私钥产生token 通过公钥解密token
// const fs=require('fs')
// const path=require('path')
// const jwt = require('jsonwebtoken');
// let palyload={'id':'13436666468'} //第一个参数是id信息
// //读取私钥信息  
// let private_key=fs.readFileSync(path.join(__dirname,'./private_key.pem'))
// //读取公钥信息
// let public_key=fs.readFileSync(path.join(__dirname,'./public_key.pem'))
// //生成一个token
// // var token = jwt.sign(palyload, private_key,{ algorithm: 'RS256'});
// // console.log(token)
// let token='eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzNDM2NjY2NDY4IiwiaWF0IjoxNTUxMjM2MjUzfQ.XcbA4TvwZLtYERrNYgVia6nk7V7AI0YSBHADXWwYHrx6NCq4SrGaRqzBZc269vM4rGOICzGU1pi8wHzneI7MlA8gPAvpmoW1YERtXgQd500Kqe2ME3fpUoZJwOM9SNHQi3gQe3ZH6LHq99RDDo50TWhzfcL6ynZd2ZpYsZaUz3E'
// //验证token是否合法
//  var decoded = jwt.verify(token, public_key);
// console.log(decoded)

//封装哈希加密 token模块
const jwt=require('jsonwebtoken')
const scrict='zhe_shi_sha'

function creatToken(palyload){
    return jwt.sign(palyload,scrict)
}
function checkToken(token){
    return  new Promise((resovle,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
           if(err){ reject('token 验证失败')}
           resovle(data)
           })
    }) 
}
module.exports={
    creatToken,checkToken
}

