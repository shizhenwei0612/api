const express =require('express');
const router=express.Router();
const mdModel=require('../../db/model/mdModel');
const utils=require('../../util/util')

//添加商品
router.post('/addMd',(req,res)=>{
    //获取数据信息
    let {imgPath,coding,title,type,price,num,salesman}=req.body
   //向数据库增加数据
   mdModel.insertMany({imgPath,coding,title,type,price,num,salesman})
   .then((data)=>{
       res.send({err:0,msg:'添加成功'})
   })
   .catch((err)=>{
       utils.log(err);
       res.send({err:-1,msg:'添加失败'})
   })
})

//模糊查询  关键字查询
router.post('/getMdByKw',(req,res)=>{
    let{keyword}=req.body;
    let reg =new RegExp(keyword); 
    // mdModel.find({type:{$regex:reg}}) //通过关键字查询到数据
    mdModel.find({$or:[{type:{$regex:reg}},{salesman:{$regex:reg}}]})//模糊查询  //前端input框 按钮   通过按钮掉接口  //或者失去焦点触发Ajax请求 
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
router.post('/getMdByType',(req,res)=>{
    let{type}=req.body
    mdModel.find({type})
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'查询成功',data:data})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//根据id查数据渲染到页面上
router.post('/getMdById',(req,res)=>{
    let{ _id}=req.body
    mdModel.find({_id}) //通过_id查询到数据
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
router.post('/getMdByPage',(req,res)=>{
    let page=req.body.page||1; //如果前端传参就按照参数,没有就是默认1
    let pageSize=req.body.pageSize||2;
    let result={count:0,lists:[]}//设置一个空对象,方便进行传统参数
    //查找数据库数据
    mdModel.find()
    .then((data)=>{
        result.count=data.length;//获取数据总数
        //链式调用
        //记得字符串转换为数字类型
        return mdModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    })
    //通过分页获取到lists信息返回前端
    .then((data)=>{
    //  console.log(data)
     result.lists=data;//lists 查询到的数据信息列表
     res.send({err:0,msg:'查询成功',result})//返回result获取总条数
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'查询失败'})
  })
})
//修改商品
router.post('/updataMd',(req,res)=>{
    let _id=req.body._id;
    let {title,price,imgPath,salesman,type,num}=req.body;
    mdModel.updateOne({_id:_id},{title,price,imgPath,salesman,type,num})
    .then((data)=>{
        utils.log(data)
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:-1,msg:'修改失败'})
    })
})
//删除商品
router.post('/delMd',(req,res)=>{
    // 获取前端发送数据
    let _id=req.body._id
    mdModel.remove({_id:_id})
    .then((data)=>{
        utils.log(data)
      res.send({err:0,msg:'删除成功'})
    })
    .catch((err)=>{
        utils.log(err)
        res.send({err:0,msg:'删除失败'})
  })
})
//批量删除
router.post('/datadelMd',(req,res)=>{
    let {arrayId}= req.body
    console.log(arrayId)
    arrayId.forEach((item,index) => {
        console.log(item)
        mdModel.deleteMany({_id:item})
        .then((data)=>{
        // console.log(data)
        res.send({err:0,msg:"删除成功",data:data})
        })
        .catch((err)=>{
            console.log(err)
        res.send({err:-1,msg:"删除失败"})
        })
    });   
})
module.exports=router