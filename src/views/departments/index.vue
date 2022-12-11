<template>
  <div>
    <el-card class="tree-card">
      <!-- 组件放置区域 -->
      <TreeTools :data="company" :is-show="false" />
      <!-- 树形组件 -->
      <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
        <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
        <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据   data 每个节点的数据对象-->
        <!-- 组件放置区域 -->
        <TreeTools
          slot-scope="{ data }"
          :data="data"
          :is-show="true"
          @deldepts="deldepts"
          @addDepts="getDepartmentsData()"
        />
      </el-tree>
    </el-card>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/deparments'
import { tranListToTreeData } from '@/utils'
export default {
  name: '',
  components: { TreeTools },
  props: {},
  data() {
    return {
      company: { name: '', manager: '负责人' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getDepartmentsData()
  },
  mounted() {},
  methods: {
    //  获取组织架构数据
    async getDepartmentsData() {
      const { data } = await getDepartments()
      // console.log(res);
      this.departs = tranListToTreeData(data.depts, '')
      this.company.name = data.companyName
    },
    // 删除部门功能
    deldepts(val) {
      const index = this.departs.findIndex(item => item.id === val)
      this.departs.splice(index, 1)
      this.getDepartmentsData() // 重新获取部门以更新视图
    }
  }
}
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
