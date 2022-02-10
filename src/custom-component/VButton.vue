<template>
  <div class="v-button">
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
  <!-- <a-button>btn</a-button>  -->
  <button>btn</button> 
  </div>

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
import {toRefs} from "vue"
export default {
  props: {
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    const style = props.element.style
    // console.log(toRefs(style).top.value)
    return {
      style,
      canEdit: true,
    };
  },
};
</script>
