Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[
      {
        id: 0,
        type: 'image',
        url: "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2Bcard/notes.jpg?sign=05a1b4fc3cc79ca2fed3ae0dd0e65dae&t=1589514296",
        text:"音组"
      },
      {
        id: 1,
        type: 'image',
        url: "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2Bcard/intervals.jpg?sign=89521435c48590e4aafc1f84864f7c56&t=1589514329",
        text: "音程"
      },
      {
        id: 2,
        type: 'image',
        url: "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2Bcard/modes.jpg?sign=41fb2a14c2b8f45f06967b5a06a1250e&t=1589514349",
        text: "调式"
      },
      {
        id: 3,
        type: 'image',
        url: "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2Bcard/chords.jpg?sign=745abe424d773a0326cdfd761e39002b&t=1589514390",
        text: "和弦"
      },
      {
        id: 4,
        type: 'image',
        url: "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2Bcard/rhythms.jpg?sign=296541e35008752d9a72124d8ec5c15c&t=1589514404",
        text: "节奏"
      },
    ],
    width: 0,
    height: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight,
          width: res.windowWidth
        });
      }
    }),
    this.towerSwiper('swiperList');
  },
  // 页面跳转
  jump:function(e){
    console.log(e.currentTarget)
    var id = parseInt(e.currentTarget.dataset.jid)
    console.log(id)
    wx.navigateTo({
      url:'/pages/detail/detail?id=' + id
    })
  },
// 初始化towerSwiper
towerSwiper(name) {
  let list = this.data[name];
  for (let i = 0; i < list.length; i++) {
    list[i].zIndex = list.length - i - 1
    list[i].mLeft = i
  }
  this.setData({
    swiperList: list
  })
},
// towerSwiper触摸开始
towerStart(e) {
  console.log("towerstart")
  this.setData({
    towerStart: e.touches[0].pageX
  })
},
// towerSwiper计算方向
towerMove(e) {
  console.log("towermove")
  console.log(e.touches[0].pageX - this.data.towerStart)
  if (e.touches[0].pageX - this.data.towerStart == 0){
    this.setData({
      direction: 'none'
    })
  }
  if (e.touches[0].pageX - this.data.towerStart > 0){
    this.setData({
      direction: 'right'
    })
  }
  if (e.touches[0].pageX - this.data.towerStart < 0) {
    this.setData({
      direction: 'left'
    })
  }
  // this.setData({
  //   direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
  // })
},
// towerSwiper计算滚动
towerEnd(e) {
  console.log("towerend")
  let direction = this.data.direction;
  console.log(direction)
  let list = this.data.swiperList;
  if (direction == 'right') {
    let mLeft = list[0].mLeft;
    let zIndex = list[0].zIndex;
    for (let i = 1; i < list.length; i++) {
      list[i - 1].mLeft = list[i].mLeft
      list[i - 1].zIndex = list[i].zIndex
    }
    list[list.length - 1].mLeft = mLeft;
    list[list.length - 1].zIndex = zIndex;
    this.setData({
      swiperList: list
    })
  } 
  if (direction == 'left')  {
    let mLeft = list[list.length - 1].mLeft;
    let zIndex = list[list.length - 1].zIndex;
    for (let i = list.length - 1; i > 0; i--) {
      list[i].mLeft = list[i - 1].mLeft
      list[i].zIndex = list[i - 1].zIndex
    }
    list[0].mLeft = mLeft;
    list[0].zIndex = zIndex;
    this.setData({
      swiperList: list
    })
  }
  this.setData({
    direction:'none'
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '帮你练就绝对音准！',
      imageUrl: ''
    }
  }
})