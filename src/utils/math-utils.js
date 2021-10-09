export function getRandom(num){
    return Math.floor(Math.random() * num)
}
export function changeSequence(num){
    if (num === 0){
        return "循环"
    }else if (num === 1){
        return "顺序"
    }else{
        return "单曲"
    }
}