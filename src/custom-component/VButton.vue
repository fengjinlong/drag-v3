<template>
  <!-- tabindex >= 0 使得双击时聚集该元素 -->
  <!-- <a-button>btn</a-button>  -->
  <button class="v-button">{{ propValue }}</button>

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
import { ref, computed } from "vue";
export default {
  props: {
    propValue: {
      type: String,
      default: "",
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const style = props.element.style;
    const propValue = computed(() => {
      return props.propValue;
    });
    // effect(() => {
    //   propValue.value = props.propValue;
    // })
    return {
      style,
      propValue,
      canEdit: true,
    };
  },
};
</script>
<style>
.v-button {
  display: inline-block;
  line-height: 1;
  border: none;

  white-space: nowrap;
  cursor: pointer;
  background: transparent;

  /* color: #606266; */
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
