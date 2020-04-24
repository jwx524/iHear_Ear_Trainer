const app = getApp();
const db = wx.cloud.database({})
const TmplId ='3oKMgxRhW3dapI_hEbftSgUUnqjaAS9P06LIkD0Ewv4';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: "",
    subs: 0,
    study: [{
        id:0,
        //这里的变量名字一定要和从平台申请的模板所给的变量对应
        thing1:{value:'学习任务'},
        thing2:{value:'视唱练耳训练'},
      },
    ] 
  },

  Subscribe: function(e) {
    let that = this
    const item = e.currentTarget.dataset.item;
    wx.requestSubscribeMessage({
      tmplIds: [TmplId],
      success(res) {
       
        if (res.errMsg === 'requestSubscribeMessage:ok') {
          
          wx.cloud
            .callFunction({
              //通过调用云函数，实现用户点击允许我们发送订阅消息，
              //将该数据订阅保存到数据库，以便在满足条件的时候发送给用户
              name: 'subscribeMessage',
              data: {
                data: item,
                templateId: TmplId,
                //这个是给用户发送订阅消息后，用户点击订阅消息进入小程序的相关页面，一定要是在线的才可以
                page:'pages/index/index',
              },
            })
            .then(() => {
              that.setData({
                subs: 1
              })
              wx.showToast({
                title: '订阅成功',
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
        }
      },
      fail(re){
        console.log(re)
      },
    });
    
  },

  //实现在满足条件的时候给用户发送模板消息
  //像二手物品交易中，将用户的物品信息存储起来，等到其他人购买，提醒用户发货
  //就可以在别人下单的函数中，给卖家发送模板消息。
  send(){
    wx.cloud.callFunction({
      name: 'subscribeMessagesend',
      success(res){
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000,
        });
        console.log(res)
      },
      fail(re){
        console.log(re)
      }
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
      openid: app.globalData.openid
    })
    const db = wx.cloud.database()
    db.collection('SubscribeMessage').where({
      touser: this.data.openid,
      done: false
    }).count({
      success: res =>{
        console.log(res)
        this.setData({
          subs: 0
        })
        if(res.total!=0){
          this.setData({
            subs: 1
          })
        }
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