const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    today: "",
    testtoday: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.showLoading({
    //   title: '加载中...',
    // })
    var TIME = util.formatTime(new Date());
    this.setData({ today: TIME.slice(0, 10) })
    wx.cloud.init({
      traceUser: true,
    })
    this.setData({
      openid: app.globalData.openid
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
    })
    const db = wx.cloud.database()
    db.collection('allcount').where({
      _openid: this.data.openid
    }).where({
      time: this.data.today
      }).count({
        success: res =>{
          console.log(res)
          this.setData({
            testtoday: res.total * 5
          })
          wx.hideLoading()
          wx.showToast({
            title: '加载成功',
          })
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
    
  }
})