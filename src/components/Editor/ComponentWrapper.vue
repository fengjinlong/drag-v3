<template>
  <div @click="handleClick">
    <component
      :is="config.component"
      class="component"
      :style="getStyle(config.style)"
      :prop-value="config.propValue"
      :element="config"
    />
  </div>
</template>

<script>
import { getStyle } from "@/utils/style";
// import runAnimation from "@/utils/runAnimation";

export default {
  props: {
    config: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  setup(props) {
    const config = props.config;

    return {
      config,
      getStyle,
      handleClick() {},
    };
  },


};
</script>

<style scoped>
.component {
  position: absolute;
}
</style>
