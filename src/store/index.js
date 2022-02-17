import { createStore } from "vuex";
import contextmenu from "./contextmenu.js";
import { message } from "ant-design-vue";

export default createStore({
  state: {
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
      // console.log('payload')
      // console.log(payload)
      state.editor = payload;
    },
    setShapeStyle(
      { curComponent, componentData, curComponentIndex },
      { top, left, width, height, rotate }
    ) {
      // state.componentData[1].style.top = style.top
      // componentData[curComponentIndex].style.width = width;
      // console.log(curComponent.style.width)
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
      if (rotate) curComponent.style.rotate = rotate;
    },
    setCurComponent(state, payload) {
      console.log(payload)
      state.curComponent = payload.component;
      state.curComponentIndex = payload.index;
    },

    deleteComponent(state, index) {
      if (index === undefined) {
        index = state.curComponentIndex;
      }

      if (index == state.curComponentIndex) {
        state.curComponentIndex = null;
        state.curComponent = null;
      }

      console.log(index);

      state.componentData.splice(index, 1);
    },
    // 层级到顶
    topComponent({ componentData, curComponentIndex, curComponent }) {
      if (curComponentIndex < componentData.length - 1) {
        componentData.splice(curComponentIndex, 1);
        componentData.push(curComponent);
        console.log(componentData);
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
