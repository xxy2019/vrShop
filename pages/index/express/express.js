// pages/index/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  searchAll: function (e) { 
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8028/orders/get/all',
        method: "GET",
        data:{
          seller:e
        },
        header:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res)
        },
        fail: function (res) {
          console.log("更新" + res.data.msg)
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var app=getApp();
    this.searchAll(app.globalData.seller).then((res) => {
      console.log(res)
      _this.setData({
        "list": res.data.msg
      })
    })
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