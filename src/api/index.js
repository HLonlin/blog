/**
 * api.js
 * 接口地址
 * @author fenghailin <1021944439@qq.com>
 */
import { getData } from '@/utils/js/request'
export const test = data => getData('/api/user/test', 'post', data)