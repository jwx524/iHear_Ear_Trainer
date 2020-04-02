Page({

  /**
   * 页面的初始数据
   */
  data: {
    div:[
      {
        id: 0,
        text:"旋律"
      },
      {
        id: 1,
        text: "音程"
      },
      {
        id: 2,
        text: "音阶"
      },
      {
        id: 3,
        text: "和弦"
      },
      {
        id: 4,
        text: "节奏"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
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
  },
  jump:function(e){
    console.log(e.currentTarget)
    var id = parseInt(e.currentTarget.dataset.jid)
    console.log(id)
    wx.navigateTo({
      url:'/pages/detail/detail?id=' + id
    })
  }
})