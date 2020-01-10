// 将原始对象的prop属性添加到代理对象中
function proxyProp(originalObj, targetObj, prop, callback) {
    if (typeof originalObj[prop] === "object") {
        // 要代理的属性是一个对象,对象要单独处理
        var newTarget = {};//新的 要代理的对象
        createResponsive(originalObj[prop], newTarget, callback);
        Object.defineProperty(targetObj,prop,{
            get:function(){
                return newTarget;
            },
            set:function(value){
                originalObj[prop] = value;
                newTarget = value;
                callback && callback(prop);
            }

        })
    }
    else {
        Object.defineProperty(targetObj, prop, {
            get: function () {
                return originalObj[prop];
            },
            set: function (value) {
                originalObj[prop] = value;
                callback && callback(prop);
            }
        })
    }

}




// 将原始对象的属性，提取到代理对象中
// org是原始对象， target是代理对象 当代理对象被赋值的时候要调用回调函数
export default function createResponsive(originalObj, targetObj, callback) {
    for (var prop in originalObj) {
        proxyProp(originalObj, targetObj, prop, callback);
    }
}