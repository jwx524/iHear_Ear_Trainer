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
      ifbeat: false,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      ifbeat: false,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      ifbeat: false,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      ifbeat: false,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      ifbeat: false,
    },
    ],
    imgheight: 0,
  },
  imgLoad: function(e) {
    var img_height = e.detail.height;
    var img_width = e.detail.width;
    var scr_width = wx.getSystemInfoSync().windowWidth;
    var ratio = img_height/img_width;
    this.setData({
      imgheight: scr_width*ratio,
    })
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
          scrollheight: res.screenHeight - res.statusBarHeight - app.globalData.CustomBar,
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
    }).count({
      success: res =>{
        var total = res.total
        var total = total - this.data.wrongnum
        db.collection('wrong').where({
          _openid: this.data.openid
        }).skip(total).get({
          success: res => {
            console.log(res.data)
            length = res.data.length
            start = length - this.data.wrongnum
            var testmusic = this.data.testmusic
            var c = 0
            console.log(start)
            console.log(length)
            for (let i = start; i < length; i++) {
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
                  if (res.data.A != null) {
                    testmusic[i].ifbeat = true
                    if (res.data.answer=='A'){
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
                    testmusic: testmusic
                  })
                }
              })
            }
          }
        })
      }
    })
    // db.collection('wrong').where({
    //   _openid: this.data.openid
    // }).get({
    //   success: res =>{
    //     console.log(res.data)
    //     length = res.data.length
    //     start = length - this.data.wrongnum
    //     var testmusic = this.data.testmusic
    //     var c = 0
    //     console.log(start)
    //     console.log(length)
    //     for(let i = start; i < length; i++){
    //       testmusic[c].index = res.data[i].musicid
    //       testmusic[c].myans = res.data[i].myans
    //       c = c + 1
    //     }
    //     this.setData({
    //       testmusic: testmusic
    //     })
    //     for (let i = 0; i < 5; i++) {
    //       var testmusic = this.data.testmusic
    //       db.collection('music').doc(this.data.testmusic[i].index).get({
    //         success: res => {
    //           testmusic[i].src = res.data.src
    //           testmusic[i].answer = res.data.answer
    //           this.setData({
    //             testmusic: testmusic
    //           })
    //         }
    //       })
    //     }
    //   }
    // })
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
    var c = parseInt(e.currentTarget.dataset.current)
    // var c = this.data.currentIndex - 1
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