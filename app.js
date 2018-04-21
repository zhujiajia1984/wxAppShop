App({
  ///////////////////////////////////////////////////////////////////////////////////////////
  // 获取token（调用login接口）
  getToken: function () {
    wx.checkSession({
      success: () => {
        // 登录态未过期
        console.log("登录态未过期");
        if (!wx.getStorageSync('token')) {
          // 无法获取token，需login
          console.log("token失效，调用login");
          this.login();
        }
      },
      fail: () => {
        // 登录态已经过期，需login
        console.log("登录态已过期");
        console.log("调用login");
        this.login();
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // login接口，发送 res.code 到后台换取 openId, sessionKey, unionId
  login: function () {
    var that = this;
    wx.login({
      success: (res) => {
        if (res.code) {
          wx.request({
            url: "https://wechat.weiquaninfo.cn/wxAppLogin/token",
            method: "POST",
            header: {
              'content-type': 'application/json',
            },
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('token', res.data.token);
            },
            fail: function (error) {
              console.log(error);
            }
          })
        } else {
          console.log(`登录失败, ${res.errMsg}`);
        }
      },
      fail: (error) => {
        console.log(error);
      }
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    this.getToken();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  }
})
