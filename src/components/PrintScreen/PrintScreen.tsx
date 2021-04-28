/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-04-23 14:59:18
 * @Description: 
 */
import { computed, defineComponent, h, reactive, ref, Teleport } from "vue";
import { PropTypes } from "@/utils/proptypes";
import style from "./PrintScreen.module.less";
const props = {
  src: PropTypes.string(""),
  hotKey: PropTypes.string("alt+a")
}
export default defineComponent({
  props,
  setup(props,{emit}) {
    const data = reactive({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      startCropper: false
    })
    const img = ref<HTMLImageElement>()
    function handleMousedown(e: MouseEvent) {
      data.startCropper = true
      data.x1 = e.x
      data.y1 = e.y
      data.x2 = e.x
      data.y2 = e.y
    }
    function handleMousemove(e: MouseEvent) {
      if (data.startCropper) {
        data.x2 = e.x
        data.y2 = e.y
      }
    }
    function copyImg(content: string) {
      let tempImput = document.createElement('input')
      tempImput.value = content
      tempImput.select()
      document.execCommand('copy')
    }
    async function handleMouseup(e: MouseEvent) {
      data.x2 = e.x
      data.y2 = e.y
      data.startCropper = false
      const image = img.value!
      let tempCanvas = document.createElement('canvas')
      tempCanvas.width = image.width
      tempCanvas.height = image.height
      let context = tempCanvas.getContext("2d")!
      context.drawImage(img.value!, 0, 0, image.width, image.height)
      let cutData = context.getImageData(x.value, y.value, width.value, height.value)
      tempCanvas.width = width.value
      tempCanvas.height = height.value
      context.putImageData(cutData, 0, 0)
      let baseData = tempCanvas.toDataURL()
      try {
        const clipboardObj = navigator.clipboard


        let baseBlob = atob(baseData.split(',')[1])
        let ia = new Uint8Array(baseBlob.length)
        for (let i = 0; i < baseBlob.length; i++) {
          ia[i] = baseBlob.charCodeAt(i)
        }
        await clipboardObj.write([new ClipboardItem({
          'image/png': new Blob([ia],{type:'image/png'})
        })])
      } catch (e) {
        copyImg(baseData)
      }
      emit('finish',true)
    }
    const x = computed(() => {
      return Math.min(data.x1, data.x2)
    })
    const y = computed(() => {
      return Math.min(data.y1, data.y2)
    })
    const width = computed(() => {
      return Math.abs(data.x1 - data.x2)
    })
    const height = computed(() => {
      return Math.abs(data.y1 - data.y2)
    })
    return () => h(
      <Teleport to="body">
        {
          props.src ? <div
            class={style['cropper-main']}
            onMousedown={handleMousedown}
            onMousemove={handleMousemove}
            onMouseup={handleMouseup}
          >
            <img src={props.src} alt="" ref={img} />
            <div class={style['cropper-mask']}></div>
            {
              data.startCropper ? <div class={style['cropper-window']} style={`left:${x.value}px;top:${y.value}px;width:${width.value}px;height:${height.value}px`}>
                <img src={props.src} alt="" style={`transform:translate3d(${-x.value}px,${-y.value}px,0)`} />
              </div> : null
            }
          </div> : null
        }
      </Teleport>
    )
  },
  emits:{
    finish(isFinish:boolean){
      return isFinish
    }
  }
})
