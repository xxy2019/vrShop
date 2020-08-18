// pages/myCenter/myCenter.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"" 
  },
  formSubmit:function(e){
    var _this=this
    var user=e.detail.value
    console.log(user)
    var app=getApp()
    this.personLogin(user).then((res)=>{
      if(res== "登录为空"){
        wx.showToast({
          title: '账号或密码错误！！！',
          icon: "none",
          duration: 2000
        })
      } else if (JSON.stringify(res).length==11){
        app.globalData.phone = res
        app.globalData.userStatus = "login"
        app.globalData.seller = user.seller
        wx.switchTab({
          url: '../express/express',
        })
      }
    })
  },
  personLogin: function (e) {
    var msg=JSON.stringify(e)
    console.log(typeof msg)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var app = getApp();     // 取得全局App
    console.log(app.globalData.userStatus)
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