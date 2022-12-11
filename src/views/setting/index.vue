<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="add"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="序号" width="120" type="index" align="center" />
              <el-table-column label="角色名称" width="240" prop="name" align="center" />
              <el-table-column label="描述" prop="description" align="center" />
              <el-table-column label="操作" align="center">
                <template slot-scope="{row}">
                  <el-button size="small" type="success">分配权限</el-button>
                  <el-button size="small" type="primary" @click="edit(row)">编辑</el-button>
                  <el-button size="small" type="danger" @click="del(row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination layout="sizes,prev,pager,next" :total="totalPage" :page-sizes="pagesizes" :page-size="pagesize" :current-page="page" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
    </div>
    <!-- 弹层组件 -->
    <Dialog v-if="isDialogShow" ref="dialog" :obj="obj" :show-dialog="isDialogShow" :role-list="roleList" @close="close" />
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, deleteRole } from '@/api/setting'
import Dialog from './components/dialog.vue'
export default {
  name: '',
  components: { Dialog },
  props: {},
  data() {
    return {
      roleList: [],
      page: 1,
      pagesizes: [5, 10, 20],
      pagesize: 5,
      totalPage: 0,
      companyInfo: {},
      isDialogShow: false,
      obj: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    //  获取角色列表数据
    this.getRoleLists()
    //  获取公司基本信息
    this.getCompanyInfos()
  },
  mounted() {},
  methods: {
    //  定义获取角色列表数据的方法
    async getRoleLists() {
      const { data } = await getRoleList({ page: this.page, pagesize: this.pagesize })
      // console.log(data)
      this.totalPage = data.total
      this.roleList = data.rows
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoleLists()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoleLists()
    },
    //  定义获取公司信息的方法
    async getCompanyInfos() {
      const { data } = await getCompanyInfo(this.$store.getters.userInfo.companyId)
      // console.log(data)
      this.companyInfo = data
    },
    //  删除按钮功能
    del(val) {
      // console.log(val)
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await deleteRole(val.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRoleLists()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //  编辑按钮功能
    async edit(val) {
      this.isDialogShow = true
      await this.$nextTick()
      this.$refs.dialog.getRoleInfo(val.id)
    },
    //  新增按钮功能
    add() {
      this.isDialogShow = true
    },
    //  关闭按钮
    close() {
      this.isDialogShow = false
      this.getRoleLists()
    }
  }
}
</script>
<style scoped lang ='less'>
</style>
