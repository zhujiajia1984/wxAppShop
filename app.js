App({
  ///////////////////////////////////////////////////////////////////////////////////////////
  // 获取用户信息（已经授权状态下）
  getUserInfo: function (cb) {
    let withCredentials = true;
    if (wx.getStorageSync('userInfo')) {
      // 已有则不再向服务器发送
      withCredentials = false;
    }
    wx.getUserInfo({
      withCredentials: withCredentials,
      success: (res) => {
        wx.setStorageSync('userInfo', res.userInfo);
        if (withCredentials) {
          // 服务器保存用户信息
          let token = wx.getStorageSync('token');
          wx.request({
            url: "https://wechat.weiquaninfo.cn/wxAppLogin/userInfo",
            method: "POST",
            header: {
              'content-type': 'application/json',
              'authorization': token,
            },
            data: {
              rawData: res.rawData,
              signature: res.signature,
              encryptedData: res.encryptedData,
              iv: res.iv,
            },
            success: function (res) {
              if (res.data.result_msg != "success"){
                console.log("saveUserInfo failed!");
              }
            },
            fail: function (error) {
              console.log(error);
            }
          })
        }
        // 返回
        typeof cb == "function" && cb({type: "success"});
      },
      fail: (error) => {
        console.log(`wx.getUserInof error:${error}`);
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // 获取用户授权和用户信息
  getUserAuthAndInfo: function (cb) {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权
          console.log("已经授权_用户信息");
          if (wx.getStorageSync('userInfo')){
            // 返回
            typeof cb == "function" && cb({ type: "success" });
          }else{
            this.getUserInfo(cb);
          }
        } else {
          // 未授权
          console.log("未授权_用户信息");
          wx.authorize({
            scope: 'scope.userInfo',
            success: (res) => {
              // 授权成功
              console.log("授权成功_用户信息");
              if (wx.getStorageSync('userInfo')) {
                // 返回
                typeof cb == "function" && cb({ type: "success" });
              } else {
                wx.removeStorageSync('userInfo');
                this.getUserInfo(cb);
              }
            },
            fail: (error) => {
              // 授权失败
              console.log("授权失败_用户信息");
              wx.removeStorageSync('userInfo');
              // 返回授权失败信息
              typeof cb == "function" && cb({
                type: "auth fail"
              });
            }
          })
        }
      },
      fail: (error) => {
        console.log(`wx.getSetting error:${error}`);
      }
    })
  },

  ///////////////////////////////////////////////////////////////////////////////////////////
  // login接口，发送 res.code 到后台换取 openId, sessionKey, unionId
  login: function (cb) {
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
              that.getUserAuthAndInfo(cb); // 用户授权+获取用户信息
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
        let token = wx.getStorageSync('token');
        if (token) {
          // 已有token直接获取用户数据
          this.getUserAuthAndInfo(cb); // 用户授权+获取用户信息
        } else {
          // 重新登录
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          this.login(cb);
        }
      },
      fail: () => {
        // 登录态已过期
        wx.removeStorageSync('token');
        wx.removeStorageSync('userInfo');
        this.login(cb);
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
