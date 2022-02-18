<template>
  <!-- <div> -->
  <div class="toolbar">
    <a-button style="margin-left: 10px" @click="preview">预览</a-button>
    <a-button @click="clearCanvas">清空画布</a-button>
    <a-button @click="save">保存</a-button>

     <div class="canvas-config">
        <span>画布大小</span>
        <a-input v-model:value="state.canvasStyleData.width" />
        <span>*</span>
        <a-input v-model:value="state.canvasStyleData.height" />
      </div>

      <!-- <div class="canvas-config">
        <span>画布比例</span>
        <input v-model="scale" @input="handleScaleChange" /> %
      </div> -->

    <Preview :value="isShowPreview" @change="handlePreviewChange" />
  </div>
  <!-- </div> -->
</template>

<script>
// import generateID from "@/utils/generateID";
// import toast from "@/utils/toast";
import { useStore } from "vuex";
import { ref, getCurrentInstance } from "vue";
import Preview from "@/components/Editor/Preview";
// import { commonStyle, commonAttr } from "@/custom-component/component-list";
// import eventBus from "@/utils/eventBus";
// import { deepCopy } from "@/utils/utils";

export default {
  components: {
    Preview,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const { commit,state } = useStore();
    const clearCanvas = () => {
      commit("deleteComponentAll");
    };
    let isShowPreview = ref(false);
    const preview = () => {
      isShowPreview.value = true;
    };

    const handlePreviewChange = () => {
      isShowPreview.value = false;
    };

    const save = () => {
      localStorage.setItem("canvasData", JSON.stringify(state.componentData));
      // localStorage.setItem("canvasStyle", JSON.stringify(this.canvasStyleData));
      proxy.$message.success("保存成功");
    };
    return {
      save,
      state,
      isShowPreview,
      handlePreviewChange,
      clearCanvas,
      preview,
    };
  },
};
</script>

<style scoped>
.toolbar {
  padding: 15px 10px;
  white-space: nowrap;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.canvas-config {
  display: inline-block;
  margin-left: 10px;
  font-size: 14px;
  color: #606266;
}

input {
  width: 50px;
  margin-left: 10px;
  outline: none;
  padding: 0 5px;
  border: 1px solid #ddd;
  color: #606266;
}

span {
  margin-left: 10px;
}

.insert {
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
  padding: 9px 15px;
  font-size: 12px;
  border-radius: 3px;
  margin-left: 10px;
}

.insert:active {
  color: #3a8ee6;
  border-color: #3a8ee6;
  outline: 0;
}

.insert:hover {
  background-color: #ecf5ff;
  color: #3a8ee6;
}
</style>
