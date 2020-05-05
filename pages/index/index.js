var app = getApp()
Page({
  data: {
    userInfo: {},
    scrollheight: 0,
    scrollwidth: 0,
    addflag: true,  //判断是否显示搜索框右侧部分
    addimg: '../../images/activity_add.png',
    searchstr: '',

    flag: 0,
    currentTab: 0,
    // play: [],
    innerAudioContext: null,
    content: [[
      {
        ifShoucang: false,
        text: "小二度",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/-2.m4a?sign=234001d1bffa4599f4a8515eeed9f0a9&t=1585793399',
          ifplay: false,
        },
        intro: "小二度",
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
      {
        ifShoucang: false,
        text: "自然小调",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E8%87%AA%E7%84%B6%E5%B0%8F%E8%B0%83.m4a?sign=7e33458f0d2ebd0cae0ca20f29c1819d&t=1588385199',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "和声小调",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%92%8C%E5%A3%B0%E5%B0%8F%E8%B0%83.m4a?sign=fe0dbc6d16a27b8ac7607da31e656c8c&t=1588418015',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "旋律小调",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E6%97%8B%E5%BE%8B%E5%B0%8F%E8%B0%83.m4a?sign=5ae5efbe5ae58374350bd01e463efc92&t=1588418123',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "雅乐",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/yayue.m4a?sign=4eb2a7955866a31fb4be1728d7d6e05c&t=1588418552',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "燕乐",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E7%87%95%E4%B9%90.m4a?sign=a06273bde97c5521725a7ca764cb6b16&t=1588418644',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "多利亚调式",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%9A%E5%88%A9%E4%BA%9A%E8%B0%83%E5%BC%8F.m4a?sign=e2558041f631dbcb46cadcbbeb2dc8e1&t=1588419035',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "弗里几亚调式",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%BC%97%E9%87%8C%E5%87%A0%E4%BA%9A%E8%B0%83%E5%BC%8F.m4a?sign=9a9332693c04c170c201ec94cbb734aa&t=1588419220',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "洛克利亚调式",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E6%B4%9B%E5%85%8B%E5%88%A9%E4%BA%9A%E8%B0%83%E5%BC%8F.m4a?sign=0d29342af4fb7c27e94c41b79e7aa81a&t=1588419323',
          ifplay: false,
        },
        intro: "",
      },
    ],
    [
      {
        ifShoucang: false,
        text: "大三和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A7%E4%B8%89%E5%92%8C%E5%BC%A6.m4a?sign=2d7720ed698bd7fa1cd5532ac60f1b9a&t=1588419443',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小三和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%B0%8F%E4%B8%89%E5%92%8C%E5%BC%A6.m4a?sign=70f41556372f5ca34079f370a1c96920&t=1588419583',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "增三和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A2%9E%E4%B8%89%E5%92%8C%E5%BC%A6.m4a?sign=eec9167284d83f013abbeb70153e3dee&t=1588419662',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "减三和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%87%8F%E4%B8%89%E5%92%8C%E5%BC%A6.m4a?sign=28aca317de26eda2bd6d22df6ce95027&t=1588419740',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大6和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A76.m4a?sign=9eddeeddd28702941467bc5655e49fa9&t=1588419853',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小6和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%B0%8F6.m4a?sign=4f815b55cba17f164ce87be893c1630c&t=1588419932',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "减6和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%87%8F6.m4a?sign=637e9f8b2e44802b82a35d62a243f8bb&t=1588420041',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大46和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A746.m4a?sign=1523c0da23697b5327bc7fe4e28f51f5&t=1588420139',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小46和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%B0%8F46.m4a?sign=50169af4a4a1662f3a34af231255f185&t=1588420234',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "减46和弦",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%87%8F46.m4a?sign=f967937a2f712838ff85a2824d79d9d5&t=1588420355',
          ifplay: false,
        },
        intro: "",
      },
    ],
    [
      {
        ifShoucang: false,
        text: "大小七和弦（属七和弦）",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A7%E5%B0%8F%E4%B8%83.m4a?sign=e53e3a123df05fd21eab1c6512d1b6da&t=1588420961',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "大大七和弦（大七和弦）",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%A4%A7%E5%A4%A7%E4%B8%83.m4a?sign=e3f32ff6197d97101c75b80d0ca773ca&t=1588421089',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "小小七和弦（小七和弦）",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%B0%8F%E5%B0%8F%E4%B8%83.m4a?sign=181518d678fa19c889f0ee6bb27575d0&t=1588421292',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "减小七和弦（半减七和弦）",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%87%8F%E5%B0%8F72.m4a?sign=a076d12c75003aabdee851ab83a036c2&t=1588421608',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "减减七和弦（减七和弦）",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%87%8F%E5%B0%8F7.m4a?sign=361346b0939a8a6945429d825fe4a033&t=1588421427',
          ifplay: false,
        },
        intro: "",
      },
    ],
    [
      {
        ifShoucang: false,
        text: "全音符",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%85%A8%E9%9F%B3%E7%AC%A6.m4a?sign=5720e183f8ce18d053d96826ccce281b&t=1588382003',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "二分音符",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E4%BA%8C%E5%88%86%E9%9F%B3%E7%AC%A6.m4a?sign=eb28ca629ac22fc3c1aa260d8c0c169f&t=1588382509',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "四分音符",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%9B%9B%E5%88%86%E9%9F%B3%E7%AC%A6.m4a?sign=1466bfe357e5919358a8cd54127816cb&t=1588382667',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "八分音符",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%85%AB%E5%88%86%E9%9F%B3%E7%AC%A6.m4a?sign=2cbfee1e1f4d5ee5408e3a621d647d28&t=1588383403',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "十六分音符",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%8D%81%E5%85%AD%E5%88%86%E9%9F%B3%E7%AC%A6.m4a?sign=062d43ef111a3f6d51bf17d8179f0514&t=1588383508',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "附点",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E9%99%84%E7%82%B9.m4a?sign=de3ff99b64382263eeceb609445c5425&t=1588383698',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "三连音",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E4%B8%89%E8%BF%9E%E9%9F%B3.m4a?sign=9fd1bce1f613d55946386af932e598b0&t=1588383920',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "全休止",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%85%A8%E4%BC%91%E6%AD%A2.m4a?sign=e5afb3541f7bd6c3b08c6e480978f803&t=1588384073',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "二分休止",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E4%BA%8C%E5%88%86%E4%BC%91%E6%AD%A2.m4a?sign=ca25e050232c1d83eb3e9c19df3676d1&t=1588384203',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "四分休止",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%9B%9B%E5%88%86%E4%BC%91%E6%AD%A2.m4a?sign=3392b6d07fe87dec2d3d6a254192714a&t=1588384613',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "八分休止",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%85%AB%E5%88%86%E4%BC%91%E6%AD%A2.m4a?sign=e753fe72286263fd23ddd034beaea57e&t=1588384704',
          ifplay: false,
        },
        intro: "",
      },
      {
        ifShoucang: false,
        text: "十六分休止",
        music: {
          src: 'https://6a77-jwx-q7azx-1301736219.tcb.qcloud.la/%E5%8D%81%E5%85%AD%E5%88%86%E4%BC%91%E6%AD%A2.m4a?sign=fda3c9d92d4827630dc769ea8e610d77&t=1588384809',
          ifplay: false,
        },
        intro: "",
      },
    ],

    ],

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
    this.setData({
      innerAudioContext: innerAudioContext
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
    var pidi = parseInt(e.currentTarget.dataset.pidi)
    var pidj = parseInt(e.currentTarget.dataset.pidj)
    console.log(pidi)
    console.log(pidj)
    var ifplay = this.data.content[pidi][pidj].music.ifplay;
    var innerAudioContext = this.data.innerAudioContext;
    var content = this.data.content
    if (!ifplay) {
      innerAudioContext.src = this.data.content[pidi][pidj].music.src;
      innerAudioContext.play();
      content[pidi][pidj].music.ifplay = true
      this.setData({
        content: content
      })
      innerAudioContext.onEnded((res) => {
        console.log('播放结束!');
        content[pidi][pidj].music.ifplay = false
        this.setData({
          content: content
        })
      })
    }
    else {
      console.log('播放结束!');
      innerAudioContext.pause();
      content[pidi][pidj].music.ifplay = false
      this.setData({
        content: content
      })
    }
  },

})

