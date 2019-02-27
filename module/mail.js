// 发送验证的核心模块
const nodemailer = require("nodemailer");
  //创建发送邮箱验证嘛的请求对象
  //node_modules/nodemailer/lib/web-know/services.json
  
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",// 发送法的邮箱 服务器
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '352186537@qq.com', // 发送方邮箱
      pass: 'rsbikfskcfqhcbce' //  发送发邮箱的安全密码  pop3 smtp 生成的授权码
    }
  });

   function send(toMail,msg){
       return new Promise((reslove,reject)=>{
            //发送的信息
            let mailOptions = {
                from: '"Fred Foo 👻" <352186537@qq.com>', // sender address
                to: toMail, // list of receivers
                subject: "1823注册验证码", // Subject line
                text: `欢迎注册，你的验证码是${msg};5分钟有效`, // plain text body
            // html: "<h1>Hello world?</h1>" // html body
            };

            transporter.sendMail(mailOptions,(err,info)=>{
                if(err){
                   reject()
                }else{
                   reslove()
                }
             })
       })
   
   
   }
  
  module.exports={send}


