//过程： 先拿到{{xxx}}里面的字符串，然后再对字符串进行加工
function getFragments(template) {
    var matches = template.match(/{{[^}]+}}/g); //万一有人的用户名叫12}  所以这里要处理一下
    return matches || [];
}

function getValue(fragment, envObj) {
    var exp = fragment.replace("{{", "").replace("}}", "");
    var props = exp.split(".");//将表达式分割为属性数组
    var obj = envObj;
    for (var i = 0; i < props.length; i++) {
        obj = obj[props[i]];
    }
    return obj;
}

export default function compile(template, envObj) {
    // 提取模板中的{{}}
    var flags = getFragments(template);
    var result = template;
    for (var i = 0; i < flags.length; i++) {
        var flag = flags[i];
        result = result.replace(flag, getValue(flag, envObj))
    }
    return result;
}