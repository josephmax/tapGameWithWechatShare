

export const reRegWechat = function (title, desc, url, icon) {

    var _title = title
    var _desc = desc
    var _link = url
    var _imgUrl = icon

    function wxReReady() {
        wx.onMenuShareAppMessage({
            title: _title,
            desc: _desc,
            link: _link,
            imgUrl: _imgUrl,
            success: function (res) {
                console.log('已分享')
            },
            cancel: function (res) {
                console.log('已取消')
            },
            fail: function (res) {
                console.log(JSON.stringify(res))
            }

        })

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: _title,
            link: _link,
            imgUrl: _imgUrl
        })

    }

    wx.ready(wxReReady)
}

export const regWechat = function (title, desc, url, icon, wxID) {

    var wxTitle = title
    var wxDesc = desc
    var wxURL = url
    var wxIcon = icon

    var jsApiList = [
        // 所有要调用的 API 都要加到这个列表中
        'onMenuShareTimeline', //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        'onMenuShareAppMessage', //获取“分享给朋友”按钮点击状态及自定义分享内容接口
    ]

    function wxready() {
        wx.onMenuShareAppMessage({
            title: wxTitle,
            desc: wxDesc,
            link: wxURL,
            imgUrl: wxIcon,
            success: function (res) {
                console.log('已分享')
            },
            cancel: function (res) {
                console.log('已取消')
            },
            fail: function (res) {
                console.log(JSON.stringify(res))
            }
        })

        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        wx.onMenuShareTimeline({
            title: wxTitle,
            link: wxURL,
            imgUrl: wxIcon
        })
    }

    setTimeout(function(){
        // alert(window.startPath)
        $.ajax({
            url: 'http://www.iihwx.com/iih_wechatbs/home/index/getSignPackage_url',
            type: 'POST',
            dataType: 'json',
            data: {
                openid: wxID,
                url: window.startPath
            },
            success: function (re) {
                var rjss = re

                // console.log('before config'+wx)
                wx.config({
                    debug: false,
                    appId: rjss.appId,
                    timestamp: rjss.timestamp,
                    nonceStr: rjss.nonceStr,
                    signature: rjss.signature,
                    jsApiList: jsApiList
                })
                // console.log('after config'+wx)
                var access_id = rjss.access_id
                // alert('get sign and set ready '+wxTitle)
                wx.ready(wxready)

            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('error sign')
                console.log(xhr.response)
                console.log(textStatus)
                console.log(errorThrown)
                return false
            }
        })
    },1000)

}

