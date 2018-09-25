Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //事件处理函数
  bindViewTap: function () {
    wx.addCard({
      cardList: [{
        cardId: 'pMBhJ0g_felGMMBBDwrgDhx0FjyQ',
        cardExt: '{"timestamp": "1530088010", "signature":"691adc8c5c6891e3b30d7e6a3e2c8939c8211d4c", "nonce_str":"zjj15202185066"}'
      }],
      success: function (res) {
        console.log(res.cardList) // 卡券添加结果
      }
    })
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