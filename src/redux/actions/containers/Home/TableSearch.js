/* 
	该文件专门为Count组件生成action对象
*/
import {SEARCH_PARAMETER} from '../../../constant'

//同步action，就是指action的值为Object类型的一般对象
export const search_parameter = data => ({type:SEARCH_PARAMETER, data})