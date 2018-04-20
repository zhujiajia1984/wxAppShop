// pages/profile/profile.js
//获取应用实例
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuthed: {
      isUserInfoAuthed: null,
    },
    userInfo: {},
    commonMenus: [{
      id: 1,
      name: "我的订单",
      src: "/assets/images/order.png"
    }, {
        id: 2,
        name: "购物车",
        src: "/assets/images/cart.png"
    }]
  },

  /////////////////////////////////////////////////////////////////////////////////
  // 点击菜单事件
  onMenuClick: function(e){
    switch(e.currentTarget.dataset.id){
      case 1:
        // 我的订单
        console.log("111");
        break;
      case 2:
        // 购物车
        console.log("222");
        break;
      default:
        break;
    }
  },

  /////////////////////////////////////////////////////////////////////////////////
  // 点击重新授权按钮事件
  getUserInfo: function (res) {
    if (res.detail.errMsg == "getUserInfo:ok") {
      wx.showNavigationBarLoading();
      app.userLogin((res) => {
        // 渲染页面
        // this.setData({ token: token });
        if (res.type == "auth fail") {
          let isAuthed = this.data.isAuthed;
          isAuthed.isUserInfoAuthed = 'fail';
          this.setData({ isAuthed: isAuthed });
        } else if (res.type == "success") {
          let isAuthed = this.data.isAuthed;
          isAuthed.isUserInfoAuthed = 'ok';
          this.setData({ isAuthed: isAuthed });
        }
        wx.hideNavigationBarLoading();
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户登录
    // wx.showNavigationBarLoading();
    // app.userLogin((res) => {
    //   // 渲染页面
    //   if (res.type == "auth fail") {
    //     // 失败页面
    //     let isAuthed = this.data.isAuthed;
    //     isAuthed.isUserInfoAuthed = 'fail';
    //     this.setData({ isAuthed: isAuthed });
    //   } else if (res.type == "success") {
    //     // 成功页面
    //     let userInfo = wx.getStorageSync('userInfo');
    //     let isAuthed = this.data.isAuthed;
    //     isAuthed.isUserInfoAuthed = 'ok';
    //     this.setData({ isAuthed: isAuthed, userInfo: userInfo});
    //   }
    //   wx.hideNavigationBarLoading();
    // });
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