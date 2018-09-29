/**
 * @description - 全站顶部组件
 * @author - wpzheng
 */

import React, { Component } from 'react'
import cookie from 'js-cookie'
import login from '../../libs/login'
import removeUrlHttpProtocal from '../../libs/remove-url-http-protocal'
import UserIcon from './UserIcon'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mounted: false,
      isLogin: false,
      userInfo: null
    }
  }

  componentDidMount() {
    const main_login = cookie.get('main_login')
    const isSkey = cookie.get('skey') && cookie.get('uin') // 同步评论系统的登录校验
    const isWx = cookie.get('wx_openid') && cookie.get('wx_access_token')
    // 判断是哪种登录方式
    if (main_login == 'qq' && isSkey) {
      login.Passport.getUserInfo((data) => {
        if (data && data.result === '0') {
          this.setState({
            isLogin: true,
            userInfo: { nick: data.nick, avatar: data.Face }
          })
        } else {
          cookie.remove('main_login', { domain: '.qq.com' })
          cookie.remove('skey', { domain: '.qq.com' })
          cookie.remove('uin', { domain: '.qq.com' })
          this.setState({ isLogin: false })
        }
        this.setState({ mounted: true })
      })
    } else if (main_login == 'wx' && isWx) {
      this.setState({
        isLogin: true,
        mounted: true,
        userInfo: {
          nick: '微信网友',
          avatar: '//mat1.gtimg.com/www/mobi/2017/image/wxloginpic.svg'
        }
      })
    } else {
      cookie.remove('main_login', { domain: '.qq.com' })
      this.setState({ isLogin: false, mounted: true })
    }
  }

  goLogin = () => {
    // login.Passport.login()
    cookie.set('xw_lastpage', window.location.href, { domain: '.qq.com' })
    window.location.href = '/login'
  }

  // 头像加载失败 替换默认图
  handleAvatarImageErrored = (event) => {
    const placeHolderImage = '//mat1.gtimg.com/www/mobi/2017/image/default_uicon.png'
    const img = event.target
    if (img.src !== placeHolderImage) { img.src = placeHolderImage }
  }

  render() {
    let skinClass = this.props.skin ? ('skin-' + this.props.skin) : ''

    return (
      <div className={`site-header skin-default ${skinClass}`}>
        <div className="main">
        
          {/* 中部logo */}
          {this.props.home ? <a className="gohome" href="/" target="_self" style={{ backgroundImage: this.props.homeLogo }} data-boss="s_click=p_home"></a> : ''}

          {/* 左右两侧图标 */}
          {this.props.tag ? <a className="logo icon" href="javascript:;" style={{ backgroundImage: 'url(' + this.props.tag + ')' }} target="_self" role="button" aria-label="首页" data-boss="time"></a> : <a className="logo" href="javascript:;" target="_self" role="button" aria-label="首页" data-boss="time"></a>}

          {/* 已登录 */}
          {
            (this.state.mounted && this.state.isLogin) && (
              // 个人中心：/iphone/m/mynews/
              <a className="nick" href="/m/s/usercenter" tabIndex="0" target="_self" title="个人中心">
                <img
                  src={removeUrlHttpProtocal(this.state.userInfo.avatar)}
                  onError={this.handleAvatarImageErrored}
                />
              </a>
            )
          }

          {/* 未登录 */}
          {
            (this.state.mounted && !this.state.isLogin) && (
              <a className="login" href="javascript:;" target="_self" title="登录" onClick={this.goLogin} data-boss={this.props.home ? `s_click=p_login` : `login`}>
                <UserIcon skin={this.props.skin || ''} />
              </a>
            )
          }
        </div>

        <style jsx>{`
          .site-header {
            display: block;
            height: 44px;
            line-height: 44px;
          }
          .site-header .main {
            position: relative;
            height: 100%;
            text-align: center;
            background-size: 100%;
          }
          .site-header .main .login,
          .site-header .main .nick,
          .site-header .main .gohome {
            display: block;
            position: absolute;
            right: 10px;
            top: 12px;
            line-height: 1;
            color: #FFF;
            text-decoration: none;
          }
          .site-header .main .gohome{
            right:unset;
            left:10px;
            width:22px;
            height:22px;
            background:url(//mat1.gtimg.com/www/mobi/2017/image/find/home.svg);
            background-repeat:no-repeat;
            background-position:center center;
            background-size:22px auto;
          }
          .site-header .main .nick {
            width: 25px;
            height: 25px;
            top: 10px;
            outline: none;
          }
          .site-header .main .nick img {
            border-radius: 50%;
            width: 100%;
          }
          .site-header .main .logo {
            display: inline-block;
            width: 150px;
            height: 100%;
            margin: 0 auto;
            text-decoration: none;
            font-size: 0;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/logo-text-color_v2.svg);
            background-size: 97px auto;
            outline: none;
          }
          .site-header .main .logo.icon{
            background-size:auto 46%;
            -webkit-tap-highlight-color:rgba(255,0,0,0);
          }
          /* 默认皮肤 */
          .skin-default {
            background-color: #FFF;
          }
          /* 十九大 */
          .skin-19da {
            background: #cc0809;
          }
          .skin-19da .main {
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/shijiudatop.jpg);
          }
          /* 2018春节 */
          .skin-2018cj { background-image: linear-gradient(to bottom, rgba(237,55,51,1) 0%,rgba(252,106,67,1) 100%); }
          .skin-2018cj .main { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/2018cj_header_bg1.png); }
          .skin-2018cj .main .logo { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/logo-text-whitetext.svg); }
          /* 2018两会 */
          .skin-2018lh { background-image: linear-gradient(to bottom, rgba(237,55,51,1) 0%,rgba(252,106,67,1) 100%); }
          .skin-2018lh .main { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/2018lh_header_bg.png); }
          .skin-2018lh .main .logo { background-image: url(//mat1.gtimg.com/www/mobi/2017/image/logo-text-whitetext.svg); }
          /* 世界杯皮肤 */
          .skin-worldcup {
            background-color: #244fa9;
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/worldcupskinxw.png);
            background-size: cover;
          }
          .site-header.skin-worldcup .main .logo {
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/worldcuplogo3x.png);
            background-size: 100px auto;
            margin: 2px auto 0;
          }
        `}</style>
      </div>
    )
  }
}