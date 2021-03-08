/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-03-08 09:40:26
 * @Description: 
 */
const getAttr = (obj: HTMLDivElement, key: keyof HTMLDivElement['style']) => {
  return obj.style
    ? obj.style[key] as string
    : window.getComputedStyle(obj, null)[key] as string
};
import { Directive,VNode } from "vue";
//antd modal拖拽指令
const vDrap: Directive<HTMLDivElement, VNode<HTMLDivElement,HTMLDivElement>> = {
  mounted(el) {
    const target = el.parentNode!.parentNode!.parentNode!.parentNode as HTMLDivElement;
    console.log(target)
    const header = el.parentNode!.parentNode as HTMLDivElement;
    header.onmousedown = (e) => {
      header.style.cursor = 'move';

      const currentX = e.clientX;
      const currentY = e.clientY;
      const left = parseInt(getAttr(target, 'left')!);
      const top = parseInt(getAttr(target, 'top')!);

      document.onmousemove = (event) => {
        const disX = event.clientX - currentX;
        const disY = event.clientY - currentY;

        target.style.left = `${left + disX}px`;
        target.style.top = `${top + disY}px`;

        return false;
      }

      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        header.style.cursor = '';
      };
    }
  },

  updated(el) {
    const target = el.parentNode!.parentNode!.parentNode!.parentNode as HTMLDivElement;
    target.style.left = '';
    target.style.top = '';
  },

  unmounted(el) {
    const header = el.parentNode!.parentNode as HTMLDivElement;
    header.onmousedown = null;
  }
}
export default vDrap