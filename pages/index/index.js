var app = getApp()
Page({
  data: {
    userInfo: {},
    scrollheight:0,
    addflag: true,  //判断是否显示搜索框右侧部分
    addimg: '../../images/activity_add.png',
    searchstr: '',
  },
  data: {
    flag: 0,
    currentTab: 0,
  },
  

  onLoad: function (options) {
    let searchShow = JSON.parse(options.data);
    let that = this
    that.setData({
      searchShow: searchShow
    })
    console.log(searchShow)
  },

  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    }
    else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },

  onLoad: function () {
    console.log('onLoad test');
    let that = this;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight
        });
      }
    })
    console.log(this.data.scrollheight)
  },
  // 搜索框右侧 事件
  addhandle() {
    console.log('触发搜索框右侧事件');
  },

  //搜索框输入时触发
  searchList(ev) {
    let e = ev.detail;
    this.setData({
      searchstr: e.detail.value
    })
  },
  //搜索回调
  endsearchList(e) {
    console.log('查询数据')
  },
  // 取消搜索
  cancelsearch() {
    this.setData({
      searchstr: ''
    })
  },
  //清空搜索框
  activity_clear(e) {

    this.setData({
      searchstr: ''
    })
  }
})
