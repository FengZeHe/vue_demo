import compile from "./compile.js";

// 渲染一个虚拟节点（将文本的虚拟节点进行编译）

export default function render(vnode, envObj) {
    if (vnode.realDom.nodeType === Node.TEXT_NODE) {
        vnode.realDom.nodeValue = compile(vnode.template, envObj);
    }
    else {
        for (var i = 0; i < vnode.children.length; i++) {
            var childNode = vnode.children[i];
            render(childNode, envObj);
        }
    }
}