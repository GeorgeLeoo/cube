/*
 * @Author: 季晓东
 * @Date: 2021-08-10 20:06:33
 * @LastEditors: 季晓东
 * @LastEditTime: 2021-08-10 20:30:49
 * @Description:
 * @FilePath: /rollup-demo/src/Component.js
 */

export default (options) => {
	if(!options.name) {
		console.error('name can not be null');
		return;
	}
  return Vue.component(options.name, options);
};
