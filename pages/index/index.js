// pages/myCenter/myCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide:false,
    value:"" 
  },
  formSubmit:function(e){
    var _this=this
    var user=e.detail.value
    var app=getApp()
    this.personLogin(user).then((res)=>{
      if (res !="登录为空"){
        app.globalData.phone = res
        app.globalData.userStatus = "login"
        app.globalData.seller = user.seller
        _this.setData({
          value: ""
        })
        _this.onLoad()
      }
    })
  },
  personLogin: function (e) {
    var msg=JSON.stringify(e)
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8028/seller/login',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        data: {
          msg: msg
        },
        success: function (res) {
          resolve(res.data)
        },
        fail: function (res) {
          console.log("登录失败")
          console.log(res)
        }
      })
    })
  },
  register:function(){
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var app = getApp();     // 取得全局App
    console.log(app.globalData.userStatus)
    if (app.globalData.userStatus == "notLogin") {
      _this.setData({
        "isHide": false
      })
    } else {
      _this.setData({
        "isHide": true
      })
    }
    console.log(this.data.isHide)
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
    this.onLoad()
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