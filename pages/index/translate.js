// pages/index/translate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: null,
    max: 200,
    length: 0,
    isAgree: true,
    rewardId:null,
    isGet:0,
    translation:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.setData({
      content: options.content,
      rewardId:options.rewardId,
      isGet:options.isGet  
    })
    
  },
  submit: function() {
    var that = this;
    var rewardId = that.data.rewardId;
    var isGet = that.data.isGet;
    var translation = that.data.translation;
    console.log(isGet);
    console.log(rewardId);
    if (isGet == 1) { 
      wx.request({
        url: 'http://localhost:8080/reward/translation',
        method: 'PUT',
        data: {
          userId: 2,
          rewardId: rewardId,
          translation: translation
        },
        success: function(res) {
          var flag = res.data.flag;
          if (!flag) {
            var toastText = '提交失败';
            wx.showToast({
              title: toastText,
              icon: 'none',
              duration: 2000
            });
          } else {
            var toastText = '提交成功';
            wx.showToast({
              title: toastText,
              icon: 'success',
              duration: 2000
            });
          }
        }
      })
    } else {//未领取，不能提交
      wx.showModal({
        content: '请先领取任务',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  userInput: function(e) {
    this.setData({
      length: e.detail.value.length,
      translation:e.detail.value
    })
  }
})