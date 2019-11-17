var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

// 启动 Socket.io 服务器
// 限定向控制台输出的日志的详细程度，如何处理每个接进来的连接


exports.listen = function(server) {
    io = socketio.listen(server);
    io.set('log level', 1);

    io.sockets.on('connection', function(socket) { // 定义每个用户连接的处理逻辑
        guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed); // 用户连接上来时，赋予其一个访客名字
        
        joinRoom(socket, 'Lobby'); // 把用户放入聊天室

        // 处理用户的消息，更名，以及聊天室的创建和变更
        handleMessageBroadcasting(socket,nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);

        // 用户发出请求时候，向其提供已经被占用的聊天室列表
        socket.on('rooms', function() {
            socket.emit('rooms', io.sockets.manager.rooms);
        });

        // 用户断开连接后的清除逻辑
        handleClientDisconnection(socket, nickNames, namesUsed);
    });


}


// 分配昵称
function assignGuestName(socket, guestNumber, nickNames, namesUsed){
    var name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult',{
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;
}

// 进入聊天室
function joinRoom(socket,  room){
    socket.join(room);
    // ...    
}

// 更名处理
function handleNameChangeAttempts(socket, nickNames, namesUsed){

}

// 消息处理
function handleMessageBroadcasting(socket,nickNames){
    // message事件

}

function handleRoomJoining(socket){
    // join 事件
}

function handleClientDisconnection(socket, nickNames, namesUsed){
    // disconnect
}