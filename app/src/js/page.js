/**
 * [getViewPortSize 获取浏览器窗口的宽和高]
 * @return {[json]} [宽和高]
 */
function getViewPortSize(){
    var winWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var winHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollL = document.documentElement.scrollLeft || document.body.scrollLeft;
    var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
    return {"width": winWidth, "height":winHeight};
}