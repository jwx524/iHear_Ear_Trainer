const db = wx.cloud.database({})


Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn0:[
      "C", "D", "E", "F", "G", "A", "B", "#","♭","3","4","5","6",
    ],
    btn2:[
      "C", "D", "E", "F", "G", "A", "B", "#", "♭", "大调", "自然小调", "和声小调", "旋律小调",
    ],
    btn1: [
      "大", "小", "二度", "三度", "六度","纯四度","纯五度",
    ],
    btn3: [
      "大", "小", "增", "减", "三和弦", "6和弦", "46和弦",
    ],
    currentIndex:0,
    innerAudioContextStd:null,
    innerAudioContext:null,
    ifplaystd: false,
    ansstr:"",
    wrongnum:0,
    finished:0,
    testmusic:[{
      index: "",
      src:"",
      answer:"",
      ifplay: false,
      myans: "",
      wrong: true,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
    },
  ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
    console.log(options.id)
    this.setData({
      id: options.id
    })
    if(this.data.id==0){
      wx.showModal({
        title: '提示',
        content: '请用科学音高记录法标记你听到的音高',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
    })
    var innerAudioContextStd = wx.createInnerAudioContext();
    var innerAudioContext = wx.createInnerAudioContext();
    this.setData({
      innerAudioContextStd: innerAudioContextStd,
      innerAudioContext: innerAudioContext
    })
    const db = wx.cloud.database()
    var _id = this.data.id + ""
    db.collection('musicindex').doc(_id).get({
      success: res => {
        this.setData({
          count : res.data.count,
          first : res.data.first,
        })
        var testIndex0 = Math.floor(Math.random() * this.data.count + this.data.first)
        console.log(testIndex0)
        var testIndex1 = Math.floor(Math.random() * this.data.count + this.data.first)
        while (testIndex1 == testIndex0){
          testIndex1 = Math.floor(Math.random() * this.data.count + this.data.first)
        }
        console.log(testIndex1)
        var testIndex2 = Math.floor(Math.random() * this.data.count + this.data.first)
        while ((testIndex1 == testIndex2) || (testIndex0 == testIndex2)) {
          testIndex2 = Math.floor(Math.random() * this.data.count + this.data.first)
        }
        console.log(testIndex2)
        var testIndex3 = Math.floor(Math.random() * this.data.count + this.data.first)
        while ((testIndex3 == testIndex0) || (testIndex3 == testIndex1) || (testIndex3 == testIndex2)) {
          testIndex3 = Math.floor(Math.random() * this.data.count + this.data.first)
        }
        console.log(testIndex3)
        var testIndex4 = Math.floor(Math.random() * this.data.count + this.data.first)
        while ((testIndex4 == testIndex0) || (testIndex4 == testIndex1) || (testIndex4 == testIndex2) || (testIndex4 == testIndex3)) {
          testIndex4 = Math.floor(Math.random() * this.data.count + this.data.first)
        }
        console.log(testIndex4)
        var testmusic = this.data.testmusic
        testmusic[0].index = testIndex0 + ""
        testmusic[1].index = testIndex1 + ""
        testmusic[2].index = testIndex2 + ""
        testmusic[3].index = testIndex3 + ""
        testmusic[4].index = testIndex4 + ""
        this.setData({
          testmusic: testmusic
        })
        for(let i=0;i<5;i++){
          var testmusic = this.data.testmusic
          db.collection('music').doc(this.data.testmusic[i].index).get({
            success: res => {
              testmusic[i].src = res.data.src
              testmusic[i].answer = res.data.answer
              this.setData({
                testmusic:testmusic
              })
            }
          })
        }
      }
    })
   
  },
  submit:function(e){
    var testmusic = this.data.testmusic
    wx.redirectTo({
      url: '../show/show'
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
    var c = this.data.ansstr.charAt(this.data.ansstr.length-1)
    var ansstr = this.data.ansstr.slice(0, -1)
    if(c==' '){
      ansstr = ansstr.slice(0,-1)
    }
    this.setData({
      ansstr: ansstr
    })
  },
  anscancel:function(){
    this.setData({
      ansstr: ""
    })
  },
  ansconfirm:function(){
    var ansstr = this.data.ansstr
    if(ansstr!=""){
      var f = this.data.finished
      var c = this.data.currentIndex
      var answer = this.data.testmusic[c].answer
      var testmusic = this.data.testmusic
      testmusic[c].myans = ansstr
      this.setData({
        testmusic:testmusic
      })
      if(answer==ansstr){
        console.log(true)
        testmusic[c].wrong = false
        this.setData({
          testmusic: testmusic
        })
      }
      else{
        console.log(false)
        var wrongnum = this.data.wrongnum
        this.setData({
          wrongnum : wrongnum + 1
        })
      }
      if(c==4){
        c = c - 1
      }
      this.setData({
        finished : f + 1,
        ansstr: "",
        currentIndex: c+1
      }) //清空答案池，答题数+1，翻下一页
    }
  },
  change:function(e){
    console.log(e.detail.current)
    var innerAudioContext = this.data.innerAudioContext;
    innerAudioContext.stop();
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    testmusic[c].ifplay = false
    this.setData({
      testmusic: testmusic,
      currentIndex: e.detail.current
    })
  },
  prev: function () {
    console.log("prev")
    var innerAudioContext = this.data.innerAudioContext;
    innerAudioContext.stop();
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    testmusic[c].ifplay = false
    this.setData({
      testmusic: testmusic,
      currentIndex:this.data.currentIndex-1,
    })
    // app.currentIndex = this.getNextIndex(false)
    // this._init()
  },
  next: function () {
    console.log("next")
    var innerAudioContext = this.data.innerAudioContext;
    innerAudioContext.stop();
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    testmusic[c].ifplay = false
    this.setData({
      testmusic: testmusic,
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
  playMusic: function (e) {
    console.log(e.currentTarget)
    var c = this.data.currentIndex
    var ifplay = this.data.testmusic[c].ifplay;
    var innerAudioContext = this.data.innerAudioContext;
    var testmusic = this.data.testmusic
    if (!ifplay) {
      innerAudioContext.src = this.data.testmusic[c].src
      innerAudioContext.play();
      // this.setData({
      //   'testmusic[0].ifplay': true,
      // })
      testmusic[c].ifplay = true
      this.setData({
        testmusic:testmusic
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        // this.setData({
        //   'testmusic[0].ifplay': false,
        // })
        testmusic[c].ifplay = false
        this.setData({
          testmusic: testmusic
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      // this.setData({
      //   'testmusic[0].ifplay': false
      // })
      testmusic[c].ifplay = false
      this.setData({
        testmusic: testmusic
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