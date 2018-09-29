/**
 * name 分享项目列表组件
 * param {
 *   title[String]:标题,
 *   desc[String]:描述,
 *   img[String]:缩略图,
 *   setGuideStyle[Function]: 设置ShareGuide的样式,
 *   showText[Boolean]: 可选，默认为false,设为true则显示分享图标的文字说明
 * }
 * @author limeizhang
 * date 2017.07.24
 * modified by liyuanfeng
 * date 2017.10.10
 * add npic-share 新图片底层分享样式
 * date 2018.04.06 wpzheng
 */
/* global WeixinJSBridge, mqq, browser, ucweb, ucbrowser */
import React, { Component } from 'react'
const load = require('load-script')
import ua from '../../libs/ua'

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      iphone: false, // ios
      // android: false, // 安卓
      // qqnews: false, // 新闻app
      weixin: false, // 微信
      mqqbrowser: false, // QQ浏览器
      qq: false, // 手机QQ
      ucbrowser: false, // UC浏览器
      // ua: false,
      // img: this.props.img,
      // title: this.props.title,
      // desc: this.props.desc,
      // url: this.props.url
    }
  }

  async componentDidMount() {
    this.getUA()
  }

  // 系统及浏览器环境判定
  getUA = () => {
    const _that = this
    let stateObj = Object.assign({ ua: true }, ua.getUserAgent())

    this.setState(stateObj, function () {
      const initTimer = setInterval(function () {
        if (_that.state.ua && _that.props.img && _that.props.title && _that.props.desc) {
          _that.initShare();
          clearInterval(initTimer);
        }
      }, 500)
    })
  }

  // 微信分享
  CallWeiXinAPI = (fn, count) => {
    let that = this
    let total = 2000
    if (window.G_WEIXIN_READY === true || ("WeixinJSBridge" in window)) {
      fn.apply(null, []);
    } else {
      if (count <= total) {
        setTimeout(function () {
          that.CallWeiXinAPI(fn, count++);
        }, 15);
      }
    }
  }

  initWxOption = () => {
    let wximg = this.props.img
    let wxtitle = this.props.title
    let wxdesc = this.props.desc
    let wxurl = this.props.url || window.location.href

    this.CallWeiXinAPI(function () {
      WeixinJSBridge.on("menu:share:timeline", function () {
        WeixinJSBridge.invoke('shareTimeline', {
          "img_url": wximg,
          "img_width": "120",
          "img_height": "120",
          "link": wxurl,
          "desc": wxdesc,//wxdesc,
          "title": wxtitle//wxtitle
        }, function() {})
      });
      WeixinJSBridge.on("menu:share:appmessage", function () {
        WeixinJSBridge.invoke("sendAppMessage", {
          "img_url": wximg,
          "img_width": "120",
          "img_height": "120",
          "link": wxurl,
          "desc": wxdesc,//wxdesc,
          "title": wxtitle//wxtitle
        }, function() {})
      });
      WeixinJSBridge.on("menu:share:qq", function () {
        WeixinJSBridge.invoke("shareQQ", {
          "img_url": wximg,
          "img_width": "120",
          "img_height": "120",
          "link": wxurl,
          "desc": wxdesc,//wxdesc,
          "title": wxtitle//wxtitle
        }, function() {})
      });
    }, 0)
  }

  // 初始化分享
  initShare = () => {

    const qqapi = '//open.mobile.qq.com/sdk/qqapi.js?_bid=152'
    const qbapi = '//jsapi.qq.com/get?api=app.share'

    if (this.state.weixin) {
      this.initWxOption()
    } else if (this.state.qq) {
      load(qqapi)
    } else if (this.state.mqqbrowser) {
      load(qbapi)
    }
  }

  // 分享指引
  webGuide = (type) => {
    this.props.setGuideStyle(type)
  };

  // 普通浏览器环境下分享
  webShareQzone = () => {
    window.location = "//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=" + encodeURIComponent(this.props.url || window.location.href) + "&site=&title=" + this.props.title + "&pics=" + this.props.img;
  }

  webShareSinaWeibo = () => {
    window.location = "http://service.weibo.com/share/mobile.php?title=" + this.props.title + "&url=" + encodeURIComponent(this.props.url || window.location.href) + "&pic=" + this.props.img + "&searchPic=false&style=simple&language=zh_cn";
  }


  // 手机QQ环境下的分享
  qqShare = (type) => {
    mqq.ui.shareMessage({
      title: this.props.title,
      desc: this.props.desc,
      share_url: this.props.url || window.location.href,
      image_url: this.props.img, //必填，消息左侧缩略图url。图片推荐使用正方形，宽高不够时等比例撑满，不会变形。原 imageUrl 参数，可以继续使用 imageUrl。注意：图片最小需要200 * 200，否则分享到Qzone时会被Qzone过滤掉。
      share_type: type // Number 必填，分享的目标类型，0：QQ好友；1：QQ空间；2：微信好友；3：微信朋友圈。默认为 0
    }, function() {})
  }

  // QQ浏览器环境下的分享
  qqBrowserShare = (type) => {
    var _info_ = {
      url: this.props.url || window.location.href,
      title: this.props.title,
      description: this.props.desc, //{String} description 分享界面的描述
      to_app: type, //{Number} to_app 0:其他设备,1:微信,3:qq空间,4:qq好友,8:朋友圈,10:复制链接,11:新浪微博
      img_url: this.props.img
    };
    browser.app.share(_info_, function() {})
  }

  // UC环境下的分享
  ucBrowserShare = (type) => {
    if (typeof (ucweb) !== "undefined") {
      ucweb.startRequest("shell.page_share", [this.props.title, this.props.title, this.props.url || window.location.href, type, "", "", ""])
    } else {
      if (typeof (ucbrowser) !== "undefined") {
        ucbrowser.web_share(this.props.title, this.props.title, this.props.url || window.location.href, type, "", "", "")
      }
    }
  }

  // 分享到微信好友
  shareWxf = () => {
    if (this.state.weixin) {
      this.webGuide('')
      this.initWxOption()
    } else if (this.state.qq) {
      this.qqShare(2)
    } else if (this.state.mqqbrowser) {
      this.qqBrowserShare(1)
    } else if (this.state.ucbrowser && this.state.iphone) {
      this.ucBrowserShare('kWeixin')
    } else {
      this.webGuide('guidewxf')
    }
  }

  // 分享到微信朋友圈
  shareWxt = () => {
    if (this.state.weixin) {
      this.webGuide('')
      this.initWxOption()
    } else if (this.state.qq) {
      this.qqShare(3)
    } else if (this.state.mqqbrowser) {
      this.qqBrowserShare(8)
    } else if (this.state.ucbrowser && this.state.iphone) {
      this.ucBrowserShare('kWeixinFriend')
    } else {
      this.webGuide('guidewxt')
    }
  }

  // 分享到QQ
  shareQQ = () => {
    if (this.state.weixin) {
      this.webGuide('qqlayout')
      this.initWxOption()
    } else if (this.state.qq) {
      this.qqShare(0)
    } else if (this.state.mqqbrowser) {
      this.qqBrowserShare(4)
    } else if (this.state.ucbrowser && this.state.iphone) {
      this.ucBrowserShare('kQQ')
    } else {
      this.webGuide('guideqq')
    }
  }

  // 分享到QQ空间
  shareQzone = () => {
    if (this.state.qq) {
      this.qqShare(1)
    } else if (this.state.mqqbrowser) {
      this.qqBrowserShare(3)
    } else if (this.state.ucbrowser && this.state.iphone) {
      this.ucBrowserShare('kQZone')
    } else {
      this.webShareQzone()
    }
  }

  // 分享到新浪微博
  shareWeibo = () => {
    if (this.state.ucbrowser && this.state.iphone) {
      this.ucBrowserShare('kSinaWeibo')
    } else {
      this.webShareSinaWeibo()
    }
  }

  render() {
    const showText = this.props.showText ? 'text' : ''
    let bossreportinfo = this.props.showNewPicStyle ? '&pagetype=tjdc' :'' /** 非常重要 */
    return (
      <div style={{display:`${this.props.isHide?'none':'block'}`}}>
        {
          this.props.type == 'vdetail' &&
          <span className='vname'>分享至</span>
        }
        <ul className={`share ${showText} ${this.props.type} ${this.props.showNewPicStyle ? 'npic-share' : ''}`} data-boss={`fun=f_share${bossreportinfo}`}>
          <li data-boss={`fun=s_wx${bossreportinfo}`} onClick={this.shareWxf}>
            <a className="share-weixin" href="javascript:;" target="_self" aria-label="分享到微信好友">
              <span>微信</span>
            </a>
          </li>
          <li data-boss={`fun=s_pyq${bossreportinfo}`} onClick={this.shareWxt}>
            <a className="share-moments" href="javascript:;" target="_self" aria-label="分享到微信朋友圈">
              <span>朋友圈</span>
            </a>
          </li>
          <li data-boss={`fun=s_qq${bossreportinfo}`} onClick={this.shareQQ}>
            <a className="share-qq" href="javascript:;" target="_self" aria-label="分享到QQ">
              <span>QQ</span>
            </a>
          </li>
          <li data-boss={`fun=s_qzone${bossreportinfo}`} onClick={this.shareQzone}>
            <a className="share-qzone" href="javascript:;" target="_self" aria-label="分享到QQ空间">
              <span>QQ空间</span>
            </a>
          </li>
          <li data-boss={`fun=s_sina${bossreportinfo}`} onClick={this.shareWeibo}>
            <a className="share-weibo" href="javascript:;" target="_self" aria-label="分享到新浪微博">
              <span>新浪微博</span>
            </a>
          </li>
        </ul>
        <style jsx>{`
          .share {
            // display: flex;
            overflow:hidden;
            list-style: none;
            background: #fff;
            //padding-top: 15px;
            //margin:0 10px 15px 10px;
            //border-top: 1px solid #e1eaf3;
          }
          .share.vdetail {
            background: none;
            padding-top: 5px;
          }
          .vname {
            color: #9B9EA3;
            float: left;
            padding-left: 11px;
            font-size: 12px;
            line-height: 38px;
            height: 38px;
            margin-top: 5px;
          }
          .npic-share{
            background:#2E2F32;
          }
          .share li {
            width:20%;
            float:left;
            // flex: 1;
            font-size: 0;
          }
          .share li a {
            display: block;
            text-align: center;
            text-decoration: none;
            color: #333;
            font-size: 14px;
            background-repeat: no-repeat;
            background-position: top center;
            background-size:auto 100%;
            height: 38px;
          }
          .share li a span {
            display: none;
          }
          .text li a {
            height: 52px;
          }
          .text li a span {
            display: block;
            padding-top: 38px;
            font-size: 12px;
            line-height: 12px;
          }
          .share li a.share-weixin  { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/share-wx.svg);}
          .share li a.share-moments { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/share-tl.svg);}
          .share li a.share-qq      { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/share-qq.svg); }
          .share li a.share-qzone   { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/share-qz.svg);}
          .share li a.share-weibo   { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/share-wb.svg);}
          .vdetail li a.share-weixin, .npic-share li a.share-weixin   { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/nshare-wx.svg);}
          .vdetail li a.share-moments, .npic-share li a.share-moments { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/nshare-tl.svg);}
          .vdetail li a.share-qq, .npic-share li a.share-qq           { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/nshare-qq.svg); }
          .vdetail li a.share-qzone, .npic-share li a.share-qzone     { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/nshare-qz.svg);}
          .vdetail li a.share-weibo, .npic-share li a.share-weibo     { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/nshare-wb.svg);}
        `}</style>
      </div>
    )
  }
}
