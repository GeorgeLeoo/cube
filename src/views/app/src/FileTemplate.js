import Component from "./Component";

import Const from "./const/const";

import Selection from "./Selection";

export default Component({
  name: "FileTemplate",
  components: {
    Selection,
  },
  data() {
    return {
      scopes: Const.SCOPES,
      fileScopeSelectValue: "GLOBAL",
      fileList: [],
      fileItem: {
        description: "",
        code: "",
      },
      fileItemValue: ''
    };
  },
  created() {
    this.listenerMessage();
  },
  methods: {
    listenerMessage() {
      window.addEventListener("message", (event) => {
        const { command, data } = event.data;
        switch (command) {
          case "FILE_TEMPLATE":
            this.getFileTemplate(data);
            break;
        }
      });
    },
    setSelectFileTemplateData(item = {}) {
      this.fileItemValue = item.title || "";
      this.fileItem = item || {};
    },
    getFileTemplate(data) {
      this.fileList = data;
      this.setSelectFileTemplateData(data[0]);
    },
    handlerSelectionChange(val) {
      this.fileScopeSelectValue = val;
    },
    handlerFileTemplateIconClick(type) {},
  },
  render() {
    const fileList = (
      <ul class="file">
        <li class="file-head row">
          <span
            class="file-head-icon iconfont icon-add_1"
            onClick={() => this.handlerFileTemplateIconClick.bind("ADD")}
          ></span>
          <span
            class={
              !this.fileItemValue
                ? "file-head-icon iconfont icon-jianhao file-head-icon-disable"
                : "file-head-icon iconfont icon-jianhao"
            }
            onClick={() => this.handlerFileTemplateIconClick.bind("DEL")}
          ></span>
          <span
            class={
              !this.fileItemValue
                ? "file-head-icon iconfont icon-copy file-head-icon-disable"
                : "file-head-icon iconfont icon-copy"
            }
            onClick={() => this.handlerFileTemplateIconClick.bind("COPY")}
          ></span>
        </li>
        {this.fileList.map((v) => {
          return (
            <li
              key={v.title}
              title={v.title}
              class={
                v.title === this.fileItemValue
                  ? "file-item file-item-select"
                  : "file-item"
              }
            >
              {v.title}
            </li>
          );
        })}
      </ul>
    );
    return (
      <div>
        <div class="scope-wrapper">
          <span>作用范围：</span>
          <Selection
            options={this.scopes}
            value={this.fileScopeSelectValue}
            onChange={this.handlerSelectionChange}
          />
        </div>
        <div class="template row">
          {fileList}
          <div class="template-container">
            <p>代码：</p>
            <div class="template-container-code editor_control">
              <textarea class="textarea"></textarea>
            </div>
            <p class="m-t-10">描述：</p>
            <div class="template-container-description">
              <textarea class="textarea file-description"></textarea>
            </div>
          </div>
        </div>
        <div class="footer">
          <span class="save-button">保存</span>
        </div>
      </div>
    );
  },
});
