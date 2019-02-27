//登陆注册
//数据模型
const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    name:String , 
    pass:String,  //required 必须
    // age:{type:Number ,default:16} //default 默认
  });
 // 4. 将schema转化为数据模型
let user = mongoose.model('users', UserSchema); 
module.exports=user