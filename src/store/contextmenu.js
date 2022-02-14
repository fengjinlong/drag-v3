export default {
  state: {
    menuTop: 150,
    menuLeft: 300,
    menuShow: false,
  },
  mutations: {
    showContextMenu(state, { top, left }) {
      // console.log(top)
      state.menuShow = true;
      state.menuTop = top;
      state.menuLeft = left;
    },
    hideContextMenu(state) {
      console.log(state);
      state.menuShow = false;
    },
  },
};
