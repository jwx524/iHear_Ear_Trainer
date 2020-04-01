var app = getApp()
Page({
  data: {
    userInfo: {},
    scrollheight:0,
    scrollwidth:0,
    addflag: true,  //判断是否显示搜索框右侧部分
    addimg: '../../images/activity_add.png',
    searchstr: '',
  
    flag: 0,
    currentTab: 0,
    content:[
      {
        ifShoucang:false,
        text:"纯一度",
        music:{
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/1.m4a?sign=91646a8f501a80dde184e95865c14c83&t=1585659932',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "小二度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-2.m4a?sign=477dc11aa3d78d0449374e5906bd860f&t=1585672302',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "大二度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B2.m4a?sign=acec365c85cd6e800077c3a74e345ab8&t=1585702545',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "小三度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-3.m4a?sign=3fa850fef1010f27d275f23c11f2282e&t=1585703387',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "大三度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B3.m4a?sign=0c887323b7dda608c9df1d460baa13e0&t=1585704012',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "纯四度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/4.m4a?sign=0a92c2b6effd0beef69654747d28c548&t=1585704981',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "增四度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B4.m4a?sign=64a2ae65116100020a3fc3e4f7aab0c8&t=1585705373',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "纯五度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/5.m4a?sign=f12ebc53c99e0ded0a86d1a3ae8b8cba&t=1585706094',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "小六度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-6.m4a?sign=c68b0a636bc49789a78e6907b86a301a&t=1585708152',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "大六度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B6.m4a?sign=3be8462cad73e478c6e5248a434c0e41&t=1585709258',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "小七度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-7.m4a?sign=da2ae12988f8ad6a64e36e6b0f763006&t=1585709742',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "大七度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B7.m4a?sign=5da18a974f9423d668521a9467bc705c&t=1585710629',
          ifplay: false,
          innerAudioContext: null
        }
      },
      {
        ifShoucang: false,
        text: "纯八度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/8.m4a?sign=ea3c50c120592a9ed105892d8acd7f27&t=1585710643',
          ifplay: false,
          innerAudioContext: null
        }
      },
    ],
    
  },

  onLoad: function (options) {
    let searchShow = JSON.parse(options.data);
    let that = this
    that.setData({
      searchShow: searchShow
    })
    console.log(searchShow)
  },

  switchNav: function (e) {
    var page = this;
    var id = e.target.id;
    if (this.data.currentTab == id) {
      return false;
    }
    else {
      page.setData({
        currentTab: id
      });
    }
    page.setData({
      flag: id
    });
  },
  catchTouchMove: function (res) {
    return false
  },

  onLoad: function () {
    console.log('onLoad test');
    let that = this;
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          scrollheight: res.windowHeight,
          scrollwidth: res.windowWidth
        });
      }
    })
    console.log(this.data.scrollheight)
    let innerAudioContext = wx.createInnerAudioContext();
    let i = 0;
    // for (i = 0; i < 5; i++) {
    //   this.setData({
    //     'content[i].music.innerAudioContext': innerAudioContext,
    //   })
    // }
    this.setData({
      'content[0].music.innerAudioContext': innerAudioContext,
      'content[1].music.innerAudioContext': innerAudioContext,
      'content[2].music.innerAudioContext': innerAudioContext,
      'content[3].music.innerAudioContext': innerAudioContext,
      'content[4].music.innerAudioContext': innerAudioContext,
      'content[5].music.innerAudioContext': innerAudioContext,
      'content[6].music.innerAudioContext': innerAudioContext,
      'content[7].music.innerAudioContext': innerAudioContext,
      'content[8].music.innerAudioContext': innerAudioContext,
      'content[9].music.innerAudioContext': innerAudioContext,
      'content[10].music.innerAudioContext': innerAudioContext,
      'content[11].music.innerAudioContext': innerAudioContext,
      'content[12].music.innerAudioContext': innerAudioContext,
    })
    innerAudioContext.loop = false
    innerAudioContext.onPlay(() => {//监听播放事件
      console.log('played')
    })
    innerAudioContext.onStop(() => {//监听停止事件
      console.log('paused')
    })
    innerAudioContext.onPause(() => {//监听暂停事件
      console.log('stopped')
    })
  },
  playMusic0:function(){
    var ifplay = this.data.content[0].music.ifplay;
    var innerAudioContext = this.data.content[0].music.innerAudioContext;
    if(!ifplay){
      innerAudioContext.src = this.data.content[0].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0].music.ifplay':false,
        })
      })
    }
    else{
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0].music.ifplay': false
      })
    }
},
  switch0Change: function (e) {
    console.log('switch0 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[0].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic1: function () {
    var ifplay = this.data.content[1].music.ifplay;
    var innerAudioContext = this.data.content[1].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[1].music.src;
      innerAudioContext.play();
      this.setData({
        'content[1].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[1].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[1].music.ifplay': false
      })
    }
  },
  switch1Change: function (e) {
    console.log('switch1 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[1].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic2: function () {
    var ifplay = this.data.content[2].music.ifplay;
    var innerAudioContext = this.data.content[2].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[2].music.src;
      innerAudioContext.play();
      this.setData({
        'content[2].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[2].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[2].music.ifplay': false
      })
    }
  },
  switch2Change: function (e) {
    console.log('switch2 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[2].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic3: function () {
    var ifplay = this.data.content[3].music.ifplay;
    var innerAudioContext = this.data.content[3].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[3].music.src;
      innerAudioContext.play();
      this.setData({
        'content[3].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[3].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[3].music.ifplay': false
      })
    }
  },
  switch3Change: function (e) {
    console.log('switch3 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[3].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic4: function () {
    var ifplay = this.data.content[4].music.ifplay;
    var innerAudioContext = this.data.content[4].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[4].music.src;
      innerAudioContext.play();
      this.setData({
        'content[4].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[4].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[4].music.ifplay': false
      })
    }
  },
  switch4Change: function (e) {
    console.log('switch4 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[4].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic5: function () {
    var ifplay = this.data.content[5].music.ifplay;
    var innerAudioContext = this.data.content[5].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[5].music.src;
      innerAudioContext.play();
      this.setData({
        'content[5].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[5].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[5].music.ifplay': false
      })
    }
  },
  switch5Change: function (e) {
    console.log('switch5 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[5].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic6: function () {
    var ifplay = this.data.content[6].music.ifplay;
    var innerAudioContext = this.data.content[6].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[6].music.src;
      innerAudioContext.play();
      this.setData({
        'content[6].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[6].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[6].music.ifplay': false
      })
    }
  },
  switch6Change: function (e) {
    console.log('switch6 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[6].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic7: function () {
    var ifplay = this.data.content[7].music.ifplay;
    var innerAudioContext = this.data.content[7].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[7].music.src;
      innerAudioContext.play();
      this.setData({
        'content[7].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[7].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[7].music.ifplay': false
      })
    }
  },
  switch7Change: function (e) {
    console.log('switch7 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[7].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic7: function () {
    var ifplay = this.data.content[7].music.ifplay;
    var innerAudioContext = this.data.content[7].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[7].music.src;
      innerAudioContext.play();
      this.setData({
        'content[7].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[7].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[7].music.ifplay': false
      })
    }
  },
  switch7Change: function (e) {
    console.log('switch7 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[7].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic8: function () {
    var ifplay = this.data.content[8].music.ifplay;
    var innerAudioContext = this.data.content[8].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[8].music.src;
      innerAudioContext.play();
      this.setData({
        'content[8].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[8].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[8].music.ifplay': false
      })
    }
  },
  switch8Change: function (e) {
    console.log('switch8 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[8].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic9: function () {
    var ifplay = this.data.content[9].music.ifplay;
    var innerAudioContext = this.data.content[9].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[9].music.src;
      innerAudioContext.play();
      this.setData({
        'content[9].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[9].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[9].music.ifplay': false
      })
    }
  },
  switch9Change: function (e) {
    console.log('switch9 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[9].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic10: function () {
    var ifplay = this.data.content[10].music.ifplay;
    var innerAudioContext = this.data.content[10].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[10].music.src;
      innerAudioContext.play();
      this.setData({
        'content[10].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[10].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[10].music.ifplay': false
      })
    }
  },
  switch10Change: function (e) {
    console.log('switch10 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[10].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic11: function () {
    var ifplay = this.data.content[11].music.ifplay;
    var innerAudioContext = this.data.content[11].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[11].music.src;
      innerAudioContext.play();
      this.setData({
        'content[11].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[11].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[11].music.ifplay': false
      })
    }
  },
  switch11Change: function (e) {
    console.log('switch11 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[11].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },
  playMusic12: function () {
    var ifplay = this.data.content[12].music.ifplay;
    var innerAudioContext = this.data.content[12].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[12].music.src;
      innerAudioContext.play();
      this.setData({
        'content[12].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[12].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[12].music.ifplay': false
      })
    }
  },
  switch12Change: function (e) {
    console.log('switch12 发生 change 事件，携带值为', e.detail.value);
    var innerAudioContext = this.data.content[12].music.innerAudioContext;
    if (!innerAudioContext.loop) {
      innerAudioContext.loop = true;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
    else {
      innerAudioContext.loop = false;
      this.setData({
        innerAudioContext: innerAudioContext
      })
    }
  },

  btnShoucang0:function(){
    console.log(this.data.content[0].ifShoucang);
    let that = this;
    if (this.data.content[0].ifShoucang){
      that.setData({
        'content[0].ifShoucang':false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else{
      that.setData({
        'content[0].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang1: function () {
    console.log(this.data.content[1].ifShoucang);
    let that = this;
    if (this.data.content[1].ifShoucang) {
      that.setData({
        'content[1].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[1].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang2: function () {
    console.log(this.data.content[2].ifShoucang);
    let that = this;
    if (this.data.content[2].ifShoucang) {
      that.setData({
        'content[2].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[2].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  }, 
  btnShoucang3: function () {
    console.log(this.data.content[3].ifShoucang);
    let that = this;
    if (this.data.content[3].ifShoucang) {
      that.setData({
        'content[3].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[3].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang4: function () {
    console.log(this.data.content[4].ifShoucang);
    let that = this;
    if (this.data.content[4].ifShoucang) {
      that.setData({
        'content[4].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[4].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang5: function () {
    console.log(this.data.content[5].ifShoucang);
    let that = this;
    if (this.data.content[5].ifShoucang) {
      that.setData({
        'content[5].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[5].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang6: function () {
    console.log(this.data.content[6].ifShoucang);
    let that = this;
    if (this.data.content[6].ifShoucang) {
      that.setData({
        'content[6].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[6].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang7: function () {
    console.log(this.data.content[7].ifShoucang);
    let that = this;
    if (this.data.content[7].ifShoucang) {
      that.setData({
        'content[7].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[7].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang8: function () {
    console.log(this.data.content[8].ifShoucang);
    let that = this;
    if (this.data.content[8].ifShoucang) {
      that.setData({
        'content[8].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[8].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang9: function () {
    console.log(this.data.content[9].ifShoucang);
    let that = this;
    if (this.data.content[9].ifShoucang) {
      that.setData({
        'content[9].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[9].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang10: function () {
    console.log(this.data.content[10].ifShoucang);
    let that = this;
    if (this.data.content[10].ifShoucang) {
      that.setData({
        'content[10].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[10].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang11: function () {
    console.log(this.data.content[11].ifShoucang);
    let that = this;
    if (this.data.content[11].ifShoucang) {
      that.setData({
        'content[11].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[11].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  btnShoucang12: function () {
    console.log(this.data.content[12].ifShoucang);
    let that = this;
    if (this.data.content[12].ifShoucang) {
      that.setData({
        'content[12].ifShoucang': false
      })
      wx.showToast({
        title: '已取消收藏',
        icon: 'none'
      })
    }
    else {
      that.setData({
        'content[12].ifShoucang': true
      })
      wx.showToast({
        title: '收藏成功',
        icon: 'sucess'
      })
    }
  },
  
  })
  
