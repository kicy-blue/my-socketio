var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
/**
 * app = require('express')() 注册一个express，（）并实例化，再赋值给app,
 * require('http').Server(app) 将http内部对象取出来
 * require('socket.io') 导出的是构造方法，在注册io时，把这个对象http传进去
 */

 //将html静态页面取出来
//  app.get('/',function(req,res){
//      res.sendFile(__dirname,'/index.html')
//  })
 app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
   });

 io.on('connection',function(socket){
    console.log('a user connected')

    //响应用户发送的信息
    socket.on('chat message',function(msg){
        console.log('chat meaasge:'+msg)

        //聊天室--->广播给出发送者之外的所有人
        io.emit('chat message',msg)
    })

    //断开连接
    socket.on('disconnect',function(){
        console.log('user disconnected')
    })
 })

 app.listen(3000,function(){
     console.log('listen at 3000')
 })