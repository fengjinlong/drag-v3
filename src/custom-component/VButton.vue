<template>
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <!-- <a-button>btn</a-button>  -->
    <button class="v-button">btn</button>

  <!-- @keydown="handleKeydown"
    @keyup="handleKeyup" -->

  <!-- ref="text"
      :style="{ verticalAlign: element.style.verticalAlign }"
            :class="{ canEdit }"
            :style="{ verticalAlign: element.style.verticalAlign }"
            @dblclick="setEdit"
            @paste="clearStyle"
            @mousedown="handleMousedown"
            @blur="handleBlur"
            @input="handleInput" -->
</template>

<script>
import { toRefs } from "vue";
export default {
  props: {
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const style = props.element.style;
    // console.log(toRefs(style).top.value)
    return {
      style,
      canEdit: true,
    };
  },
};
</script>
<style>
.v-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
.v-button:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}
.v-button:hover {
  background-color: #ecf5ff;
  color: #3a8ee6;
}
</style>
