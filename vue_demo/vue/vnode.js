function VNode(realDom, template) {
    // node 构造函数
    this.realDom = realDom;
    this.template = template;
    this.children = [];
}




export default function createVNode(realDom) {
    var root = new VNode(realDom, "");
    if (realDom.nodeType === Node.TEXT_NODE) {
        root.template = realDom.nodeValue;
        // 判断真实节点是否为文本节点，如果是，就要记录到虚拟节点
        // 文本节点代表的数字是3

    }
    else {
        for(var i  = 0; i< realDom.childNodes.length;i++){
            var childNode = realDom.childNodes[i];
            var vNode = createVNode(childNode)
            root.children.push(vNode);
        }

    }
    return root;
}