const express =require('express');
const router=express.Router();
const foodModel=require('../../db/model/foodModel');
const utils=require('../../util/util')

//添加食物
router.post('/addFood',(req,res)=>{
    //获取数据信息
    let {name,price,imgPath,desc,type,num,token}=req.body
    console.log({name,price,imgPath,desc,type,num})
   //向数据库增加数据
   foodModel.insertMany({name,price,imgPath,desc,type,num,token})
   .then((data)=>{
       res.send({err:0,msg:'添加成功'})
   })
   .catch((err)=>{
       utils.log(err);
       res.send({err:-1,msg:'添加失败'})
   })
})
//查询食物
router.post('/getFood',(req,res)=>{
    foodModel.find()
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'查询成功',data:data})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//模糊查询  关键字查询
router.post('/getFoodByKw',(req,res)=>{
    let{keyword}=req.body;
    let reg =new RegExp(keyword); 
    // foodModel.find({name:{$regex:reg}}) //通过关键字查询到数据
      foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})//模糊查询  //前端input框 按钮   通过按钮掉接口  //或者失去焦点触发Ajax请求 
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'查询成功',data:data})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//分类查询
router.post('/getFoodByType',(req,res)=>{
    let{type}=req.body
    foodModel.find({type})
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'查询成功',data:data})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//根据页码数查询数据
router.post('/getFoodByPage',(req,res)=>{
    let page=req.body.page||1; //如果前端传参就按照参数,没有就是默认1
    let pageSize=req.body.pageSize||2;
    let result={count:0,lists:[]}//设置一个空对象,方便进行传统参数
    //查找数据库数据
    foodModel.find()
    .then((data)=>{
        result.count=data.length;//获取数据总数
        //链式调用
        //记得字符串转换为数字类型
        return foodModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    })
    //通过分页获取到lists信息返回前端
    .then((data)=>{
     console.log(data)
     result.lists=data;//lists 查询到的数据信息列表
     res.send({err:0,msg:'查询成功',result})//返回result获取总条数
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//根据id查数据渲染到页面上
router.post('/getFoodById',(req,res)=>{
    let{ _id}=req.body
    foodModel.find({_id}) //通过_id查询到数据
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'查询成功',data:data})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//修改食物
router.post('/updataFood',(req,res)=>{
    let _id=req.body._id;
    let {name,price,imgPath,desc,type,num}=req.body;
    foodModel.updateOne({_id:_id},{name,price,imgPath,desc,type,num})
    .then((data)=>{
        utils.log(data)
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'修改失败'})
    })
})
//删除食物
router.post('/delFood',(req,res)=>{
    // 获取前端发送数据
    let _id=req.body._id
    foodModel.remove({_id:_id})
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'删除成功'})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:0,msg:'删除失败'})
  })
})
module.exports=router