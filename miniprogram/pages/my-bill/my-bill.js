// miniprogram/pages/my-bill/my-bill.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carFee:'',
    eatFee:'',
    shopFee:'',
    placeFee:'',
    otherFee:'',
    bz:'',
    totalFee:'',
    resInfo:'',
    resID:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
      const openid = app.globalData.openid
      const db = wx.cloud.database()
      // 查询当前用户所有的 counters
    if (option != undefined) {
      if (option._id != undefined) {
        // const resInfoObj = JSON.parse(option)
        this.setData({
          resID: option._id,
          resInfo: option,
        })
      }
      if (option.resInfo != undefined) {
        const resInfoObj = JSON.parse(option.resInfo)
        this.setData({
          resID: resInfoObj._id,
          resInfo: resInfoObj,
        })
      }
    }
    this.setData({
            carFee: parseInt(this.data.resInfo.fee.carFee),
            eatFee: parseInt(this.data.resInfo.fee.eatFee),
            shopFee: parseInt(this.data.resInfo.fee.shopFee),
            placeFee: parseInt(this.data.resInfo.fee.placeFee),
            otherFee: parseInt(this.data.resInfo.fee.otherFee),
            bz: this.data.resInfo.fee.bz.toString(),
            id: JSON.stringify(this.data.resInfo._id),
          });
    var sum = parseInt(this.data.carFee) + parseInt(this.data.eatFee)
                + parseInt(this.data.shopFee)
                + parseInt(this.data.placeFee)
                + parseInt(this.data.otherFee);
          this.setData({
              totalFee:sum
          });
      // wx.cloud.callFunction({
      //     name: 'db_getResInfoById',
      //     data: {
      //         _id: this.data.id
      //     },
      //   success: res => {
      //     this.setData({
      //       resData: res.result,
      //       carFee: parseInt(res.result.data.fee.carFee),
      //       eatFee: parseInt(res.result.data.fee.eatFee),
      //       shopFee: parseInt(res.result.data.fee.shopFee),
      //       placeFee: parseInt(res.result.data.fee.placeFee),
      //       otherFee: parseInt(res.result.data.fee.otherFee),
      //       // bz: res.result.data.fee.bz.toString(),
      //       // id: JSON.stringify(res.result.data._id),
      //     })
      //       var sum = parseInt(this.data.carFee) + parseInt(this.data.eatFee)
      //           + parseInt(this.data.shopFee)
      //           + parseInt(this.data.placeFee)
      //           + parseInt(this.data.otherFee);
      //     this.setData({
      //         totalFee:sum
      //     })
      //     console.log('[数据库] [查询记录] 成功: ', res);
      //   },
      //   fail: err => {
      //     wx.showToast({
      //       icon: 'none',
      //       title: '查询记录失败'
      //     })
      //     console.error('[数据库] [查询记录] 失败：', err)
      //   }
      // })
      

      

      
  },

  /**,
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
  
  modify(e) {
      var sum = parseInt(this.data.carFee) + parseInt(this.data.eatFee)
          + parseInt(this.data.shopFee)
          + parseInt(this.data.placeFee)
          + parseInt(this.data.otherFee);
      this.setData({
        totalFee:sum,
      });
      // const _openid = app.globalData.openid
      const db = wx.cloud.database()
      // var str = this.data.id.replace("\"","").replace("\"","")
      var tempFee = {}
      tempFee.carFee = this.data.carFee;
      tempFee.otherFee = this.data.otherFee;
      tempFee.shopFee = this.data.shopFee;
      tempFee.placeFee = this.data.placeFee;
      tempFee.eatFee = this.data.eatFee;
      tempFee.bz = this.data.bz;
      console.log(tempFee)
      const tempp = {};
      tempp.fee = tempFee;
      const tuu = {}
      tuu._id = this.data.resInfo._id
      tuu.resInfo = tempp
      console.log(tuu)
    console.log(this.data.resID)
      wx.cloud.callFunction({
        name: 'db_updateResInfo',
        data: tuu,
        success: res => {
                   console.log('[数据库][更新成功]')
          },
        })
  },

    carinput(e) {
    this.setData({
      carFee: e.detail.value
    })
  },
    eatinput(e){
      this.setData({
          eatFee: e.detail.value
      })
    },
    shopinput(e){
        this.setData({
            shopFee: e.detail.value
        })
    },
    placeinput(e){
        this.setData({
            placeFee: e.detail.value
        })
    },
    otherinput(e){
        this.setData({
            otherFee: e.detail.value
        })
    },
    bzinput(e){
        this.setData({
            bz: e.detail.value
        })
    }


  
})
