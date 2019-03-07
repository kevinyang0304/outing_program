var util = require('../../utils/utils.js');
const app = getApp()
Page({
  data: {
    resID: '',
    resInfo: '',
    img_arr: [],
    num: 0
  },

  onLoad: function(option) {
    const openid = app.globalData.openid
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
  },
  //发布资源
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
            const cloudPath = that.data.resID + "/" + filePath.split(".")[2] + ".png"
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
            db.collection('photo').doc(that.data.resID).update({
              data: {
                photos: _.push({
                  uid: openid,
                  image: cloudPath,
                  time: util.formatTime(new Date())
                })
              },
              success(res) {
                console.log(res)
              }
            })
            db.collection('user-photo').doc(openid).update({
              data: {
                photos: _.push({
                  resId:that.data.resID,
                  image: cloudPath,
                  time: util.formatTime(new Date())
                })
              },
              success(res) {
                console.log(res)
              }
            })

          }
        },
        complete: function () {
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

  
  //取消预约
  //資源：可預約資源+1  預約用戶-1
  //用戶：预约资源-1
  cancel: function() {
    const resInfo = this.data.resInfo
    //构造resData
    const resData = {}
    const _resInfo = {}
    resInfo.canCount = resInfo.canCount + 1
    _resInfo.canCount = resInfo.canCount
    resData._id = resInfo._id
    resData.resInfo = _resInfo
    this.setData(resInfo)
    console.log(resData)
    wx.showModal({
      title: '',
      content: '取消成功',   
      showCancel: false,
      confirmColor: '#3f51b5',
      success: function (res) {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'db_updateResInfo',
            data: resData
          })
          //更新用户信息 先查已预约资源再改
          wx.cloud.callFunction({
            name: 'db_getUserInfoById',
            data: {
              _id: app.globalData.openid
            },
            success: res => {
              const preRes = Array.from(new Set(res.result.data.preResource))
              console.log(resInfo._id)
              console.log(preRes)
              for (var i = 0; i < preRes.length;i++){
                if (preRes[i] == resInfo._id){
                  preRes.splice(i, 1)
                  break
                }
              }
              console.log(preRes)
              wx.cloud.callFunction({
                name: 'db_updateUserInfo',
                data: {
                  _id: app.globalData.openid,
                  _userInfo: {
                    preResource: preRes
                  },
                },
                success:res=>{
                  getCurrentPages()[getCurrentPages().length - 2].onLoad()
                  wx.navigateBack({
                    url: '/pages/my-order/my-order',
                  })
                }
              })
            }
          })

          //必須先刷新上機頁面在刷新當前頁
          getCurrentPages()[getCurrentPages().length - 2].onLoad()
          getCurrentPages()[getCurrentPages().length - 1].onLoad(resInfo)
          console.log('用户点击确定')
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

  bill: function (event) {
    const resInfo = JSON.stringify(event.currentTarget.dataset.resinfo)
      wx.navigateTo({
          url:'/pages/my-bill/my-bill?resInfo=' + resInfo
      })
  },

  getalbum: function (event) {
    const resInfo = JSON.stringify(event.currentTarget.dataset.resinfo)
    wx.navigateTo({
      url: '/pages/album/album?resInfo=' + resInfo
    })
  }





})