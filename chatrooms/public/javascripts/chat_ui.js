var socket = io.connect();
$(document).ready( function(){
    var chatApp = new Chat(socket);
    socket.on('nameResult', function(){});
});


function divEscapedContentElement(message){
    return $('<div</div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').html('<i>' + message + '</i>');
}

// 处理用户数据
function processUserInput(chatApp,socket) {
    var message = $('#send-message').val();
    var systemMessage;

    // if 命令  processCommand
    // 展示回显的内容

    // else   sendMessage
    // 展示插入的内容

    // 最后，清空输入框
};