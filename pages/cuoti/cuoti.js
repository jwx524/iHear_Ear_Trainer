const util = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    innerAudioContext: null,
    total: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.total)
    wx.showLoading({
      title: '加载中...',
    })
    wx.cloud.init({
      traceUser: true,
    })
    this.setData({
      openid: app.globalData.openid
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight - 320 * res.windowWidth / 750,
          scrollwidth: res.windowWidth
        });
      }
    })
    var innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContext: innerAudioContext
    })
    const db = wx.cloud.database()
    db.collection('wrong').where({
      _openid: this.data.openid
    }).count({
      success: res => {
        var total = res.total
        total = total - 20
        // if (options.total != 0){
        //   total = options.total
        // }
        if (total < 0) {
          total = 0
        }
        this.setData({
          total: total
        })
        db.collection('wrong').where({
          _openid: this.data.openid
        }).skip(total).get({
          success: res => {
            console.log(res.data.length)
            var testmusic = new Array()
            for (let i = 0; i < res.data.length; i++) {
              testmusic[i] = {
                index: res.data[res.data.length - 1 - i].musicid,
                src: "",
                answer: "",
                ifplay: false,
                ifbeat: false,
                myans: res.data[res.data.length - 1 - i].myans,
                time: res.data[res.data.length - 1 - i].time
              }

            }
            this.setData({
              testmusic: testmusic,
              cc: 0
            })
            var L = res.data.length
            for (let i = 0; i < res.data.length; i++) {
              var testmusic = this.data.testmusic
              var cc = this.data.cc
              db.collection('music').doc(this.data.testmusic[i].index).get({
                success: res => {
                  cc = cc + 1
                  testmusic[i].src = res.data.src
                  testmusic[i].answer = res.data.answer
                  if (res.data.A != null) {
                    testmusic[i].ifbeat = true
                    if (res.data.answer == 'A') {
                      testmusic[i].answer = res.data.A
                    }
                    if (res.data.answer == 'B') {
                      testmusic[i].answer = res.data.B
                    }
                    if (res.data.answer == 'C') {
                      testmusic[i].answer = res.data.C
                    }
                    if (res.data.answer == 'D') {
                      testmusic[i].answer = res.data.D
                    }
                    if (testmusic[i].myans == 'A') {
                      testmusic[i].myans = res.data.A
                    }
                    if (testmusic[i].myans == 'B') {
                      testmusic[i].myans = res.data.B
                    }
                    if (testmusic[i].myans == 'C') {
                      testmusic[i].myans = res.data.C
                    }
                    if (testmusic[i].myans == 'D') {
                      testmusic[i].myans = res.data.D
                    }
                  }
                  this.setData({
                    testmusic: testmusic,
                    cc: cc
                  })
                  if (this.data.cc == L) {
                    wx.hideLoading()
                    wx.showToast({
                      title: '加载成功',
                    })
                  }
                }
              })
            }
            // wx.hideLoading()
            // wx.showToast({
            //   title: '加载成功',
            // })
          }
        })
      }
    })

  },
  next: function () {
    wx.cloud.init({
      traceUser: true,
    })
    const db = wx.cloud.database()
    wx.showLoading({
      title: '玩命加载中',
    })
    var total = this.data.total
    total = total - 20
    this.setData({
      total: total
    })
    wx.redirectTo({
      url: '../cuoti/cuoti?total=' + this.data.total
    })
    wx.hideLoading()
    wx.showToast({
      title: '加载成功',
    })


  },
  playMusic: function (e) {
    console.log(e.currentTarget)
    var c = parseInt(e.currentTarget.dataset.pid)
    var ifplay = this.data.testmusic[c].ifplay;
    var innerAudioContext = this.data.innerAudioContext;
    var testmusic = this.data.testmusic
    if (!ifplay) {
      innerAudioContext.src = this.data.testmusic[c].src
      innerAudioContext.play();
      testmusic[c].ifplay = true
      this.setData({
        testmusic: testmusic
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        testmusic[c].ifplay = false
        this.setData({
          testmusic: testmusic
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      testmusic[c].ifplay = false
      this.setData({
        testmusic: testmusic
      })
    }
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