var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user',{ useNewUrlParser: true });
var db = mongoose.connection;// 获取连接对象进行监听
db.on('error',(err)=>{
    console.log('连接错误')
});
db.on('open', function() {
  console.log('连接ok')
});