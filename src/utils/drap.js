const getAttr = (obj, key) => (
    obj.currentStyle
    ? obj.currentStyle[key]
    : window.getComputedStyle(obj, false)[key]
);
//antd modal拖拽指令
const vDrap={
    inserted(el){
        const target = el.parentNode.parentNode.parentNode.parentNode;
        console.log(target)
        const header=el.parentNode.parentNode;
        header.onmousedown=(e)=>{
            header.style.cursor='move';

            const currentX=e.clientX;
            const currentY=e.clientY;
            const left=parseInt(getAttr(target,'left'));
            const top=parseInt(getAttr(target,'top'));

            document.onmousemove=(event)=>{
                const disX=event.clientX-currentX;
                const disY=event.clientY-currentY;

                target.style.left=`${left+disX}px`;
                target.style.top=`${top+disY}px`;

                return false;
            }

            document.onmouseup = () => {
                document.onmousemove = null;
                document.onmouseup = null;
                header.style.cursor='';
            };
        }
    },

    update(el){
        const target=el.parentNode.parentNode.parentNode.parentNode;
        target.style.left='';
        target.style.top='';
    },

    unbind(el){
        const header=el.parentNode.parentNode;
        header.onmousedown=null;
    }
}
export default vDrap