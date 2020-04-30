const util = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database({})
const TmplId = '3oKMgxRhW3dapI_hEbftSgUUnqjaAS9P06LIkD0Ewv4';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grade: 0,
    openid: "",
    wrong: 0,
    allcount: 0,
    subs: 0,
    study: {
      id: 0,
      //这里的变量名字一定要和从平台申请的模板所给的变量对应
      thing1: { value: '学习任务' },
      thing2: { value: '视唱练耳训练' },
    },
  },

  Subscribe: function (e) {
    let that = this
    const item = this.data.study
    wx.requestSubscribeMessage({
      tmplIds: [TmplId],
      success(res) {
        if (res[TmplId] == 'accept')
        // if (res.errMsg === 'requestSubscribeMessage:ok')
        {

          wx.cloud
            .callFunction({
              //通过调用云函数，实现用户点击允许我们发送订阅消息，
              //将该数据订阅保存到数据库，以便在满足条件的时候发送给用户
              name: 'subscribeMessage',
              data: {
                data: item,
                templateId: TmplId,
                //这个是给用户发送订阅消息后，用户点击订阅消息进入小程序的相关页面，一定要是在线的才可以
                page: 'pages/test/test',
              },
              // success(res) {
              //   console.log("success", res);
              //   wx.showToast({
              //     title: '订阅成功',
              //     icon: 'success',
              //     duration: 2000,
              //   });
              //   that.setData({
              //     subs: 1
              //   })
              // },
              // fail(res) {
              //   console.log("fail", res)
              //   wx.showToast({
              //     title: '订阅失败',
              //     icon: 'success',
              //     duration: 2000,
              //   });
              // },
              // complete(res) {
              //   console.log("complete", res)
              //   wx.showToast({
              //     title: '订阅失败',
              //     icon: 'success',
              //     duration: 2000,
              //   });
              // }
            })
            .then(() => {
              wx.showToast({
                title: '订阅成功，将于20:00为您推送学习提醒',
                icon: 'none',
                duration: 2000,
              });
              that.setData({
                subs: 1
              })
            })
            .catch(() => {
              wx.showToast({
                title: '订阅失败',
                icon: 'success',
                duration: 2000,
              });
            });
        }
      },
      fail(re) {
        console.log(re)
      },
    });

  },
  unSubscribe: function () {
    this.setData({
      subs: 0
    })
    wx.cloud
      .callFunction({
        name: 'unsubscribeMessage',
      })
      .then(() => {
        wx.showToast({
          title: '已取消',
          icon: 'success',
          duration: 2000,
        });
      })
      .catch(() => {
        wx.showToast({
          title: '订阅失败',
          icon: 'success',
          duration: 2000,
        });
      });

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
    db.collection('SubscribeMessage').where({
      touser: this.data.openid,
      done: false
    }).count({
      success: res => {
        console.log(res)
        this.setData({
          subs: 0
        })
        if (res.total != 0) {
          this.setData({
            subs: 1
          })
        }
      }
    })
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
    db.collection('SubscribeMessage').where({
      touser: this.data.openid,
      done: false
    }).count({
      success: res => {
        console.log(res)
        this.setData({
          subs: 0
        })
        if (res.total != 0) {
          this.setData({
            subs: 1
          })
        }
      }
    })
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
    db.collection('SubscribeMessage').where({
      touser: this.data.openid,
      done: false
    }).count({
      success: res => {
        console.log(res)
        this.setData({
          subs: 0
        })
        if (res.total != 0) {
          this.setData({
            subs: 1
          })
        }
      }
    })
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