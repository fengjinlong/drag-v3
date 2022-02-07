// import Vue from "vue";
// const components = ["VText"];
// components.forEach(key => {
//   Vue.component(key, () => import(`@/custom-component/${key}`))
// })
import VText from './VText'
const components = {
  VText
}
const GlobalComponents = (app) => {
  Object.keys(components).forEach(key => {
    app.component(`${key}`, components[key])
  })
}
export default GlobalComponents
