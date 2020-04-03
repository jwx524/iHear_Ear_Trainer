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
    // play: [],
    innerAudioContext: null,
    content:[[
      {
        ifShoucang: false,
        text: "小二度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-2.m4a?sign=234001d1bffa4599f4a8515eeed9f0a9&t=1585793399',
          ifplay: false,
        },
        intro:"小二度",
      },
      {
        ifShoucang: false,
        text: "大二度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B2.m4a?sign=6cae8400e0b66fbded22118f4b719ac2&t=1585793550',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小三度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-3.m4a?sign=6982ffae29509d4f2f693427af16c12e&t=1585793738',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大三度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B3.m4a?sign=ba2ed04e24d4e8b4738db6d9ee36b6bf&t=1585793916',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "纯四度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/4.m4a?sign=09930d351bfb06edf38c1f1992c1c6b7&t=1585794044',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "增四度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B4.m4a?sign=ac8ba42ce4636787837c7305c7220346&t=1585794127',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "纯五度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/5.m4a?sign=9ad66cc94b5d44cc8ddc37d37c5de4af&t=1585794266',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小六度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-6.m4a?sign=52d75d71f176e3bb0ec01ec2365aa2e1&t=1585794391',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大六度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B6.m4a?sign=177cb1a8d72171f6c344a698aba5bd11&t=1585794503',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小七度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-7.m4a?sign=69dc1f3dfa74217723d74ce778db3202&t=1585794581',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大七度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%2B7.m4a?sign=03ff8acbad3799de5f3153ce67059939&t=1585795058',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "纯八度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/8.m4a?sign=33fdb0d696ba009dd380f37f46846d8d&t=1585795077',
          ifplay: false,
        },
        intro: "",
      },
    ],
    [
      {
        ifShoucang: false,
        text: "自然大调",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A7%E8%B0%83.m4a?sign=5f1f237904605800134297dbf0e31454&t=1585822339',
          ifplay: false,
        },
        intro: "",
      },
    ]]
  },
  onShareAppMessage: function () {
    return {
      title: '帮你练就绝对音准！',
      imageUrl: ''
    }
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
  change: function (e) {
    console.log(e.detail.current)
    this.setData({
      currentTab: e.detail.current,
      flag: e.detail.current
    })
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
    var innerAudioContext = wx.createInnerAudioContext();
    var i = 0;
    // for (i = 0; i < 12; i++) {
      
    //   this.setData({
    //     ['content[{{i}}].music.innerAudioContext'] : innerAudioContext
    //   })
    // }
    this.setData({
      'content[0][0].music.innerAudioContext': innerAudioContext,
      'content[0][1].music.innerAudioContext': innerAudioContext,
      'content[0][2].music.innerAudioContext': innerAudioContext,
      'content[0][3].music.innerAudioContext': innerAudioContext,
      'content[0][4].music.innerAudioContext': innerAudioContext,
      'content[0][5].music.innerAudioContext': innerAudioContext,
      'content[0][6].music.innerAudioContext': innerAudioContext,
      'content[0][7].music.innerAudioContext': innerAudioContext,
      'content[0][8].music.innerAudioContext': innerAudioContext,
      'content[0][9].music.innerAudioContext': innerAudioContext,
      'content[0][10].music.innerAudioContext': innerAudioContext,
      'content[0][11].music.innerAudioContext': innerAudioContext,
      'content[1][0].music.innerAudioContext': innerAudioContext,
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
  playMusic: function (e) {
    console.log(e.currentTarget)
    var pid = parseInt(e.currentTarget.dataset.pid)
    var ifplay = this.data.content[pid].music.ifplay;
    var innerAudioContext = this.data.content[pid].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[pid].music.src;
      innerAudioContext.play();
      this.setData({
        'content[pid].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[pid].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[pid].music.ifplay': false
      })
    }
  },
  playMusic00:function(e){
    console.log(e.currentTarget)
    var pid = parseInt(e.currentTarget.dataset.pid)
    var ifplay = this.data.content[0][0].music.ifplay;
    var innerAudioContext = this.data.content[0][0].music.innerAudioContext;
    if(!ifplay){
      innerAudioContext.src = this.data.content[0][0].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][0].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][0].music.ifplay':false,
        })
      })
    }
    else{
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][0].music.ifplay': false
      })
    }
},
  playMusic01: function () {
    var ifplay = this.data.content[0][1].music.ifplay;
    var innerAudioContext = this.data.content[0][1].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][1].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][1].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][1].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][1].music.ifplay': false
      })
    }
  },
  playMusic02: function () {
    var ifplay = this.data.content[0][2].music.ifplay;
    var innerAudioContext = this.data.content[0][2].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][2].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][2].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][2].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][2].music.ifplay': false
      })
    }
  },
  playMusic03: function () {
    var ifplay = this.data.content[0][3].music.ifplay;
    var innerAudioContext = this.data.content[0][3].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][3].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][3].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][3].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][3].music.ifplay': false
      })
    }
  },
  playMusic04: function () {
    var ifplay = this.data.content[0][4].music.ifplay;
    var innerAudioContext = this.data.content[0][4].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][4].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][4].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][4].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][4].music.ifplay': false
      })
    }
  },
  playMusic05: function () {
    var ifplay = this.data.content[0][5].music.ifplay;
    var innerAudioContext = this.data.content[0][5].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][5].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][5].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][5].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][5].music.ifplay': false
      })
    }
  },
  playMusic06: function () {
    var ifplay = this.data.content[0][6].music.ifplay;
    var innerAudioContext = this.data.content[0][6].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][6].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][6].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][6].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][6].music.ifplay': false
      })
    }
  },
  playMusic07: function () {
    var ifplay = this.data.content[0][7].music.ifplay;
    var innerAudioContext = this.data.content[0][7].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][7].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][7].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][7].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][7].music.ifplay': false
      })
    }
  },
  playMusic08: function () {
    var ifplay = this.data.content[0][8].music.ifplay;
    var innerAudioContext = this.data.content[0][8].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][8].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][8].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][8].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][8].music.ifplay': false
      })
    }
  },
  playMusic09: function () {
    var ifplay = this.data.content[0][9].music.ifplay;
    var innerAudioContext = this.data.content[0][9].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][9].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][9].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][9].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][9].music.ifplay': false
      })
    }
  },
  playMusic010: function () {
    var ifplay = this.data.content[0][10].music.ifplay;
    var innerAudioContext = this.data.content[0][10].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][10].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][10].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][10].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][10].music.ifplay': false
      })
    }
  },
  playMusic011: function () {
    var ifplay = this.data.content[0][11].music.ifplay;
    var innerAudioContext = this.data.content[0][11].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[0][11].music.src;
      innerAudioContext.play();
      this.setData({
        'content[0][11].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[0][11].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[0][11].music.ifplay': false
      })
    }
  },
  playMusic10: function () {
    var ifplay = this.data.content[1][0].music.ifplay;
    var innerAudioContext = this.data.content[1][0].music.innerAudioContext;
    if (!ifplay) {
      innerAudioContext.src = this.data.content[1][0].music.src;
      innerAudioContext.play();
      this.setData({
        'content[1][0].music.ifplay': true,
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        this.setData({
          'content[1][0].music.ifplay': false,
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      this.setData({
        'content[1][0].music.ifplay': false
      })
    }
  },
  
  })
  
