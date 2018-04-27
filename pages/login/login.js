var util = require('../../utils/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        bUserInput: false,
        bPswdInput: false,
        user: null,
        pswd: null,
        loginBG: 'bg1',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: '登录',
        })
    },
    userInput: function (event) {
        if (event.detail.cursor > 0) {
            this.setData({
                user: event.detail.value,
            })
        } else {
            this.setData({
                user: null,
            })
        }
        this.loginBGChange();
    },

    pswdInput: function (event) {
        if (event.detail.cursor > 0) {
            this.setData({
                pswd: event.detail.value,
            })
        } else {
            this.setData({
                pswd: null,
            })
        }
        this.loginBGChange();
    },

    loginBGChange: function () {
        this.setData({
            loginBG: (this.data.user != null && this.data.pswd != null) ? 'bg2' : 'bg1',
        })
    },
    userLogin: function () {
        var user = this.data.user;
        var pswd = this.data.pswd;
        if (user != null && pswd != null) {
            console.log('lllllgin');
            console.log(user);
            console.log(pswd);
            console.log(util.test('starey'));
            this.login(user, pswd);
            wx.showToast({
                title: '登录中',
                icon: 'loading',
            })
        }
    },
    login: function (user, pswd) {
        var md5 = require('../../utils/md5.js');
        var thiss = this;

        wx.request({
            url: 'http://192.168.1.39:8080/imonitor-cms/rest/account/login/',
            data: {
                username: user,
                password: md5.hexMD5(pswd)
            },
            header: {
                'content-type': 'application/json'
            },
            method: 'PUT',
            responseType: 'application/x-www-form-urlencoded',
            success: function (res) {
                console.log(res);
                if (res.statusCode == 200 && res.data != "") {
                    app.globalData.platformLoginInfor = res.data;
                    wx.showToast({
                        title: '登录成功',
                    })
                    thiss.loginOK();
                } else {
                    wx.showToast({
                        title: '登录失败，请确认登录名或密码',
                        icon: 'none',
                    })
                }
            },
            fail: function (res) {
                wx.showToast({
                    title: '登录失败',
                    icon: 'none',
                })
            }
        })
    },
    loginOK: function () {
        console.log(app.globalData.platformLoginInfor);
        wx.navigateBack({
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
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})