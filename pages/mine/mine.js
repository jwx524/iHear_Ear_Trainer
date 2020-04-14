const util = require('../../utils/util.js')
const app = getApp()
import subscribe from '../../utils/SubscribeMessageUtil'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grade:0,
    openid: "",
    wrong: 0,
    allcount: 0,
    // push_content: {
    //   thing1: {
    //     value: '您有新的学习任务需要完成噢~'
    //   },
    //   thing2: {
    //     value: '视唱练耳'
    //   },
    // }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.init({
      traceUser: true,
    })
    var TIME = util.formatTime(new Date());
    this.setData({ time: TIME })
 /*   wx.setNavigationBarTitle({
      title: TIME,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      openid: app.globalData.openid
    })
    const db = wx.cloud.database()
    db.collection('wrong').where({
      _openid: this.data.openid
    }).count({
      success: res =>{
        this.setData({
          wrong: res.total
        })
        db.collection('allcount').where({
          _openid: this.data.openid
        }).count({
          success: res =>{
            if(res.total!=0){
              var allcount = 5 * res.total
              var grade = ((1 - this.data.wrong / (1.0 * allcount)) * 100).toFixed()
              this.setData({
                allcount: allcount,
                grade: grade
              })
            }
          }
        })
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  subscriptionNotice: function () {
    subscribe.subscription(['3oKMgxRhW3dapI_hEbftSgUUnqjaAS9P06LIkD0Ewv4'])
  },
  // template_Msg: function (e) {
  //   wx.showLoading({ //期间为了显示效果可以添加一个过渡的弹出框提示“加载中”  
  //     title: '加载中',
  //     icon: 'loading',
  //   });

  //   //获取access_token
  //   wx.request({
  //     url: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx9c0e9bd4fa231d49&secret=a9ab7566acd9a370b3fe6674faea47ab",
  //     success: (res) => {
  //       console.log(res);
  //       this.setData({
  //         token: res.data.access_token //将access_token存到data的token里
  //       });
  //       console.log("access_token:" + this.data.token);
  //     }
  //   });

  //   var access_token_url = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + this.data.token;
  //   var push_content = {
  //     "keyword1": this.data.push_content_data[0],
  //     "keyword2": this.data.push_content_data[1],
  //   };
  //   console.log(push_content)
  //   wx.request({
  //     url: access_token_url,

  //     //注意不要用value代替data
  //     data: {
  //       touser: this.data.openid,
  //       template_id: '3oKMgxRhW3dapI_hEbftSgUUnqjaAS9P06LIkD0Ewv4', //换成你申请的模板消息id，  
  //       page: '/pages/mine/mine',
  //       data: push_content,
  //       color: '#ccc',
  //       emphasis_keyword: 'keyword3.DATA'
  //     },
  //     method: 'POST',
  //     success: function (res) {
  //       wx.hideLoading();
  //       console.log("发送成功");
  //       console.log(res);
  //     },
  //     fail: function (err) {
  //       // fail  
  //       console.log("push err")
  //       console.log(err);
  //     }
  //   });
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.cloud.init({
      traceUser: true,
    })
    var TIME = util.formatTime(new Date());
    this.setData({ time: TIME })
    /*   wx.setNavigationBarTitle({
         title: TIME,
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
       })*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      openid: app.globalData.openid
    })
    const db = wx.cloud.database()
    db.collection('wrong').where({
      _openid: this.data.openid
    }).count({
      success: res => {
        this.setData({
          wrong: res.total
        })
        db.collection('allcount').where({
          _openid: this.data.openid
        }).count({
          success: res => {
            if (res.total != 0) {
              var allcount = 5 * res.total
              var grade = ((1 - this.data.wrong / (1.0 * allcount)) * 100).toFixed()
              this.setData({
                allcount: allcount,
                grade: grade
              })
            }
          }
        })
      }
    })
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
    console.log("start pulldownrefresh")
    wx.cloud.init({
      traceUser: true,
    })
    var TIME = util.formatTime(new Date());
    this.setData({ time: TIME })
    /*   wx.setNavigationBarTitle({
         title: TIME,
         success: function(res) {},
         fail: function(res) {},
         complete: function(res) {},
       })*/
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    this.setData({
      openid: app.globalData.openid
    })
    const db = wx.cloud.database()
    db.collection('wrong').where({
      _openid: this.data.openid
    }).count({
      success: res => {
        this.setData({
          wrong: res.total
        })
        db.collection('allcount').where({
          _openid: this.data.openid
        }).count({
          success: res => {
            if (res.total != 0) {
              var allcount = 5 * res.total
              var grade = ((1 - this.data.wrong / (1.0 * allcount)) * 100).toFixed()
              this.setData({
                allcount: allcount,
                grade: grade
              })
            }
            wx.stopPullDownRefresh()
            console.log("end pulldownrefresh")
          }
        })
      }
    })
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