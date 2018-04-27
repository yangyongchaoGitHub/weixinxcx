Page({

    /**
     * 页面的初始数据
     */
    data: {
        mt: null,
        mts: null,
        xaxist: 'check_1',
        yaxist: 'check_1',
        zaxist: 'check_1',
        xaxisc: 'check_1',
        yaxisc: 'check_1',
        zaxisc: 'check_1',
        lensc: 'check_1',
        host: 'check_1',
        ipct: 'check_1',
        vibration: 'check_1',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var thiss = this;
        wx.setNavigationBarTitle({
            title: '设备状态',
        })

        wx: wx.getStorage({
            key: 'show_machinetool',
            success: function (res) {
                console.log(res.data);
                thiss.setData({
                    mt: res.data,
                })
                thiss.getMachineToolStatus();
            },
            fail: function (res) {
                console.log('devicestatus.wxml get show_machinetool error');
            },
            complete: function (res) { },
        })
    },
    getMachineToolStatus: function () {
        var thiss = this;
        var mt = this.data.mt;
        wx.request({
            url: 'http://192.168.1.39:8080/imonitor-cms/rest/machinetoolStatus/late/' + mt.serialNo,
            success: function (res) {
                console.log(res.data);

                thiss.setData({
                    mts: res.data,
                })

                thiss.checkStatus();
            },
            fail: function (res) {
                console.log(res)
            },
            complete: function (res) {
                console.log('dododod?');
            }
        })
    },
    showInfo: function() {
        wx.navigateTo({
            url: '../deviceInfo/deviceInfo',
        })
    },
    checkStatus: function() {
        console.log('checkStatus');
        var mt = this.data.mt;
        var mts = this.data.mts;
        var config = this.data.mt.machineToolConfig;

        var xAxisT = mts.xAxisTemperature;
        var yAxisT = mts.yAxisTemperature;
        var zAxisT = mts.zAxisTemperature;
        var xAxisC = mts.xAxisCurrent;
        var yAxisC = mts.yAxisCurrent;
        var zAxisC = mts.zAxisCurrent;
        var lensC = mts.lensCurrent;
        var hostT = mts.hostTemperature;
        var ipct = mts.ipctemperature;
        var vibration = mts.vibration;

        var xaxist_css = 'check_1';
        var yaxist_css = 'check_1';
        var zaxist_css = 'check_1';
        var xaxisc_css = 'check_1';
        var yaxisc_css = 'check_1';
        var zaxisc_css = 'check_1';
        var lensc_css = 'check_1';
        var host_css = 'check_1';
        var ipct_css = 'check_1';
        var vibration_css = 'check_1';

        console.log(config);
        if (xAxisT != null) {
            if (xAxisT > config.xAxisTemperature_min_1 &&
                xAxisT < config.xAxisTemperature_max_1) {
                xaxist_css = 'check_1';
            } else if (xAxisT >= config.xAxisTemperature_min_2
                && xAxisT < config.xAxisTemperature_max_2) {
                xaxist_css = 'check_2';
            } else {
                xaxist_css = 'check_3';
            }
        }

        if (yAxisT != null) {
            if (yAxisT > config.yAxisTemperature_min_1 &&
                yAxisT < config.yAxisTemperature_max_1) {
                yaxist_css = 'check_1';
            } else if (yAxisT >= config.yAxisTemperature_min_2
                && yAxisT < config.yAxisTemperature_max_2) {
                yaxist_css = 'check_2';
            } else {
                yaxist_css = 'check_3';
            }
        }

        if (zAxisT != null) {
            if (zAxisT > config.zAxisTemperature_min_1 &&
                zAxisT < config.zAxisTemperature_max_1) {
                zaxist_css = 'check_1';
            } else if (zAxisT >= config.zAxisTemperature_min_2
                && zAxisT < config.zAxisTemperature_max_2) {
                zaxist_css = 'check_2';
            } else {
                zaxist_css = 'check_3';
            }
        }

        if (xAxisC != null) {
            if (xAxisC > config.xAxisCurrent_min_1 &&
                xAxisC < config.xAxisCurrent_max_1) {
                xaxisc_css = 'check_1';
            } else if (xAxisC >= config.xAxisCurrent_min_2
                && xAxisC < config.xAxisCurrent_max_2) {
                xaxisc_css = 'check_2';
            } else {
                xaxisc_css = 'check_3';
            }
        }
        if (yAxisC != null) {
            if (yAxisC > config.yAxisCurrent_min_1 &&
                yAxisC < config.yAxisCurrent_max_1) {
                yaxisc_css = 'check_1';
            } else if (yAxisC >= config.yAxisCurrent_min_2
                && yAxisC < config.yAxisCurrent_max_2) {
                yaxisc_css = 'check_2';
            } else {
                yaxisc_css = 'check_3';
            }
        }

        if (zAxisC != null) {
            if (zAxisC > config.zAxisCurrent_min_1 &&
                zAxisC < config.zAxisCurrent_max_1) {
                zaxisc_css = 'check_1';
            } else if (zAxisC >= config.zAxisCurrent_min_2
                && zAxisC < config.zAxisCurrent_max_2) {
                zaxisc_css = 'check_2';
            } else {
                zaxisc_css = 'check_3';
            }
        }

        if (lensC != null) {
            if (lensC > config.lensCurrent_min_1 &&
                lensC < config.lensCurrent_max_1) {
                lensc_css = 'check_1';
            } else if (lensC >= config.lensCurrent_min_2
                && lensC < config.lensCurrent_max_2) {
                lensc_css = 'check_2';
            } else {
                lensc_css = 'check_3';
            }
        }

        if (hostT != null) {
            if (hostT > config.hostTemperature_min_1 &&
                hostT < config.hostTemperature_max_1) {
                host_css = 'check_1';
            } else if (hostT >= config.hostTemperature_min_2
                && hostT < config.hostTemperature_max_2) {
                host_css = 'check_2';
            } else {
                host_css = 'check_3';
            }
        }

        if (ipct != null) {
            if (ipct > config.ipctemperature_min_1 &&
                ipct < config.ipctemperature_max_1) {
                ipct_css = 'check_1';
            } else if (ipct >= config.ipctemperature_min_2
                && ipct < config.ipctemperature_max_2) {
                ipct_css = 'check_2';
            } else {
                ipct_css = 'check_3';
            }
        }

        console.log(vibration);
        if (vibration != null) {
            if (vibration > config.vibration_min_1 &&
                vibration < config.vibration_max_1) {
                vibration_css = 'check_1';
            } else if (vibration >= config.vibration_min_2
                && vibration < config.vibration_max_2) {
                vibration_css = 'check_2';
            } else {
                vibration_css = 'check_3';
            }
        }
        console.log(vibration_css);

        this.setData({
            xaxist: xaxist_css,
            yaxist: yaxist_css,
            zaxist: zaxist_css,
            xaxisc: xaxisc_css,
            xaxisc: yaxisc_css,
            xaxisc: zaxisc_css,
            lensc: lensc_css,
            host: host_css,
            ipct: ipct_css,
            vibration: vibration_css,
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