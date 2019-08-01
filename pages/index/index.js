//index.js
//获取应用实例
const app = getApp()
const config = require('../../utils/constconfig');

const tokenKey = config.TOKENKEY;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  chooseImage: function () {
    var that = this;
    wx.chooseImage(
      {
        count: 1,
        // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (e) {
          console.log(e.tempFilePaths[0])
          that.setData({
            imageSrc: e.tempFilePaths[0]
          })
          wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 2000
          });
          wx.uploadFile({
            url: config.apiBaseUrl + 'getBaseCode',
            filePath: e.tempFilePaths[0],
            name: 'file',
            header:{
              'Content-Type': 'multipart/form-data',
              'Authorization': wx.getStorageSync("access_token"),  //如果需要token的话要传
            },
            success: function (res) {

              console.log(res, "=================================")
              var code = JSON.parse(res.data)
              //console.log(code.data, "=================================")
            },
            fail: function (res) { },
            complete: function (res) { },
          })

        }
      }
    )
  }
})
