
var config = require('../config.js');
var apiHost = config.APIBASEURL;
var tokenKey = "token";
// 登录地址, 根据这个地址来设置token
var logInUrl = "api/User/Login";

/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function getRequestWithAuth(url, data, success, fail) {
  CreateHeader(url, function (header) {
    wx.request({
      url: apiHost + url,
      method: 'GET',
      data: data,
      header: header,
      success: function (res) {
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}
/** 
 * @param url:String  require(必需) 请求地址相对路径
 * @param data:Object   可选  请求数据
 * @param success:Function  可选   成功回调函数
 * @param fail:Function     可选    失败回调函数
 */
function postRequestWithAuth(url, data, success, fail) {
  CreateHeader(url, function (header) {
    wx.request({
      url: apiHost + url,
      method: 'POST',
      data: data,
      header: header,
      success: function (res) {
        if (success && typeof success === "function") {
          success(res);
        }
      },
      fail: function (error) {
        if (fail && typeof fail === "function") {
          fail(error);
        } else {
          console.log(error);
        }
      }
    })
  });
}

/** 
 * @param url:String    请求地址(根据请求地址判断是否添加token)
 * @param complete:Function 回调函数
 */
function CreateHeader(url, complete) {
  var header = {
    'content-type': 'application/json'
  }
   wx.getStorage({
      key: tokenKey,
      success: function (res) {
        header.Authorization = 'Bearer ' + res.data;
      },
      fail: function (error) {
        console.log(error);
        wx.navigateTo({
          url: '/pages/login/login',
        });
      },
      complete: function () {
        complete && typeof complete === 'Function' ? complete(header) : null;
      }
    });
}

module.exports.getRequest = getRequest;
module.exports.postRequest = postRequest;