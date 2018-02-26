// pages/commodityinfo/commodityinfo.js
const app = getApp()
var url = app.globalData.constUrl + "wxCompanyApi/getCommodityById.php";
var Util = require('../../utils/util.js');
var getCommodityInfo = function (that) {

  wx.showToast({
    title: '正在获取...',
    icon: 'loading',
    duration: 10000
  });
  //请求服务器
  wx.request({
    url: url,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: Util.json2Form({
      id: that.data.id,
    }),
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      console.log(res.data.detail);
      that.setData({
        info: res.data.detail
      })
      wx.hideToast();
    },
    fail: function () {
      // fail
      // wx.hideToast();
    },
    complete: function () {
      // complete
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    getCommodityInfo(this)
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