const db = wx.cloud.database({})
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    btn0:[
      "C", "D", "E", "F", "G", "A", "B", "#","♭","3","4","5","6",
    ],
    btn2:[
      "C", "D", "E", "F", "G", "A", "B", "#", "♭", "大调", "自然小调", "和声小调", "旋律小调","多利亚调式", "弗里几亚调式","洛克利亚调式","雅乐", "燕乐", "宫调式", "商调式", "角调式", "徵调式", "羽调式",
    ],
    btn1: [
      "大", "小", "二度", "三度", "六度", "七度", "纯四度", "纯五度", "增四度",
    ],
    btn3: [
      "大", "小", "增", "减", "三和弦", "6和弦", "46和弦",
    ],
    currentIndex:0,
    innerAudioContextStd:null,
    innerAudioContext:null,
    ifplaystd: false,
    wrongnum:5,
    testmusic:[{
      index: "",
      src:"",
      answer:"",
      ifplay: false,
      myans: "",
      wrong: true,
      A: "",
      B: "",
      C: "",
      D: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
      A: "",
      B: "",
      C: "",
      D: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
      A: "",
      B: "",
      C: "",
      D: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
      A: "",
      B: "",
      C: "",
      D: "",
    },
    {
      index: "",
      src: "",
      answer: "",
      ifplay: false,
      myans: "",
      wrong: true,
      A: "",
      B: "",
      C: "",
      D: "",
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
        content: '请用科学音高记录法(c1=C4)依次标记你听到的每个音高（*若不了解什么是科学音高，请通过查看“我的->帮助”页面获取帮助）',
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
    if (this.data.id == 1) {
      wx.showModal({
        title: '提示',
        content: '请先后标记你听到的两组音程（*若对音程的概念不了解，请通过查看“我的->帮助”页面获取帮助）',
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
    if (this.data.id == 2) {
      wx.showModal({
        title: '提示',
        content: '请为你听到的音阶标注主音和调式(如：C大调)（*若对选项中的名词不了解，请通过查看“我的->帮助”页面获取帮助）',
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
    if (this.data.id == 3) {
      wx.showModal({
        title: '提示',
        content: '请请先后标记你听到的两组和弦（*若对和弦的概念不了解，请通过查看“我的->帮助”页面获取帮助）',
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
    if (this.data.id == 4) {
      wx.showModal({
        title: '提示',
        content: '请选出你听到的节奏型（*若对选项中的标识不了解，请通过查看“我的->帮助”页面获取帮助）',
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
    let that = this
    wx.showModal({
      title: '提示',
      content: '确定要提交吗？',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var testmusic = that.data.testmusic
          var TIME = util.formatTime(new Date());

          wx.cloud.init({
            env: 'jwx-q7azx',
            traceUser: true,
          })
          const db = wx.cloud.database()
          db.collection('allcount').add({
            data: {
              time: TIME.slice(0, 10),
            },
            success: res => {
              console.log(res)
            }
          })
          for (let i = 0; i < 5; i++) {
            var testmusic = that.data.testmusic
            var ansstr = testmusic[i].myans
            var answer = testmusic[i].answer
            if (answer == ansstr) {
              console.log(true)
              testmusic[i].wrong = false
              that.setData({
                testmusic: testmusic
              })
              var wrongnum = that.data.wrongnum
              that.setData({
                wrongnum: wrongnum - 1
              })
            }
            else {
              console.log(false)
            }
            var testmusic = that.data.testmusic
            if (testmusic[i].wrong == true) {
              db.collection('wrong').add({
                data: {
                  musicid: testmusic[i].index,
                  time: TIME.slice(0, 10),
                  myans: testmusic[i].myans
                },
                success: res => {
                  console.log(res)
                  // wx.redirectTo({
                  //   url: '../show/show?wrongnum=' + this.data.wrongnum
                  // })
                }
              })
            }
          }
          wx.redirectTo({
            url: '../show/show?wrongnum=' + that.data.wrongnum
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
          // wx.navigateBack({
          //   delta: 1
          // })
        }
      }
    })
    // var testmusic = this.data.testmusic
    // var TIME = util.formatTime(new Date());
    
    // wx.cloud.init({
    //   env: 'jwx-q7azx',
    //   traceUser: true,
    // })
    // const db = wx.cloud.database()
    // db.collection('allcount').add({
    //   data: {
    //     time: TIME.slice(0, 10),
    //   },
    //   success: res => {
    //     console.log(res)
    //   }
    // })
    // for(let i = 0; i < 5; i++){
    //   var testmusic = this.data.testmusic
    //   var ansstr = testmusic[i].myans
    //   var answer = testmusic[i].answer
    //   if (answer == ansstr) {
    //     console.log(true)
    //     testmusic[i].wrong = false
    //     this.setData({
    //       testmusic: testmusic
    //     })
    //     var wrongnum = this.data.wrongnum
    //     this.setData({
    //       wrongnum: wrongnum - 1
    //     })
    //   }
    //   else {
    //     console.log(false)
    //   }
    //   var testmusic = this.data.testmusic
    //   if(testmusic[i].wrong == true){
    //     db.collection('wrong').add({
    //       data: {
    //         musicid: testmusic[i].index,
    //         time: TIME.slice(0, 10),
    //         myans: testmusic[i].myans
    //       },
    //       success: res => {
    //         console.log(res)
    //         // wx.redirectTo({
    //         //   url: '../show/show?wrongnum=' + this.data.wrongnum
    //         // })
    //       }
    //     })
    //   }
    // }
    //           wx.redirectTo({
    //            url: '../show/show?wrongnum=' + this.data.wrongnum
    //           })
  },
  ans:function(e){
    console.log(e.target.dataset.id)
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    var ansstr = testmusic[c].myans + e.target.dataset.id
    testmusic[c].myans = ansstr
    this.setData({
      testmusic: testmusic
    })
  },
  anss: function (e) {
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    var ansstr = testmusic[c].myans + e.target.dataset.id + " "
    testmusic[c].myans = ansstr
    this.setData({
      testmusic: testmusic
    })
  },
  ans4:function(e){
    console.log(e.target.dataset.id)
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    var ansstr = e.target.dataset.id
    testmusic[c].myans = ansstr
    this.setData({
      testmusic: testmusic
    })
  },
  anscommon: function (e) {
    console.log(e.target.id)
  },
  ansdelete: function () {
    var testmusic = this.data.testmusic
    var c = this.data.currentIndex
    var cc = testmusic[c].myans.charAt(testmusic[c].myans.length - 1)
    var ansstr = testmusic[c].myans.slice(0, -1)
    if(cc==' '){
      ansstr = ansstr.slice(0,-1)
    }
    testmusic[c].myans = ansstr
    this.setData({
      testmusic: testmusic
    })
  },
  anscancel:function(){
    var c = this.data.currentIndex
    var testmusic = this.data.testmusic
    testmusic[c].myans = ""
    this.setData({
      testmusic: testmusic
    })
  },
  ansconfirm:function(){
    var c = this.data.currentIndex
      if(c==4){
        c = c - 1
      }
      this.setData({
        currentIndex: c+1
      }) //答题数+1，翻下一页
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
      innerAudioContextStd.src = "https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/std.m4a?sign=fc48756b93b3e5f8ccdddb131adc0685&t=1587970667";
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
      testmusic[c].ifplay = true
      this.setData({
        testmusic:testmusic
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