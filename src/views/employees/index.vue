<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning">导入</el-button>
          <el-button size="small" type="danger">导出</el-button>
          <el-button size="small" type="primary" @click="add">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeesList">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="">
            <template slot-scope="{row}">{{ row.formOfEmployment===1?'正式':'非正式' }}</template>
          </el-table-column>
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable=""><template slot-scope="{row}">{{ row.timeOfEntry|formatDate }}</template></el-table-column>
          <el-table-column label="账户状态" sortable=""><template slot-scope="{ row }">
            <!-- 根据当前状态来确定 是否打开开关 -->
            <el-switch :value="row.enableState === 1" />
          </template></el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{row}">
              <el-button type="text" size="small">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assign(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
          </el-table-column></el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="size"
            :page-sizes="pageSizes"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-row>
      </el-card>
    </div>
    <!-- 新增弹层组件 -->
    <AddEmployees v-if="showDialog" :show-dialog="showDialog" />
    <!-- 给员工分配角色弹层 -->
    <AssignRole ref="AssignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>
import { getEmployeeList } from '@/api/employees'
import { delEmployee } from '@/api/employees'
import AddEmployees from './components/add-employee.vue'
import AssignRole from './components/assign-role.vue'
export default {
  name: '',
  components: { AddEmployees, AssignRole },
  props: {},
  data() {
    return {
      employeesList: [],
      page: 1,
      size: 10,
      total: 0,
      pageSizes: [10, 20, 30],
      showDialog: false,
      userId: null,
      showRoleDialog: false
    }
  },
  computed: {},
  watch: {},
  created() {
    //  获取员工列表数据
    this.getEmployeeLists()
  },
  mounted() {

  },
  methods: {
    //  定义获取员工列表数据的方法
    async getEmployeeLists() {
      const { data } = await getEmployeeList({ page: this.page, size: this.size })
      // console.log(data)
      this.employeesList = data.rows
      this.total = data.total
    },
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.page = val
      this.getEmployeeLists()
    },
    //  删除员工
    del(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delEmployee(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getEmployeeLists()
      })
    },
    //  新增员工按钮
    add() {
      this.showDialog = true
    },
    //  点击分配角色
    async assign(id) {
      this.userId = id
      this.$refs.AssignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>
<style scoped lang ='less'>
</style>
