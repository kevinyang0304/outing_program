// pages/album/album.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
      resId: '0',
      det:[],
      m :'',
      imgalist: [
	    ],
      uid: 'os2Ly5LtfOJWYjCv4ItseGUp2Sec'
  },
  
	/** 
	 * 预览图片
	 */
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('photo').doc(that.data.resId).get({
      success(res) {
        that.setData({
          det:res.data["photos"],
        })   
        var album_list = that.data.imgalist;
        for (var i = 0; i < that.data.det.length; i++) {
          if (that.data.det[i]["uid"] == that.data.uid){
          album_list.push("cloud://outing-program-803c04.6f75-outing-program-803c04/"+that.data.det[i]["image"]);
        } }
        that.setData({
          imgalist : album_list
        })   
      }
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
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /*var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    
    var newlist = ['cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/14.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/15.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/16.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/17.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/20.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/21.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/22.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/23.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/24.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/25.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/26.png', 'cloud://outing-program-803c04.6f75-outing-program-803c04/uploadimg2/27.png']
        var album_list = that.data.imgalist;
        for (var i = 0; i < newlist.length; i++) {
          album_list.push(newlist[i]);
        }
        // 设置数据
        that.setData({
          imgalist: that.data.imgalist
        })
        // 隐藏加载框
        wx.hideLoading();*/
},
   

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.imgalist // 需要预览的图片http链接列表
    })
  }

})