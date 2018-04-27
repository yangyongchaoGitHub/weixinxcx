
const app = getApp()

Page({
    data: {
        dios: '大笨蛋',
        dds: [],
        blogin: false,
    },

    onLoad: function () {
        //console.log(app.globalData.userInfo.nickName + '是' + this.data.dios);
        wx.setNavigationBarTitle({
            title: '设备列表',
        })
        if (this.data.blogin == false) {
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
        }
    },

    getDevices: function () {
        var thissun = this;
        console.log('dds');
        wx.request({
            url: 'http://192.168.1.39:8080/imonitor-cms/rest/machinetool',
            success: function (res) {
                console.log(res.data);
                thissun.data.dds = res.data;
                thissun.setData({
                    dds: res.data
                })
            }
        })
    },
    getData: function () {
        console.log(this.data.dds[0]);
    },
    dds_item: function (e) {
        var id = e.currentTarget.id;
        var ddds = this.data.dds;
        var mt = null;

        for (var i = 0; i < ddds.length; i++) {
            if (ddds[i].id == id) {
                mt = ddds[i];
                break;
            }
        }

        if (mt != null) {
            wx: wx.setStorage({
                key: 'show_machinetool',
                data: mt,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
            })
        }

        wx: wx.navigateTo({
            url: '../devicestatus/devicestatus',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    onShow: function () {
        console.log('onShow!!!');
        if (app.globalData.platformLoginInfor) {
            this.getDevices();
        }
    },
})