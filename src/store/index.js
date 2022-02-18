import { createStore } from "vuex";
import contextmenu from "./contextmenu.js";
import { message } from "ant-design-vue";

export default createStore({
  state: {
    // 画布尺寸
    canvasStyleData: {
      width: 1200,
      height: 740
    },
    // 右键菜单
    ...contextmenu.state,
    componentData: [],
    curComponent: null,
    curComponentIndex: null,
    editor: null,
  },

  mutations: {
    ...contextmenu.mutations,
    addItem(state, payload) {
      state.componentData.push(payload);
    },
    // 编辑器
    saveEditor(state, payload) {
      state.editor = payload;
    },
    setShapeStyle(
      { curComponent, componentData, curComponentIndex },
      { top, left, width, height, rotate }
    ) {
      // state.componentData[1].style.top = style.top
      // componentData[curComponentIndex].style.width = width;
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
      if (rotate) curComponent.style.rotate = rotate;
    },
    setCurComponent(state, payload) {
      state.curComponent = payload.component;
      state.curComponentIndex = payload.index;
    },
    // 删除所有
    deleteComponentAll(state) {
      if (state.componentData === []) return;
      while (state.componentData.length > 0) {
        state.componentData.splice(0, 1);
      }
      state.curComponent = null;
      state.curComponentIndex = null;
    },
    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }


      state.componentData.splice(index, 1);
    },
    // 层级到顶
    topComponent({ componentData, curComponentIndex, curComponent }) {
      if (curComponentIndex < componentData.length - 1) {
        componentData.splice(curComponentIndex, 1);
        componentData.push(curComponent);
      } else {
        message.warn("已经到顶了");
      }
    },

    bottomComponent({ componentData, curComponentIndex, curComponent }) {
      // 置底
      if (curComponentIndex > 0) {
        componentData.splice(curComponentIndex, 1);
        componentData.unshift(curComponent);
      } else {
        message.warn("已经到底了");
      }
    },
  },
  actions: {},
  modules: {},
});
