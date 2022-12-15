import store from '@/store'
export default {
  methods: {
    checkPermissions(str) {
      return store.getters.points.includes(str)
    }
  }
}
