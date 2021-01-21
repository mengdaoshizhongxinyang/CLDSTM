/*
 * @Author: mengdaoshizhongxinyang
 * @Date: 2021-01-21 09:38:42
 * @Description: 
 * @GitHub: https://github.com/mengdaoshizhongxinyang
 */
interface typeMenu {
  label?: string,
  name?: string,
  children?: Array<typeMenu>,
  show?: Boolean,
  function?: Function
}