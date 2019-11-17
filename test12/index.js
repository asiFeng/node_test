function revertNum( num ){
    if(typeof num == 'number'){
        num += '';
    }
    return num.length? num[num.length-1]+revertNum(num.substring(0,num.length-1)):'';
}

let res = revertNum(1234);
console.log('res: ', res);
console.log(typeof res);
