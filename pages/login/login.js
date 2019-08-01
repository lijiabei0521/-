// pages/login/login.js
// const constConfig = require('../../utils/constconfig');//.apiBaseUrl;
var config = require('../../config.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    message: ""

  },
  accountInput: function (e) {
    var username = e.detail.value;//从页面获取到用户输入的用户名/邮箱/手机号
    if (username != '') {
      this.setData({ username: username });//把获取到的密码赋值给全局变量Date中的password
    }
  },
  //处理pwdBlurt的触发事件
  pwdBlur: function (e) {
    var pwd = e.detail.value;//从页面获取到用户输入的密码
    if (pwd != '') {
      this.setData({ password: pwd });//把获取到的密码赋值给全局变量Date中的password
    }
  },
  login: function (e) {
    if (this.data.username === ''){
      wx.showToast({
        title: '用户名不能为空',
      })
      return;
    }
    if (this.data.password === '') {
      wx.showToast({
        title: '密码不能为空',
      })
      return;
    }
    wx.request({
      url: config.APIBASEURL+'api/User/Login',//后面详细介绍
      //定义传到后台的数据
      data: {
        //从全局变量data中获取数据
        username: this.data.username,
        password: this.data.password,
      },
      method: 'post',//定义传到后台接受的是post方法还是get方法
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("调用API成功");
        console.log(res);
        if (res.data.message == "ok") {
          wx.showToast({
            title: '登陆成功',
          })
          var pages = getCurrentPages();
          if(pages.length>1){
            wx.navigateBack()
          }
          else{
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }
        }
        else {
          wx.showModal({
            title: '提示',
            content: '用户名或者密码错误',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log("调用API失败");
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
