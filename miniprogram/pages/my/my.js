Page({
  data: {
    avatarUrl: "/images/avatar.png",
    nickName: "我的昵称"
  },

  onLoad: function() {
    wx.getUserInfo({
      success: res => {
        this.setData({
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        })
      }
    })
  },

  getMyInfo: function() {
    wx.navigateTo({
      url: '/pages/my-info/my-info',
    })
  },

  getMyOrder: function() {
    wx.navigateTo({
      url: '/pages/my-order/my-order',
    })
  },

  getMyPhotos: function () {
    wx.navigateTo({
      url: '/pages/imageuoload/imageuoload',
    })
  },

  getMyRes: function() {
    wx.navigateTo({
      url: '/pages/my-res/my-res',
    })
  },

  getMyBill: function() {
    wx.navigateTo({
        url:'/pages/my-bill/my-bill'
    })
  
},
  getalbumme: function (event) {
    wx.navigateTo({
      url: '/pages/albumme/albumme'
    })
  }
})