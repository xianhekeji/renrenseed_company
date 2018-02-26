//index.js
//获取应用实例
const app = getApp()
var login_url = app.globalData.constUrl + "wxCompanyApi/login.php";
var Util = require('../../utils/util.js');
var companyUser;
var Login = function (that) {
  // console.log('code=' + code + '&encryptedData=' + encryptedData + '&iv=' + iv);
  //创建一个dialog
  wx.showToast({
    title: '正在登录...',
    icon: 'loading',
    duration: 10000
  });
  //请求服务器
  wx.request({
    url: login_url,
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: Util.json2Form({
      userName: that.data.userName,
      userPass: that.data.userPwd
    }),
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    success: function (res) {
      console.log(res);
      wx.hideToast();
      try {
        wx.setStorageSync('companyUser', res.data.detail)
      } catch (e) {
        wx.showToast({
          title: '用户信息存储失败',
        })
      }
      if (res.data.detail.user.resultNote == "登录成功") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }
      wx.showToast({
        title: res.data.detail.user.resultNote
      })
      // success
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
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userName: '',
    userPwd: ""
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },//获取用户输入的用户名
  userNameInput: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  passWdInput: function (e) {
    this.setData({
      userPwd: e.detail.value
    })
  },
  onLoad: function () {
    try {
      companyUser = wx.getStorageSync('companyUser')
      console.log(companyUser)
      this.setData({
        userName: companyUser.user.result.UserCode,
        userPwd: companyUser.user.result.UserPass,
      })
    } catch (e) {
      // Do something when catch error
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  //获取用户输入的密码
  loginBtnClick: function (e) {
    console.log("用户名：" + this.data.userName + " 密码：" + this.data.userPwd);
    Login(this);
  }
})
