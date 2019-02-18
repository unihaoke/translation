// pages/mine/trans.js
var sliderWidth = 96;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["我发出的", "我参加的"],
    array: ['全部', '已完成', '未完成', '结束'],
    index: 0,
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    status: '未完成',
    windowHeight: 0,
    windowWidth: 0,
    inputShowed: false,
    inputVal: "",
    showMore: false,
    isLower: false,
    isEnd: false,
    conferences: [],
    isSuccess: 0,
    type: 0
  },

  bindPickerChange: function(e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          windowHeight: res.windowHeight - 5,
          windowWidth: res.windowWidth
        });
      }
    });
    // 加载数据
    that.loadConferences();
  },

  tabClick: function(e) {
    var that = this;
    var type = that.data.type;
    if (type == 0) {
      type = 1;
    } else {
      type = 0;
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      type: type
    });
    // 加载数据
    that.loadConferences()
  },

  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: "",
      searchResults: []
    });
  },
  inputTyping: function(e) {


  },

  onUpper: function() {},
  onLower: function() {
    var that = this
    that.setData({
      //isLower: true
      isEnd: true
    });
  },
  onScroll: function() {},

  loadConferences: function() {
    var that = this;
    var type = that.data.type;
    var url = 'http://localhost:8080/user/2/' + type;
    wx.request({
      url: url,
      method: 'GET',
      data: {},
      success: function(res) {
        var list = res.data.data;
        if (list == null) {
          var toastText = '获取数据失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 20001
          });
        } else {
          that.setData({
            conferences: list
          });
        }
      }
    })
  },
  updateGetAndAttention: function(e, content, isGet, isAttention, flag) {
    var that = this;
    var userId = e.currentTarget.dataset.userid;
    var rewardId = e.currentTarget.dataset.rewardid;
    wx.request({
      url: 'http://localhost:8080/reward',
      method: 'PUT',
      data: {
        userId: 2,
        rewardId: rewardId,
        isGet: isGet,
        isAttention: isAttention
      },
      success: function(res) {
        var f = res.data.flag;
        if (!f) {
          var toastText = content + '失败';
          wx.showToast({
            title: toastText,
            icon: 'none',
            duration: 2001
          });
        } else {
          var toastText = content + '成功';
          wx.showToast({
            title: toastText,
            icon: 'success',
            duration: 2000
          });
          that.select(flag, rewardId);
        }
      }
    })

  },
  //点击领取或关注后改变组件的值
  select: function(flag, rewardId) {
    var that = this;
    var array = that.data.conferences;
    var select = 'isGet';
    if (flag == 1) {
      select = 'isAttention';
    }
    //item为遍历的当前元素，index为当前索引，arr为正在操作的数组]
    for (var index in array) {
      if (array[index].rewardId == rewardId) {
        var cItem = "conferences[" + index + "]." + select;
        that.setData({
          [cItem]: 1
        })
      }
    }

  },
  isGet: function(e) {
    var that = this;
    var isGet = 1;
    var isAttention = e.currentTarget.dataset.isattention;
    that.updateGetAndAttention(e, '领取', isGet, isAttention, 0);
  },
  isAttention: function(e) {
    var that = this;
    var isGet = e.currentTarget.dataset.isget;
    var isAttention = 1;
    that.updateGetAndAttention(e, '关注', isGet, isAttention, 1);
  }
})