<template>
  <el-dialog :title="roleForm.id?'编辑弹层':'新增弹层'" :visible="showDialog" @close="btnCancel">
    <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleForm.name" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleForm.description" />
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { updateRole, getRoleDetail, addRole } from '@/api/setting'
export default {
  name: '',
  components: {},
  props: {
    obj: {
      type: Object,
      required: true
    },
    showDialog: {
      type: Boolean,
      required: true
    },
    roleList: {
      type: Array,
      required: true
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      const isRepeat = this.roleList.find(item => item.name === value)
      if (isRepeat) return callback(new Error('名称已存在'))
      callback()
    }
    return {
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }, { validator: validateName, trigger: 'blur' }],
        description: [{ required: true, message: '描述不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {},
  methods: {
    //  关闭按钮
    btnCancel() {
      this.$confirm('确定关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('close')
        this.$refs.roleForm.resetFields()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    //  确定按钮
    async btnOK() {
      if (this.roleForm.id) { //  编辑
        await this.$refs.roleForm.validate()
        await updateRole({ ...this.roleForm, ...this.obj })
        this.$message.success('编辑成功')
        this.$emit('close')
        this.$refs.roleForm.resetFields()
      } else { //  新增
        await addRole(this.roleForm)
        this.$message.success('新增成功')
        this.$emit('close')
        this.$refs.roleForm.resetFields()
      }
    },
    //  定义获取角色详情的方法
    async getRoleInfo(id) {
      const { data } = await getRoleDetail(id)
      this.roleForm = data
    }
  }}

</script>
<style scoped lang ='less'>
</style>
