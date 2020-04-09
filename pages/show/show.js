// pages/show/show.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    currentIndex: 0,
    innerAudioContext: null,
    testmusic: [{
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
    },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
    this.setData({
      wrongnum: options.wrongnum
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
    })
    console.log(app.globalData.openid)
    this.setData({
      openid: app.globalData.openid
    })
    var innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContext: innerAudioContext
    })
    const db = wx.cloud.database()
    var length = 0
    var start = 0
    db.collection('wrong').where({
      _openid: this.data.openid
    }).get({
      success: res =>{
        console.log(res.data)
        length = res.data.length
        start = length - this.data.wrongnum
        var testmusic = this.data.testmusic
        var c = 0
        console.log(start)
        console.log(length)
        for(let i = start; i < length; i++){
          testmusic[c].index = res.data[i].musicid
          testmusic[c].myans = res.data[i].myans
          c = c + 1
        }
        this.setData({
          testmusic: testmusic
        })
        for (let i = 0; i < 5; i++) {
          var testmusic = this.data.testmusic
          db.collection('music').doc(this.data.testmusic[i].index).get({
            success: res => {
              testmusic[i].src = res.data.src
              testmusic[i].answer = res.data.answer
              this.setData({
                testmusic: testmusic
              })
            }
          })
        }
      }
    })
  },
  change: function (e) {
    console.log(e.detail.current)
    var c = this.data.currentIndex
    if (c > 0){
      var innerAudioContext = this.data.innerAudioContext;
      innerAudioContext.stop();
      var testmusic = this.data.testmusic
      testmusic[c-1].ifplay = false
      this.setData({
        testmusic: testmusic,
      })
    }
    this.setData({
      currentIndex: e.detail.current
    })
  },
  playMusic: function (e) {
    console.log(e.currentTarget)
    var c = this.data.currentIndex - 1
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
    return {
      title: '帮你练就绝对音准！',
      imageUrl: ''
    }
  }
})