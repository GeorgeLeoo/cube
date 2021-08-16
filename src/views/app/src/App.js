/*
 * @Author: 季晓东
 * @Date: 2021-08-10 19:38:32
 * @LastEditors: 季晓东
 * @LastEditTime: 2021-08-10 20:28:07
 * @Description:
 * @FilePath: /rollup-demo/src/App.js
 */
import Component from "./Component";

import Const from "./const/const";

import FileTemplate from "./FileTemplate";
import CodeTemplate from "./CodeTemplate";

export default Component({
  name: "App",
  components: {
    FileTemplate,
    CodeTemplate,
  },
  data() {
    return {
      menus: Const.MENUS,
      scopes: Const.SCOPES,
      menuSelectValue: "FILE_TEMPLATE",
      fileScopeSelectValue: "GLOBAL",
      codeScopeSelectValue: "GLOBAL",
    };
  },
	created() {
  },
  methods: {
    handlerMenuItemClick({ value }) {
      this.menuSelectValue = value;
    },
  },
  render() {
    const menu = (
      <ul class="menu">
        {this.menus.map((v) => {
          return (
            <li
              key={v.label}
              class={
                this.menuSelectValue === v.value
                  ? "menu-item menu-item-selected"
                  : "menu-item"
              }
              title={v.label}
              onClick={() => this.handlerMenuItemClick(v)}
            >
              {v.label}
            </li>
          );
        })}
      </ul>
    );

    return (
      <div class="row">
        <aside>{menu}</aside>
        <section class="container">
          {this.menuSelectValue === this.menus[0].value ? (
            <FileTemplate />
          ) : null}

          {this.menuSelectValue === this.menus[1].value ? (
            <CodeTemplate />
          ) : null}
        </section>
      </div>
    );
  },
});
