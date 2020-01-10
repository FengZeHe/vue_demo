import createVNode from './vnode.js'
import createResponsive from './dataResponsive.js'
import render from './render.js'

export default function vue(option) {
    this.$el = option && option.el;
    this.$data = option && option.data;

    this.$vnode = createVNode(document.querySelector(this.$el))
    var that = this;
    createResponsive(this.$data, this, function () {
        // 重新渲染
        that.render();
    })
    this.render()//初次渲染
}

vue.prototype.render = function () {
    render(this.$vnode, this);
}