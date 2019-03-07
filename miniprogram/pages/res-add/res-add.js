var util = require('../../utils/utils.js');
const app = getApp()
Page({
  data: {
    date: "请选择",
    startTime: "开始时间",
    endTime: "结束时间",  
  },

  onLoad: function() {
    this.setData({
      resID: util.getID(new Date())
    })
  },

  onShow: function() {
    wx.hideTabBar({})
  },

  bindImageChange(e) {
    this.setData({})
  },

  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindStartTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  bindEndTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },



  rigist: function (option) {
   
  },



  //发布资源
  pubRes(e){
    const subResInfo = e.detail.value
    console.log(subResInfo)
    //校验信息
    if (subResInfo.resName == "") {
      wx.showModal({
        content: '请填写项目名',
        showCancel: false,
      })
      return
    }
    if (subResInfo.resDate == "请选择") {
      wx.showModal({
        content: '请填写日期',
        showCancel: false,
      })
      return
    }
    if (subResInfo.resStartTime == "开始时间") {
      wx.showModal({
        content: '请填写项目开始时间',
        showCancel: false,
      })
      return
    }
    if (subResInfo.resEndTime == "结束时间") {
      wx.showModal({
        content: '请填写项目结束时间',
        showCancel: false,
      })
      return
    }
    if (subResInfo.totalCount == "") {
      wx.showModal({
        content: '请填写资源总数',
        showCancel: false,
      })
      return
    }
    if (subResInfo.address == "") {
      wx.showModal({
        content: '请填写项目地点',
        showCancel: false,
      })
      return
    }
    //填充resInfo
    const resInfo = {}
    resInfo._id = this.data.resID
    resInfo.resourceName = subResInfo.resName
    resInfo.address = subResInfo.address
    resInfo.totalCount = subResInfo.totalCount
    resInfo.canCount = subResInfo.totalCount
    resInfo.imgUrl = "http://test"
    resInfo.timeRange = subResInfo.resDate + " " + subResInfo.resStartTime + " - " + subResInfo.resDate + " " + subResInfo.resEndTime
    resInfo.remark = subResInfo.remark
    resInfo.prePerson = null
    //初始化账单选项
    resInfo.fee = {}
    resInfo.fee.carFee=0
    resInfo.fee.eatFee=0
    resInfo.fee.shopFee=0
    resInfo.fee.placeFee=0
    resInfo.fee.otherFee=0
    resInfo.fee.bz=' '
    resInfo.photos= []


    var that = this;
    wx.cloud.init()
    const db = wx.cloud.database()
    db.collection('photo').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        _id: this.data.resID,
        photos: [
        ]
      },
      success(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })



    wx.showModal({
      title: '',
      content: '发布成功',
      showCancel: false,
      confirmColor: '#3f51b5',
      success: function (res) {
        if (res.confirm) {
          //资源入库，包含发布者信息
          console.log('用户点击确定')
          wx.getUserInfo({
            success: res => {
              const pubPerson = {}
              pubPerson.id = app.globalData.openid
              pubPerson.openid = app.globalData.openid
              pubPerson.name = res.userInfo.nickName
              resInfo.pubPerson = pubPerson
              wx.cloud.callFunction({
                name: 'db_addRes',
                data: resInfo,
                success:res=>{
                  wx.switchTab({
                    url: '/pages/res-list/res-list',
                    success: function () {
                      getCurrentPages().pop().onLoad()
                      wx.showTabBar({})
                    }
                  })
                }
              })
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  },

  

  cancel(e) {
    wx.showModal({
      title: '',
      content: '取消发布项目',
      showCancel: false,
      confirmColor: '#3f51b5',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '/pages/res-list/res-list',
            success: function() {
              wx.showTabBar({})
            }
          })
        } else {
          console.log('用户点击取消')
        }
      }
    })
  }
})