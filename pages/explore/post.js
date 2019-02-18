// pages/explore/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTopTips: false,
    ishidden: false,
    checkboxItems: [{
        name: '计算机',
        value: '0',
        checked: true
      },
      {
        name: '金融',
        value: '1'
      },
      {
        name: '体育',
        value: '2'
      },

    ],
    countries: ["英译中", "中译英"],
    countryIndex: 0,
    date: "2019-02-18",
    time: "19:01",
    length: 0,
    total_length: 200,
    content: null,
    rewardSchedule: 0,
    money: 0,
    categoryId:1
  },

  showTopTips: function() {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function() {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = this.data.checkboxItems,
      values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    this.setData({
      checkboxItems: checkboxItems
    });
  },

  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindCountryCodeChange: function(e) {
    console.log('picker country code 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryCodeIndex: e.detail.value
    })
  },
  bindCountryChange: function(e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);
    this.setData({
      countryIndex: e.detail.value
    })
  },
  bindAccountChange: function(e) {
    console.log('picker account 发生选择改变，携带值为', e.detail.value);

    this.setData({
      accountIndex: e.detail.value
    })
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  more: function(e) {
    var that = this;
    that.setData({
      checkboxItems: [{
          name: '计算机',
          value: '0',
          checked: true
        },
        {
          name: '金融',
          value: '1'
        },
        {
          name: '体育',
          value: '2'
        },
        {
          name: '历史',
          value: '3'
        },
        {
          name: '科技',
          value: '4'
        },
        {
          name: '小说',
          value: '5'
        },
        {
          name: '电影',
          value: '6'
        },
      ],
      ishidden: true
    })
  },
  moneyinput: function(e) {
    var that = this;
    var money = e.detail.value;
    if(money == 0){
      that.setData({
        categoryId:1
      })
    }
    that.setData({
      money: e.detail.value
    })
    console.log(e.detail.value);
  },
  postInput: function(e) {
    this.setData({
      length: e.detail.value.length,
      content: e.detail.value
    })
  },
  postReward: function(e) {
    var that = this;
    var endtime = that.data.date + ' ' + that.data.time
    console.log("截止时间戳为：" + endtime);
    var myDate = new Date();
    that.changeDate(myDate.getTime(), endtime);
    wx.request({
      url: 'http://localhost:8080/reward',
      method: 'POST',
      data: {
        userId: 2,
        rewardStatus: 0, //未采纳
        rewardInformation: that.data.content,
        rewardSchedule: that.data.rewardSchedule,
        rewardExperience: 5,
        categoryId: that.data.categoryId,
        rewardType: that.data.countryIndex,
        rewardMoney: that.data.money,
        deadline: endtime + ':00'
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

          wx.showModal({
            content: '提交成功',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 1
                })
              }
            }
          });

        }
      }
    })
  },
  changeDate: function(startTime, endTime) {
    var that = this;
    //日期格式化
    // var start_date = new Date(startTime.replace(/-/g, "/"));
    var end_date = new Date(endTime.replace(/-/g, "/"));
    //转成毫秒数，两个日期相减
    var days = end_date.getTime() - startTime;
    //转换成天数
    var day = parseInt(days / (1000 * 60 * 60 * 24));
    //do something
    that.setData({
      rewardSchedule: day
    })
  }
})