<template>
  <el-row
    type="flex"
    justify="space-between"
    align="middle"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <!-- 名称应该变成 对应的节点中的name -->
      <span>{{ data.name }}</span>
    </el-col>
    <el-col :span="8">
      <el-row type="flex" justify="end">
        <el-col :span="16">{{ data.manager }}</el-col>
        <el-col>
          <!-- 放置下拉菜单 -->
          <el-dropdown @command="handleDepts">
            <!-- 内容 -->
            <span
              >操作
              <i class="el-icon-arrow-down" />
            </span>
            <!-- 具名插槽 -->
            <el-dropdown-menu slot="dropdown">
              <!-- 下拉选项 -->
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <template v-if="isShow">
                <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                <el-dropdown-item command="del">删除部门</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <!-- 右侧内容 -->
    </el-col>
    <!-- 弹出层组件 -->
    <Dialog
      ref="dialogs"
      :dialogVisible="isDialogShow"
      @close="isDialogShow = false"
      :data="data"
      @addDepts="$emit('addDepts')"
    />
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/deparments";
import Dialog from "./dialog.vue";
export default {
  name: "",
  components: { Dialog },
  props: {
    data: {
      type: Object,
      required: true,
    },
    isShow: Boolean,
  },
  data() {
    return {
      isDialogShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleDepts(val) {
      //删除部门功能
      if (val === "del") {
        this.$confirm("确定要删除此部门吗？").then(async () => {
          await delDepartments(this.data.id);
          this.$emit("deldepts", this.data.id);
          this.$message.success("删除成功");
        });
      }
      //  新增部门
      if (val === "add") {
        this.isDialogShow = true;
      } else {
        //  编辑部门
        this.isDialogShow = true;
        //  通过调用子组件的方法改写子组件里的formData数据，然后以formData里是否有id来区分是编辑还是新增！
        this.$refs.dialogs.getDeptsDetail(this.data.id);
      }
    },
  },
};
</script>
<style scoped lang ='less'>
</style>