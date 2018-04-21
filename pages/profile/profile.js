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