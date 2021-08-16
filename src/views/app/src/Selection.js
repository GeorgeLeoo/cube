import Component from "./Component";

export default Component({
  name: "Selection",
  model: {
    prop: "value",
    // 随便命名事件，对应下面$emit即可
    event: "change", 
  },
  props: {
    options: {
      type: Array,
      default: () => {
        return [];
      },
    },
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    inputValue: {
      set(val) {
        this.$emit("change", val);
      },
      get() {
        this.value;
      },
    },
  },
  mounted() {},
  methods: {
    handlerSelectChange(e) {
      this.inputValue = e.target.value;
    },
  },
  render() {
    return (
      <select onChange={this.handlerSelectChange}>
        {this.options.map((v) => {
          return (
            <option key={v.label} value={v.value}>
              {v.label}
            </option>
          );
        })}
      </select>
    );
  },
});
