import { createStore } from "vuex";

export default createStore({
  state: {
    componentData: [],
    curComponent: null,
    curComponentIndex: 0,
    editor: null,
  },

  mutations: {
    addItem(state, payload) {
      state.componentData.push(payload);
    },
    // 编辑器
    saveEditor(state, payload) {
      // console.log('payload')
      // console.log(payload)
      state.editor = payload;
    },
    setShapeStyle({curComponent, componentData, curComponentIndex}, { top, left, width, height, rotate }) {
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
      state.curComponent = payload.component;
      state.curComponentIndex = payload.index;
    },
  },
  actions: {},
  modules: {},
});
