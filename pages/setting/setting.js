const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        platformLoginInfor: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        console.log(app.globalData.userInfo);

        wx.setNavigationBarTitle({
            title: '个人中心',
        })

        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
            })
        }

        app.userInfoReadyCallback = res => {
            this.setData({
                userInfo: res.userInfo,
            })
        }
    },
    goDetails: function () {
        if (!this.data.platformLoginInfor) {
            wx.showModal({
                title: '',
                content: '请先登录',
                success: function (res) {
                    if (res.confirm) {
                        console.log('点的是确定')
                        wx.navigateTo({
                            url: '../login/login',
                        })
                    } else {
                        console.log('点的是取消')
                    }
                }
            })
            console.log('先登录');
        } else {
            console.log(this.data.platformLoginInfor)
            wx.navigateTo({
                url: '../userDetails/userDetails',
            })
        }
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
        if (app.globalData.platformLoginInfor) {
            this.setData({
                platformLoginInfor: app.globalData.platformLoginInfor,
            })
        }
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

    }
})