import { createStore } from 'vuex'

export default createStore({
  state: {
    componentData: [],
    editor: null
  },

  mutations: {
    addItem(state,payload) {
      state.componentData.push(payload)
    },
    // 编辑器
    saveEditor(state, payload) {
      // console.log('payload')
      // console.log(payload)
      state.editor = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
