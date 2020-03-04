// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
    title: "forget",
    phone: '',
    pwd:"",
    rightcode: true,
    notcode: true,
    isphone: true,
    ispwd: true,
    code: "em"
  },
  isphone: function (e) {
    console.log(e)
    var _this = this
    if (e.length != 11) {
      _this.setData({
        "isphone": false
      })
    } else {
      _this.setData({
        "isphone": true,
      })
    }
    console.log(this.data.isphone)
  },
  getPhone: function (e) {
    this.setData({
      "phone": e.detail.value
    })
  },
  getPwd: function (e) {
    this.setData({
      "pwd": e.detail.value
    })
  },
  hidden:function(){
    this.setData({
      ispwd: true
    })
  },
  codeInput: function (e) {
    var _this = this
    var inputCode = e.detail.value
    var code = this.data.code
    console.log(inputCode + " " + code)
    console.log(inputCode == code)
    if (inputCode == code) {
      _this.setData({
        "rightcode": true,
        "notcode": false
      })
      console.log(_this.data.notcode)
    } else {
      _this.setData({
        "rightcode": false,
      })
    }
  },
  getCode: function () {
    var _this = this
    if (this.data.result == null) {
      var phone = this.data.phone
    } else {
      var phone = this.data.result.phone
    }
    this.isphone(phone)
    console.log(this.data.isphone)
    if (this.data.isphone) {
      wx.request({
        url: 'http://47.104.191.228:8028/send/' + phone,
        method: "GET",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          var list = res.data.data.split(',')
          var code = list[0].slice(5)
          console.log(code)
          _this.setData({
            "code": code
          })
          console.log(_this.data.code)
        },
        fail: function (res) {
          console.log(res.data.msg)
        }
      })
    }
  },
  myTime: function () {
    var time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
    const formatNumber = n => {
      n = n.toString()
      return n[1] ? n : '0' + n
    }
    return [year, month, day].map(formatNumber).join('-')
  },
  formSubmit: function (e) {
    var _this = this
    var user = e.detail.value
    if(this.data.pwd!=user.password){
      _this.setData({
        ispwd:false
      })
    }else{
      var date=_this.myTime()
      console.log(_this.data.notcode)
      if (!_this.data.notcode) {
        var title=_this.data.title
        if(title=="register"){
          var person = JSON.stringify({
            seller: user.seller,
            phone: user.phone,
            password: user.password,
            date: date
          })
          _this.register(person).then((res) => {
            if (res.data == "注册成功") {
              var app = getApp()
              app.globalData.userStatus = "login"
              app.globalData.seller=user.seller
              app.globalData.phone = user.phone
              wx.navigateTo({
                url: '../index/index',
              })
            } else {
              wx.showToast({
                title: '该商家名称已被注册，请重新注册!',
                icon: "none",
                duration: 2000
              })
            }
          })
        }else{
          var person = JSON.stringify({
            seller: user.seller,
            phone: user.phone,
            password: user.password
          })
          _this.forget(person).then((res) => {
            console.log(res)
            if (res.data == "修改成功") {
              var app = getApp()
              app.globalData.userStatus = "login"
              app.globalData.seller = user.seller
              app.globalData.phone = user.phone
              wx.navigateTo({
                url: '../index/index',
              })
            } else {
              wx.showToast({
                title: '信息输入有误，请仔细检查!',
                icon: "none",
                duration: 2000
              })
            }
          })
        }  
      }
    }
  },
  register:function(e){
    return new Promise(function(resolve,reject){
      wx.request({
        url: 'http://47.104.191.228:8028/seller/register',
        method: "POST",
        dataType: "json",
        data: {
          msg: e
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res)
        },
        fail: function (res) {
          console.log("注册失败")
        }
      })
    })
  },
  forget: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://47.104.191.228:8028/seller/forget/pass',
        method: "POST",
        dataType: "json",
        data: {
          msg: e
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res)
        },
        fail: function (res) {
          console.log("找回密码失败")
        }
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    this.setData({
      title:options.title
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