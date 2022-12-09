//  专门用来存放自定义指令
//  图片加载失败时的指令
export const imageError = {
    inserted(el, options) {
        el.onerror = () => el.src = options.value
    }
}