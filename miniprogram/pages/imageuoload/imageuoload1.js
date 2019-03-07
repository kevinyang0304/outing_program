// pages/imageuoload/imageuoload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgPath: '../images/placeholder-detail.png',
    motto1: 'Hello World',
    motto2: 'Hello World',
    img_arr:[],
    num : 0
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
          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
          })
          
          wx.cloud.init()
          for (var i = 0; i < that.data.img_arr.length; i++) {
            const _i = i
            that.data.num = that.data.num + 1
            const filePath = that.data.img_arr[i] 
            const cloudPath = "uploadimg2/"+'2'+i + ".png"
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
})