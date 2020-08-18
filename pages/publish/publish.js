// pages/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2016-09-01',
    img:"",
    value:""
  },
  getPhoto: function () {
    var _this=this
    wx.chooseImage({
      count:1,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          img: tempFilePaths[0]
        })
        console.log(_this.data.img)
      }
    })
  },
  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },
  formSubmit:function(e){
    console.log(e.detail.value)
    var _this=this
    var good=e.detail.value
    if(good.name==""){
      wx.showToast({
        title: '商品名称为空',
        duration:2000,
        icon:"none"
      })
    }else if(good.no==""){
      wx.showToast({
        title: '商品编号为空',
        duration:2000,
        icon:"none"
      })
    }else if(good.price==""){
      wx.showToast({
        title: '商品价格为空',
        duration:2000,
        icon:"none"
      })
    }else if(good.inventory==""){
      wx.showToast({
        title: '库存为空',
        duration:2000,
        icon:"none"
      })
    }else if(good.manufactures==""){
      wx.showToast({
        title: '生产厂家为空',
        duration:2000,
        icon:"none"
      })
    }else if(_this.data.img==""){
      wx.showToast({
        title: '商品图片为空',
        duration:2000,
        icon:"none"
      })
    }else if(good.detail==""){
      wx.showToast({
        title: '商品概述为空',
        duration:2000,
        icon:"none"
      })
    }else{
      _this.submit(good)
    }
  },
  submit:function(e){
    var _this=this
    wx.uploadFile({
      url: 'http://39.106.169.28:8028/shop/insert', //仅为示例，非真实的接口地址
      filePath: _this.data.img,
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "detail": e.detail,
        "inventory": e.inventory,
        "manufactures": e.manufactures,
        "name": e.name,
        "no": e.no,
        "price": e.price,
        "productiondate":_this.data.date
      },
      success: function (res) {
        console.log(res)
        _this.setData({
          value:"",
          img:"",
          date:"2016-09-01"
        })
        //do something
      },
      fail:function(res){
        console.log(res)
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