<template>
  <div class="v-text">
    <!-- tabindex >= 0 使得双击时聚集该元素 -->
    <div
      ref="text"
      :style="element.style"
      :tabindex="element.id"
      :contenteditable="canEdit"
      v-html="element.propValue"
    >
    </div>
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
export default {
  props: {
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup(props) {
    console.log(props.element);
    return {
      canEdit: true,
    };
  },
};
</script>
