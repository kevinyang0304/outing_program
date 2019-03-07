// pages/imageuoload/imageuoload.js
var util = require('../../utils/utils.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: '../images/placeholder-detail.png',
    //motto1: 'Hello World',
    //motto2: 'Hello World',
    img_arr:[],
    num : 0,
    resId: '0',
    openid: 'os2Ly5LtfOJWYjCv4ItseGUp2Sec'
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

  },
  upload(e) {  
    var that = this;
    var x = 0;
    if (this.data.img_arr.length < 12) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        
        success: function (res) {
          
            var loadimg = res.tempFilePaths
         
          
          wx.cloud.init()
          for (var i = 0; i < loadimg.length; i++) {
            const _i = i
            const filePath = loadimg[i] 
            const cloudPath = that.data.resId +"/" + filePath.split(".")[2] + ".png"
            that.setData({
              motto2: filePath
            })
            wx.cloud.uploadFile({
              cloudPath: cloudPath,
              filePath: filePath,
              success: res => {
                that.setData({
                  imgPath: filePath
                })
                wx.showToast({
                  title: '上传成功',
                })
              },
            })
            const db = wx.cloud.database()
            const _ = db.command
            db.collection('photo').doc(that.data.resId).update({
              data: {
                photos: _.push({
                  uid:that.data.openid,
                  image: cloudPath,
                  time: util.formatTime(new Date())
                })
              },
              success(res) {
                console.log(res.data)
              }
            })
          }

        },
        complete:function(){ 
        }
      })
    } else {
      wx.showToast({
        title: '最多上传12张图片',
        icon: 'loading',
        duration: 3000
      });
    }
  },
  album: function (option) {
    const album = option.target.dataset.img_arr
    var that = this;
    wx.navigateTo({
      url: '../album/album?album=' + JSON.stringify(album)
    })
  },
  albumme: function (option) {
    const album = option.target.dataset.img_arr
    var that = this;
    wx.navigateTo({
      url: '../albumme/albumme?album=' + JSON.stringify(album)
    })
  },


  rigist: function (option) {
    var that = this;
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('photo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: this.data.resId,
        photos: [  
        ]
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
  },
})