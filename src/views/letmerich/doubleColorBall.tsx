/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-05-10 15:37:23
 * @Description: 
 */
import { defineComponent, onMounted, reactive } from "vue";
import style from "./doubleColorBall.module.less";
export default defineComponent({
  setup() {
    function GetRedNumber(numbers: number = 6) {
      let redNumbers = []
      let result = []
      for (let i = 1; i <= 33; i++) {
        redNumbers.push(`${i < 10 ? '0' : ''}${i}`)
      }
      let count = redNumbers.length
      for (var i = 0; i < numbers; i++) {
        let index = ~~(Math.random() * count) + i;
        result[i] = redNumbers[index];
        redNumbers[index] = redNumbers[i];
        count--;
      }
      result.sort()
      return result
    }
    function GetBlueNumber(numbers: number = 1) {
      let blueNumbers = []
      let result = []
      for (let i = 1; i <= 16; i++) {
        blueNumbers.push(`${i < 10 ? '0' : ''}${i}`)
      }
      let count = blueNumbers.length
      for (var i = 0; i < numbers; i++) {
        let index = ~~(Math.random() * count) + i;
        result[i] = blueNumbers[index];
        blueNumbers[index] = blueNumbers[i];
        count--;
      }
      result.sort()
      return result
    }
    const data = reactive({
      redNumbers: [] as string[],
      blueNumbers: [] as string[]
    })
    onMounted(() => {
      refresh()
    })
    function refresh(){
      data.blueNumbers=GetBlueNumber()
      data.redNumbers=GetRedNumber()
    }
    return () => <div class={style['main']}>
      <div class={style['bar']}>
        {
          data.redNumbers.map(item=>{
            return <div class={`${style['item']} ${style['red']}`}>{item}</div>
          })
        }
        {
          data.blueNumbers.map(item=>{
            return <div class={`${style['item']} ${style['blue']}`}>{item}</div>
          })
        }
      </div>
      <button class={style['button']} onClick={refresh}>
        随机
      </button>
    </div>
  }
})