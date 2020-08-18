// pages/index/express/express.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    showModal:false,
    value:"",
    number:0,
    no:0,
    inputShowed: false,
    inputVal: ""
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  searchByName: function (e) {
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/search/word',
        method: "GET",
        data:{
          name:e
        },
        header:{
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log("更新" + res.data.msg)
        }
      })
    })
  },
  searchInput: function () {
    var _this = this
    var inputVal = this.data.inputVal
    console.log(inputVal)
    this.searchByName(inputVal).then((res) => {
      console.log(res.msg)
      _this.setData({
        "list": res.msg
      })
      
    })
  },
  btn:function (e) {
    var _this=this
    console.log(e)
    if(e.currentTarget.dataset.number==1){
      _this.setData({
        showModal:true,
        value:e.currentTarget.dataset.good.name,
        number:e.currentTarget.dataset.number,
        no:e.currentTarget.dataset.good.no
      })
    }else if(e.currentTarget.dataset.number==2){
      _this.setData({
        showModal:true,
        value:e.currentTarget.dataset.good.inventory,
        number:e.currentTarget.dataset.number,
        no:e.currentTarget.dataset.good.no
      })
    }else if(e.currentTarget.dataset.number==3){
      _this.setData({
        showModal:true,
        value:e.currentTarget.dataset.good.price,
        number:e.currentTarget.dataset.number,
        no:e.currentTarget.dataset.good.no
      })
    }else if(e.currentTarget.dataset.number==4){
      _this.setData({
        showModal:true,
        value:e.currentTarget.dataset.good.detail,
        number:e.currentTarget.dataset.number,
        no:e.currentTarget.dataset.good.no
      })
    }
  },
  changeValue:function(e){
    console.log(e)
    this.setData({
      value:e.detail.value
    })
  },
  // 禁止屏幕滚动
  preventTouchMove:function () {
  },
  // 弹出层里面的弹窗
  cancel:function () {
    this.setData({
      showModal:false
    })
  },
  ok:function () {
    var _this=this
    var number=this.data.number
    var good={
      no:_this.data.no,
      value:_this.data.value
    }
    if(number==1){
      _this.changeName(good)
    }else if(number==2){
      _this.changeCount(good)
    }else if(number==3){
      _this.changePrice(good)
    }else if(number==4){
      _this.changeDetail(good)
    }
    this.setData({
      showModal:false
    })
  },
  changeName:function(e){
    var _this=this
    console.log(e.value)
    wx.request({
      url: 'http://39.106.169.28:8028/shop/updateName',
      method: "POST",
      header:{
        "Content-Type": "application/json"
      },
      data:JSON.stringify({
        no:e.no,
        name:e.value
      }),
      success: function (res) {
        console.log(res)
        _this.onLoad()
      },
      fail: function (res) {
        console.log("更新" + res.data.msg)
      }
    })
  },
  changeCount:function(e){
    var _this=this
    console.log(e)
    wx.request({
      url: 'http://39.106.169.28:8028/shop/updateInventory',
      method: "POST",
      header:{
        "Content-Type": "application/json"
      },
      data:JSON.stringify({
        no:e.no,
        inventory:e.value
      }),
      success: function (res) {
        console.log(res)
        _this.onLoad()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  changePrice:function(e){
    var _this=this
    wx.request({
      url: 'http://39.106.169.28:8028/shop/updatePrice',
      method: "POST",
      header:{
        "Content-Type": "application/json"
      },
      data:JSON.stringify({
        no:e.no,
        price:e.value
      }),
      success: function (res) {
        console.log(res)
        _this.onLoad()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  changeDetail:function(e){
    var _this=this
    wx.request({
      url: 'http://39.106.169.28:8028/shop/updateDetail',
      method: "POST",
      header:{
        "Content-Type": "application/json"
      },
      data:JSON.stringify({
        no:e.no,
        detail:e.value
      }),
      success: function (res) {
        console.log(res)
        _this.onLoad()
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  changePhoto:function(e){
    var _this=this
    console.log(e.no)
    wx.uploadFile({
      url: 'http://39.106.169.28:8028/shop/updatePhoto', //仅为示例，非真实的接口地址
      filePath: e.photo,
      name: "file",
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        "no": e.no
      },
      success: function (res) {
        console.log(res)
        _this.onLoad()
        //do something
      }
    }) 
  },
  searchAll: function () { 
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://39.106.169.28:8028/shop/findAll',
        method: "POST",
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
  changeImg: function (e) {
    var _this=this
    console.log(e)
    wx.chooseImage({
      count:1,
      success: function (res) {
        var img ={
          photo:res.tempFilePaths[0],
          no:e.currentTarget.dataset.no
        } 
        console.log(img)
        _this.changePhoto(img) 
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    this.searchAll().then((res) => {
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
    this.onLoad()
    this.hideInput() 
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