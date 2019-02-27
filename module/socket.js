//推送功能    服务器主动的发送消息  客户端进行处理
// 1. 调用一个api接口   -》所有打开的网页弹框
// 1. express api服务器   
// 2. 静态文件目录 有一个网页
// 3. 长连接客户端   就是网页
//    长连接的服务端

const WebSocket = require('ws')
const ws = new WebSocket.Server({ port: 8080 },()=>{
    console.log('socket 服务器开启')
})
// 开启一个socket 服务器
let clients=[]
ws.on('connection', (client) => {
    clients.push(client)
    client.send('欢迎光临')

  //接受客户端发送的消息
  client.on('message', (msg) => {
      console.log(msg)
      if(msg=='push'){
        // pushMsg()
      }

  })

  client.on('close', () => {
    console.log(client.name + ' 离开了~')
  })
})

//主动发送消息
function pushMsg(msg){
    for (let index = 0; index < clients.length; index++) {
        clients[index].send(msg)
        
    }
}
module.exports={pushMsg}

