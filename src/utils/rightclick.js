export default {
    inserted(el) {
        const target = el.parentNode;
        const body = document.body;
        body.onmousedown = function () {
            el.style.display = 'none';
        }
        target.onmouseup = function (e) {
            if (e.button === 2) {
                el.style.left = e.clientX  + 'px';
                el.style.top = e.clientY  + 'px';
                el.style.display = 'block';
            }
        }
    },

    update(el) {
        el.style.display = 'none';
    },

    unbind(el) {
        document.body.onmousedown = null;
        el.parentNode.onmousedown = null;
    }
}