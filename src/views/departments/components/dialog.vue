<template>
  <div>
    <el-dialog
      :title="formData.id ? '编辑' : '新增'"
      :visible="dialogVisible"
      :before-close="handleClose"
    >
      <!-- 表单组件  el-form   label-width设置label的宽度   -->
      <!-- 匿名插槽 -->
      <el-form
        label-width="120px"
        :model="formData"
        ref="formData"
        :rules="rules"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            style="width: 80%"
            placeholder="1-50个字符"
            v-model="formData.name"
          />
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            style="width: 80%"
            placeholder="1-50个字符"
            v-model="formData.code"
          />
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            style="width: 80%"
            placeholder="请选择"
            v-model="formData.manager"
            @focus="selectManger"
          >
            <el-option
              v-for="item in manager"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            v-model="formData.introduce"
            style="width: 80%"
            placeholder="1-300个字符"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
      <el-row slot="footer" type="flex" justify="center">
        <!-- 列被分为24 -->
        <el-col :span="6">
          <el-button type="primary" size="small" @click="addDepts"
            >确定</el-button
          >
          <el-button size="small" @click="handleClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getDepartments,
  getEmployeeSimple,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/deparments";
export default {
  name: "",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    const validateName = async (rule, value, callback) => {
      //  先获取最新的组织架构
      await this.getDepartmentsData();
      let isRepeat = false;
      let list = [];
      if (this.formData.id) {
        list = this.depts.filter(
          (item) => item.id !== this.data.id && item.pid === this.data.pid
        );
      } else {
        list = this.depts.filter((item) => item.pid === this.data.id);
      }
      isRepeat = list.find((item) => item.name === value);
      if (isRepeat) return callback(new Error("部门名称不能重复"));
      callback();
    };
    const validateCode = async (rule, value, callback) => {
      //  先获取最新的组织架构
      await this.getDepartmentsData();
      let isRepeat = false;
      if (this.formData.id) {
        const list = this.depts.filter((item) => item.id !== this.data.id);
        isRepeat = list.find((item) => item.code === value);
      } else {
        isRepeat = this.depts.find((item) => item.code === value);
      }
      if (isRepeat) return callback(new Error("部门编码不能重复"));
      callback();
    };
    return {
      depts: [],
      manager: [],
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "部门名称应在1-20个字符",
            trigger: "blur",
          },
          { validator: validateName, trigger: "blur" },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "部门编码应在1-20个字符",
            trigger: "blur",
          },
          { validator: validateCode, trigger: "blur" },
        ],
        manager: [
          { required: true, message: "部门负责人不能为空", trigger: "blur" },
        ],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍应在1-300个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //  定义获取组织架构数据的方法
    async getDepartmentsData() {
      const { data } = await getDepartments();
      this.depts = data.depts;
    },
    handleClose(done) {
      this.$confirm("确认关闭?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.clearForm();
        })
        .catch((_) => {});
    },
    async selectManger() {
      //  在select的focus中保证获取最新数据，而不是页面已加载就获取
      const { data } = await getEmployeeSimple();
      this.manager = data;
    },
    //  清除表单操作
    clearForm() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs.formData.resetFields();
      this.$emit("addDepts");
      this.$emit("close");
    },
    // 点击确定按钮
    async addDepts() {
      if (this.formData.id) {
        //  编辑部门功能
        await this.$refs.formData.validate();
        await updateDepartments(this.formData);
        this.$message.success("编辑成功");
        this.clearForm();
      } else {
        //  新增部门功能
        await this.$refs.formData.validate();
        await addDepartments({ ...this.formData, pid: this.data.id });
        this.$message.success("新增成功");
        this.clearForm();
      }
    },
    //  定义根据id获取部门详情的方法
    async getDeptsDetail(id) {
      const { data } = await getDepartDetail(id);
      this.formData = data;
    },
  },
};
</script>
<style scoped lang ='less'>
</style>