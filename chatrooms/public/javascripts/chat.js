var Chat= function(socket) {
    this.socket = socket;
};

// 发送消息
Chat.prototype.sendMessage = function(room, text){
    var message = {
        room: room,
        text: text
    };
    this.socket.emit('message', message)
}

// 变更房间
Chat.prototype.changeRoom = function(room) {
    this.socket.emit('join', {
        newRoom: room
    });
};

Chat.prototype.processCommand = function(command) {
    var words = command.split(' ');
    var command = words[0].substring(1, words[0].length).toLowerCase();
    var message = false;

    //join  changeRoom
    // nick emit('nameAttempt')
};

function changeRoom(){};