// pages/appreciation/appreciation.js
const { Tab, extend } = require('../../dist/index');
Page(extend({}, Tab,{

  /**
   * 页面的初始数据
   */
  data: {
    navTab: {
      list: [{
        id: 'latest',
        title: '最新'
      }, {
        id: 'zan',
        title: '点赞数'
      }, {
        id: 'comment',
        title: '评论数'
      }],
      selectedId: 'latest',
      scroll: true,
      height: 45,
    },
   // autoplay: true,
   // interval: 5000,
   // duration: 1000,
    posts: [],
    page: 0,
    loading: false,
    nodata: false,
    nomore: false,
    scrollTop: 0,
    lowerComplete: true,
    defaultImageUrl: getApp().globalData.defaultImageUrl + getApp().globalData.imageStyle200To200
  },
  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    this.setData({
      page: 0,
      nomore: false,
      nodata: false,
      scrollTop: 0,
      [`${componentId}.selectedId`]: selectedId
    });
    this.getData(0);
  },
  getData: function (index) {
    let that = this;
    let page = that.data.page;
    let selectId = that.data.navTab.selectedId;
    let filter = '';
    switch (selectId) {
      case 'hot':
        filter = "featured:true";
        break;
      case 'java':
        filter = "tags:['java']";
        break;
      case 'net':
        filter = "tags:['c']";
        break;
      case 'python':
        filter = "tags:['python']";
        break;
      case 'python':
        filter = "tags:['python']";
        break;
      case 'other':
        filter = "page:false";
        break;
      default:
        filter = 'page:false';
    }
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
}));