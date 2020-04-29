//打卡日历页面
var util = require('../../utils/util.js');
const app = getApp();
var calendarSignData;
var data;
var date;
// var calendarSignDay;
Page({
  data: {
    days: [],
    cur_year: 0,
    cur_month: 0,
    current:[],
    count: 0,
    today:"",
    testtoday:0,
    ifSign: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  

  onLoad: function (options) {
    //this.setData({ _openid: this.data.openid });
    //获取当前年月 
    wx.showLoading({
      title: '加载中...',
    })
    const mydate = new Date();
    const cur_year = mydate.getFullYear();
    const cur_month = mydate.getMonth() + 1;
    date = mydate.getDate()+cur_month*35;
    console.log(date)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.onJudgeSign(cur_year, cur_month)
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.ongetsignup();
    var ifSign = this.data.ifSign
    wx.cloud.init({
      env: 'jwx-q7azx',
      traceUser: true,
    })
    const db = wx.cloud.database()
    db.collection('calendarSignData').where({
      date: date + "",
      _openid: app.globalData.openid
    }).count({
      success: res =>{
        if(res.total>0){
          ifSign = true
        }
        this.setData({
          ifSign: ifSign
        })
      }
    })
    this.setData({
      cur_year,
      cur_month,
      weeks_ch,
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

  },
  
  // 获取当月共多少天
  getThisMonthDays: function (year, month) {
    return new Date(year, month, 0).getDate()
  },

  // 获取当月第一天星期几
  getFirstDayOfWeek: function (year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids: function (year, month) {
    var that = this;
    var count = 0
    //计算每个月时要清零
    that.setData({ days: [] });
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj = {
          mydate: null,
          isSign: false
        }
        that.data.days.push(obj);
        count = count + 1
      }
      this.setData({
        days: that.data.days,
        count: count
      });
      //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays: function (year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var ii = i + month * 35;
      if (ii == calendarSignData[ii]) {
        var obj = {
          mydate: i,
          isSign: true
        }
        console.log(true)
      }
      else {
        var obj = {
          mydate: i,
          isSign: false
        }
        console.log(false)
      }
      that.data.days.push(obj);
    }
    this.setData({
      days: that.data.days
    });

  },
  
  onJudgeSign: function (year,month){
    // return new Promise(resolve => {
      const monthDaySize = this.getThisMonthDays(year, month);
      //获取当前用户当前任务的签到状态
      // if (wx.getStorageSync("calendarSignData") == null || wx.getStorageSync("calendarSignData") == '') {
      //   wx.setStorageSync("calendarSignData", new Array(monthDaySize));
      // };
      // if (wx.getStorageSync("calendarSignDay") == null || wx.getStorageSync("calendarSignDay") == '') {
      //   wx.setStorageSync("calendarSignDay", 0);
      // }
      // calendarSignData = wx.getStorageSync("calendarSignData")
      // calendarSignDay = wx.getStorageSync("calendarSignDay")
      // console.log(calendarSignData);
      // console.log(calendarSignDay);
      wx.cloud.init({
        env: 'jwx-q7azx',
        traceUser: true,
      })
      const db = wx.cloud.database()
      calendarSignData = new Array(monthDaySize)
      var ctotal = 0
      db.collection('calendarSignData').where({
        _openid: this.data.openid
      }).count({
        success: res => {
          ctotal = Math.ceil(1.0 * res.total / 20)
          for (let j = 0; j < ctotal; j++) {
            db.collection('calendarSignData').where({
              _openid: this.data.openid
            }).skip(j * 20).get({
              success: res => {
                console.log(res.data)
                var cid = 0
                for (let i = 0; i < res.data.length; i++) {
                  cid = parseInt(res.data[i].date)
                  calendarSignData[cid] = cid
                }
                // wx.setStorageSync("calendarSignData", calendarSignData);
                if(j==(ctotal - 1)){
                  // console.log(j)
                  var that = this;
                  const thisMonthDays = this.getThisMonthDays(year, month);
                  var count = this.data.count
                  var days = this.data.days
                  for (let i = 1; i <= thisMonthDays; i++) {
                    var ii = i + month * 35;
                    console.log(ii)
                    console.log(calendarSignData[ii])
                    if (ii == calendarSignData[ii]) {
                      var obj = {
                        mydate: i,
                        isSign: true
                      }
                      console.log(true)
                    }
                    else {
                      var obj = {
                        mydate: i,
                        isSign: false
                      }
                      console.log(false)
                    }
                    // that.data.days.push(obj);
                    days[count+i-1] = obj
                  }
                  this.setData({
                    days: that.data.days
                  });
                }
              }
            })
          }
          console.log(ctotal)
          // for (let i = 1; i <= monthDaySize; i++) {
          //   var ii = i + month * 35;
          //   console.log(ii)
          //   console.log(calendarSignData[ii])
          //   if (ii == calendarSignData[ii]) {
          //     var obj = {
          //       mydate: i,
          //       isSign: true
          //     }
          //     console.log(true)
          //   }
          //   else {
          //     var obj = {
          //       mydate: i,
          //       isSign: false
          //     }
          //     console.log(false)
          //   }
          //   that.data.days.push(obj);
          // }
          // this.setData({
          //   days: that.data.days
          // });
          wx.hideLoading()
          wx.showToast({
            title: '加载成功',
          })
          this.setData({
            cur_year: year,
            cur_month: month,
            monthDaySize: monthDaySize,
            date: date,
            calendarSignData: calendarSignData,
            // calendarSignDay: calendarSignDay
          })
        }
      })
    // })
    
    
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar: function (e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      //this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      //this.onGetSignUp();
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

  calendarSign: function () {
    wx.cloud.init({
      env: 'jwx-q7azx',
      traceUser: true,
    })
    const db = wx.cloud.database()
    db.collection('calendarSignData').add({
      data: {
        date: date + ""
      },
      success: res => {
        console.log(res)
      }
    })
    calendarSignData[date] = date;
    console.log(calendarSignData);
    // if(calendarSignData[date-1]==null)
    // {calendarSignDay=0;}
    // calendarSignDay = calendarSignDay + 1;
    // wx.setStorageSync("calendarSignData", calendarSignData);
    // wx.setStorageSync("calendarSignDay", calendarSignDay);
    const mydate = new Date();
    const now_year = mydate.getFullYear();
    const now_month = mydate.getMonth() + 1;
    this.calculateEmptyGrids(now_year, now_month);
    this.calculateDays(now_year, now_month);
    var ifSign = this.data.ifSign
    ifSign = true
    this.setData({
      cur_year: now_year,
      cur_month: now_month,
      ifSign: ifSign
    })
    wx.showToast({
      title: '签到成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      calendarSignData: calendarSignData,
      // calendarSignDay: calendarSignDay
    })
  },
  ongetsignup: function(){
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
            testtoday: res.total
          })
        }
      }) 
  }
  
})