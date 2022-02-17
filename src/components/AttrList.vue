<template>
  <div class="attr-list">
    <!-- {{ state }} -->
    <a-form>
      <a-form-item
        v-for="({ key, label }, index) in styleKeys"
        :key="index"
        :label="label"
      >
        <!-- {{ state.curComponent.style['left'] }} -->
        <a-input
          v-if="key === 'left'"
          v-model:value="state.curComponent.style[key]"
        />
        <a-input
          v-else-if="key == 'color'"
          v-model:value="state.curComponent.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'opacity'"
          v-model:value="state.curComponent.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'borderColor'"
          v-model:value="state.curComponent.style[key]"
        ></a-input>
        <a-input
          v-else-if="key == 'backgroundColor'"
          v-model:value="state.curComponent.style[key]"
        ></a-input>
        <a-select
          v-else-if="selectKey.includes(key)"
          v-model:value="state.curComponent.style[key]"
        >
          <template v-if="key == 'textAlign'">
            <a-select-option
              v-for="item in textAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
          <template v-else-if="key == 'borderStyle'">
            <a-select-option
              v-for="item in borderStyleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
          <template v-else>
            <a-select-option
              v-for="item in verticalAlignOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></a-select-option>
          </template>
        </a-select>
        <a-input
          v-else
          v-model:value.number="state.curComponent.style[key]"
          :type="key !== 'xAxis' ? 'number' : 'text'"
        />
      </a-form-item>
      <!-- <a-form-item
        v-if="
          state.curComponent && !excludes.includes(state.curComponent.component)
        "
        label="内容"
      >
        <a-input v-model:value="state.curComponent.propValue" type="textarea" />
      </a-form-item> -->
    </a-form>
  </div>
</template>

<script>
import attrNameData from "@/utils/attrNameData";
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const { state } = useStore();
    const styleKeys = computed(() => {
      if (state.curComponent) {
        console.log(state.curComponent.style);
        const curComponentStyleKeys = Object.keys(state.curComponent.style);

        let arr = attrNameData.filter((item) =>
          curComponentStyleKeys.includes(item.key)
        );
        console.log(arr);

        return arr;
      }
    });

    return {
      state,
      styleKeys,
      textAlignOptions: [
        {
          label: "左对齐",
          value: "left",
        },
        {
          label: "居中",
          value: "center",
        },
        {
          label: "右对齐",
          value: "right",
        },
      ],
      borderStyleOptions: [
        {
          label: "实线",
          value: "solid",
        },
        {
          label: "虚线",
          value: "dashed",
        },
      ],
      verticalAlignOptions: [
        {
          label: "上对齐",
          value: "top",
        },
        {
          label: "居中对齐",
          value: "middle",
        },
        {
          label: "下对齐",
          value: "bottom",
        },
      ],
      selectKey: ["textAlign", "borderStyle", "verticalAlign"],
      // attrNameData,
    };
  },
  // computed: {
  //   styleKeys() {
  //     if (this.$store.state.curComponent) {
  //       const curComponentStyleKeys = Object.keys(
  //         this.$store.state.curComponent.style
  //       );

  //       let arr = this.attrNameData.filter((item) =>
  //         curComponentStyleKeys.includes(item.key)
  //       );

  //       // console.log(arr)
  //       return [];
  //     }
  //   },
  // },
};
</script>

<style scoped>
.attr-list {
  overflow: auto;
  padding: 20px;
  padding-top: 0;
  height: 100%;
}
</style>
