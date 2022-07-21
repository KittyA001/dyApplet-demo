// d:\items\抖音测试\components\text\text.js
Component({
  data: {
    // list: [],
    // pageNo: 1,
    // size: 10,
    // total: '',
    // loading: false,
    // finish: false
  },
  properties: {
    list: {
      type: Array,
      default: ()=>[]
    },
    pageNo: {
      type: [Number,String],
      default: 1
    },
    size: {
      type: [Number,String],
      default: 1
    },
    total: {
      type: [Number,String],
      default: 1
    },
    loading: {
      type: Boolean,
      default: false
    },
    finish: {
      type: Boolean,
      default: false
    }

  },
  methods: {
    onScroll() {
      
    }
  }
})