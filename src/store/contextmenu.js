export default {
  state: {
    menuTop: 0,
    menuLeft: 0,
    menuShow: false,
  },
  mutations: {
    showContextMenu(state, {top, left}) {
      state.menuShow = true
      state.left = left
      state.top = top
    },
    hideContextMenu(state) {
      state.menuShow = false
    }
  },
}