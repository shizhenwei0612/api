const mongoose=require('mongoose')
let UserSchema = new mongoose.Schema({
    imgPath:{type:String ,required:true} ,
    coding:{type:String,required:true}, //required 必须
    title:{type:String ,required:true}, //default 默认
    type:{type:String ,required:true},
    price:{type:String,required:true},
    num:{type:Number,required:true},  
    salesman:{type:String,required:true} 
  });
 // 4. 将schema转化为数据模型
let model = mongoose.model('mds', UserSchema);
module.exports=model