App({
  ///////////////////////////////////////////////////////////////////////////////////////////
  // 获取用户信息接口
  getUserInfo: function(cb){
    wx.getSetting({
      success: (res)=>{
        if (res.authSetting['scope.userInfo']){
          // 已经授权
          console.log("已经授权");
        }else{
          // 未授权
          console.log("未授权");
          wx.authorize({
            scope: 'scope.userInfo',
            success: (res)=>{
              // 授权成功
              console.log("授权成功");
            },
            fail: (error)=>{
              // 授权失败
              console.log("授权失败");
              typeof cb == "function" && cb("auth fail");
            }
          })
        }
      },
      fail: (error)=>{
        console.log(`wx.getSetting error:${error}`);
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // login接口，发送 res.code 到后台换取 openId, sessionKey, unionId
  login: function () {
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

  ///////////////////////////////////////////////////////////////////////////////////////////
  // 用户登录
  userLogin: function (cb) {
    wx.checkSession({
      success: () => {
        // 登录态未过期
      },
      fail: () => {
        // 登录态已过期
        this.login(); //login接口调用
        this.getUserInfo(cb); // 授权并getUserInfo接口调用
      }
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
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
