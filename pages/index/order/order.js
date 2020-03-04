// pages/index/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },
  searchWait: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8028/orders/get/wait',
        method: "GET",
        data: {
          seller: e
        },
        header: {
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
  update: function (e) {
    var _this = this;
    // 允许从相机和相册扫码
    var pack = e.currentTarget.dataset.pack
    wx.scanCode({
      success: (res) => {
        //var msg = res.result
        var msg ="YT4376115029767"
        console.log(msg)
        var type = msg.replace(/\d+$/gi, "")
        var no = msg.replace(/^[a-z|A-Z]+/gi, "")
        var app=getApp()
        console.log(type + " " + no)
        var msg = JSON.stringify({
          type: type,
          packid: no,
          seller:pack.seller,
          time:pack.time,
          sphone:app.globalData.phone
        });
        wx.request({
          url: 'http://47.104.191.228:8028/orders/update',
          method: "GET",
          dataType: "json",
          data: {
            msg: msg
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          success: function (res) {
            console.log(res)
            if (res.data.msg =="更新成功"){
              wx.showToast({
                title: '货物信息更新成功',
                icon:"none",
                duration:2000
              })
              _this.onLoad()
            }else{
              wx.showToast({
                title: '更新失败',
                icon:"none",
                duration:2000
              })
            }
          },
          fail: function (res) {
            console.log("更新失败")
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var app = getApp();
    this.searchWait(app.globalData.seller).then((res) => {
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