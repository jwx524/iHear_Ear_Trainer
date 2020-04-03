Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn0:[
      "C","D","E","F","G","A","B","3","4","5","6",
    ],
    btn2:[
      "C", "D", "E", "F", "G", "A", "B", "大调", "自然小调", "和声小调", "旋律小调",
    ],
    btn1: [
      "大", "小", "二度", "三度", "六度","纯四度","纯五度",
    ],
    btn3: [
      "大", "小", "增", "减", "三和弦", "6和弦", "46和弦",
    ],
    currentIndex:0,
    innerAudioContextStd:null,
    ifplaystd: false,
    ansstr:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.setData({
      id: options.id
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
    })
    var innerAudioContextStd = wx.createInnerAudioContext();
    this.setData({
      innerAudioContextStd: innerAudioContextStd
    })
  },
  ans:function(e){
    console.log(e.target.dataset.id)
    var ansstr = this.data.ansstr+e.target.dataset.id
    this.setData({
      ansstr:ansstr
    })
  },
  anss: function (e) {
    console.log(e.target.dataset.id)
    var ansstr = this.data.ansstr + e.target.dataset.id + " "
    this.setData({
      ansstr: ansstr
    })
  },
  anscommon: function (e) {
    console.log(e.target.id)
  },
  ansdelete: function () {
    var ansstr = this.data.ansstr.slice(0,-1)
    this.setData({
      ansstr: ansstr
    })
  },
  anscancel:function(){
    this.setData({
      ansstr: ""
    })
  },
  change:function(e){
    console.log(e.detail.current)
    this.setData({
      currentIndex: e.detail.current
    })
  },
  prev: function () {
    console.log("prev")
    this.setData({
      currentIndex:this.data.currentIndex-1
    })
    // app.currentIndex = this.getNextIndex(false)
    // this._init()
  },
  next: function () {
    console.log("next")
    this.setData({
      currentIndex: this.data.currentIndex + 1
    })
    // app.currentIndex = this.getNextIndex(true)
    // this._init()
  },
  playMusicStd:function(e){
    console.log(e.currentTarget)
    var ifplaystd = this.data.ifplaystd;
    var innerAudioContextStd = this.data.innerAudioContextStd;
    if (!ifplaystd) {
      innerAudioContextStd.src = "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/std.m4a?sign=efe9595bfb524e0f5f413ce08784b62f&t=1585881197";
      innerAudioContextStd.play();
      this.setData({
        ifplaystd: true,
      })
      innerAudioContextStd.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          ifplaystd: false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContextStd.pause();
      this.setData({
        ifplaystd: false
      })
    }
  },
  getNextIndex: function (nextFlag) {
    let ret,
      currentIndex = app.currentIndex,
      mod = this.data.playMod,
      len = this.data.songslist.length
    if (mod === RANDOM_MOD) {
      ret = util.randomNum(len)
    } else {
      if (nextFlag) {
        ret = currentIndex + 1 == len ? 0 : currentIndex + 1
      } else {
        ret = currentIndex - 1 < 0 ? len - 1 : currentIndex - 1
      }
    }
    return ret
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