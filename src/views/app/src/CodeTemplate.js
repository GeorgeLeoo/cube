import Component from "./Component";

import Const from "./const/const";

import Selection from "./Selection";

export default Component({
  name: "CodeTemplate",
  components: {
    Selection,
  },
  data() {
    return {
      scopes: Const.SCOPES,
      fileScopeSelectValue: "GLOBAL",
      scopes: Const.SCOPES,
      fileScopeSelectValue: "GLOBAL",
      codeTemplates: [
        {
          title: "Vue",
          path: "",
          checked: true,
          fold: false,
          haveCheckedInChildren: false,
          children: [
            {
              checked: true,
              prefix: "push",
              body: ["this.\\$router.push({ name: '${1:example}' })"],
              description: "router.push",
            },
            {
              checked: true,
              prefix: "push_params",
              body: [
                "this.\\$router.push({ name: '${1:example}', params: {} })",
              ],
              description: "router.push 带参数",
            },
          ],
        },
        {
          title: "JavaScript",
          path: "",
          checked: true,
          fold: true,
          haveCheckedInChildren: false,
          children: [
            {
              checked: true,
              prefix: "push",
              body: ["this.\\$router.push({ name: '${1:example}' })"],
              description: "router.push",
            },
            {
              checked: false,
              prefix: "push_params",
              body: [
                "this.\\$router.push({ name: '${1:example}', params: {} })",
              ],
              description: "router.push 带参数",
            },
          ],
        },
      ],
      codeTemplatePositions: {
        parent: "",
        child: "",
      },
    };
  },
  methods: {
    handlerSelectionChange(val) {
      this.fileScopeSelectValue = val;
    },
    handlerCodeItemClick(item, child = {}) {
      item.children.forEach((v) => {
        this.$set(v, "checked", item.checked);
      });
      this.$set(item, "haveCheckedInChildren", false);
    },
    handlerFold(item) {
      this.$set(item, "fold", !item.fold);
    },
    handlerChildCodeItemChange(item) {
      if (item.children.every((v) => v.checked)) {
        this.$set(item, "haveCheckedInChildren", false);
        this.$set(item, "checked", true);
      } else if (item.children.every((v) => !v.checked)) {
        this.$set(item, "haveCheckedInChildren", false);
        this.$set(item, "checked", false);
      } else {
        this.$set(item, "haveCheckedInChildren", true);
      }
    },
    handlerCodeItemChange(item) {
      item.children.forEach((v) => {
        this.$set(v, "checked", item.checked);
      });
      this.$set(item, "haveCheckedInChildren", false);
    },
    setSelectFileTemplateData(item = {}) {
      this.fileItemValue = item.title || "";
      this.fileItem = item || {};
    },
    getFileTemplate(data) {
      this.fileList = data;
      this.setSelectFileTemplateData(data[0]);
    },
    addFileTemplateByName(name) {
      const findItem = this.fileList.find((v) => v.title === name);

      if (findItem) {
        this.showErrorMessage("文件名称已存在");
        return;
      }

      const currentData = {
        title: name,
        description: "",
        body: [],
        code: "",
      };

      this.fileList.push(currentData);

      this.setSelectFileTemplateData(currentData);
    },
    listenerMessage() {
      window.addEventListener("message", (event) => {
        const { command, data } = event.data; // The JSON data our extension sent
        switch (command) {
          case "FILE_TEMPLATE":
            this.getFileTemplate(data);
            break;
          case "SET_FILE_TEMPLATE_NAME":
            this.addFileTemplateByName(data);
            break;
          case "SET_FILE_TEMPLATE_DATA":
            this.getFileTemplate(data);
            break;
          case "SET_CODE_TEMPLATE_DATA":
            this.getFileTemplate(data);
            break;
        }
      });
    },
  },
  created() {
  },
  render() {
    const subTree = (item) => {
      return (
        <ul class="sub-tree">
          {item.children.map((child) => {
            return (
              <li
                key={child.prefix}
                class={
                  item.title === this.codeTemplatePositions.parent &&
                  child.prefix === this.codeTemplatePositions.child
                    ? "sub-tree-item p-l-40 file-item-select"
                    : "sub-tree-item p-l-40"
                }
              >
                <input
                  type="checkbox"
                  value={child.checked}
                  onChange={() => this.handlerChildCodeItemChange.bind(item)}
                />
                <span class="tree-text">{child.prefix}</span>
              </li>
            );
          })}
        </ul>
      );
    };

    const mainTree = (
      <ul class="main-tree flex1">
        {this.codeTemplates.map((item) => {
          return (
            <li key={item.title}>
              <p class="row" onClick={this.handlerCodeItemClick.bind(item)}>
                <span class="fold-icon" onClick={this.handlerFold.bind(item)}>
                  <i class="iconfont icon-right vertical-middle"></i>
                </span>
                <input
                  type="checkbox"
                  onChange={() => this.handlerCodeItemChange.bind(item)}
                />
                <span class="m-l-10"> {item.title}</span>
              </p>
              {item.fold ? subTree(item) : null}
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
        <div class="row">
          {mainTree}
          <div class="main-tree-operation column">
            <span class="file-head-icon iconfont icon-add_1"></span>
            <span class="file-head-icon iconfont icon-jianhao"></span>
            <span class="file-head-icon iconfont icon-copy"></span>
            <span class="file-head-icon iconfont icon-chexiao"></span>
          </div>
        </div>
        <div class="code-template-edit-container">
          <div class="code-template-edit-header row">
            <label class="code-template-edit-label" for="abbreviation">
              缩写：
            </label>
            <input
              id="abbreviation"
              class="code-template-edit-input"
              type="text"
            />
            <label class="code-template-edit-label m-l-10" for="description">
              描述：
            </label>
            <input
              id="description"
              class="code-template-edit-input code-template-edit-desc-input"
              type="text"
            />
          </div>
          <div class="code-template-edit-body">
            <textarea class="textarea"></textarea>
          </div>
        </div>
      </div>
    );
  },
});
