//index.js
//获取应用实例
const app = getApp()
var QQMapWX = require('./lib/qqmap-wx-jssdk.js');
var qqmapsdk;
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    ditu:'1111',
    toView:'red',
    scrollTop:'100',
    show:'',
    video1:'http://baobab.kaiyanapp.com/api/v1/playUrl?vid=129309&resourceType=video&editionType=default&source=aliyun'
  ,
    icon1:'http://7xi8d6.com1.z0.glb.clouddn.com/20171109095254_dOw5qh_bluenamchu_9_11_2017_9_52_47_256.jpeg'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    qqmapsdk = new QQMapWX({
      key: 'RWLBZ-ODTW2-2FIUM-C7C44-U7PV7-F7FE4'
    });
   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onshow:function(){
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: function (res) {
        console.log(res)
       },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  openditu:function(){
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function(res) {
        wx.openLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          scale:18,
          success:function(){
            wx.chooseLocation({
              success: function(res) {},
            })
          }
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onshow1: function () {
    // 调用接口

    qqmapsdk.search({
      keyword: '酒店',
      success: function (res) {
        console.log(res);
        console.log(11111)
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        console.log(res);
      }
    });


  },
  click:function(){
    var that =this;
    var show;
    wx.scanCode({
      success:(res) => {
        this.show = "--result:" + res.result + "--scanType:" + res.scanType + "--charSet:" + res.charSet + "--path:" + res.path;
        that.setData({
          show:this.show
        })
        wx.showToast({
          title: '成功',
          icon:"success",
          duration:2000
        })
      }
    })
  },
  chooseIcon:function(){
    var _this = this
    wx.chooseImage({
      success: function(res) {
        console.log(res.tempFilePaths)
        _this.setData({
          icon1:res.tempFilePaths
        })
      },
    })
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  changeMV1:function(){
    var videoContext = wx.createVideoContext("video1")
    this.setData({
      video1:"http://baobab.kaiyanapp.com/api/v1/playUrl?vid=28688&resourceType=video&editionType=default&source=aliyun"
    })
    console.log(videoContext)
    videoContext.play()
  },
  changeMV2: function () {
    var videoContext = wx.createVideoContext("video1")
    this.setData({
      video1: "http://baobab.kaiyanapp.com/api/v1/playUrl?vid=129069&resourceType=video&editionType=default&source=aliyun"
    })
    console.log(videoContext)
    videoContext.play()
  },
  changeMV3: function () {
    var videoContext = wx.createVideoContext("video1")
    this.setData({
      video1: "      http://ali.cdn.kaiyanapp.com/40438cdc802d3ac93e61ff5a443bc960_1280x720.mp4?auth_key=1538212671-0-0-30edceec9c83ddc38e3c62528afddada"
// http://baobab.kaiyanapp.com/api/v1/playUrl?vid=129309&resourceType=video&editionType=default&source=aliyun
    })
    console.log(videoContext)
    videoContext.play()
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },
  takePhoto() {
    console.log(11111)
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        console.log(this.data.src)
      }
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
