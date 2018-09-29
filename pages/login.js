/**
 * 登录页
 * URL: /login
 */
import { Component } from 'react'
import Layout from '../layouts/CoreLayout'

import login from '../libs/login'
import cookie from 'js-cookie'

// 公共模块
import ArticleHeader from '../components/common/ArticleHeader'
import pgvSimple from '../libs/pgv-simple'
import finalboss from '../libs/finalboss-lite'

// 主组件
export default class extends Component {
  constructor (props) {
    super(props)
    this.main_login = cookie.get('main_login')
    this.state = {
    }
  }

  static async getInitialProps ({ query }) {
    const ssr = !query.static
    if (!ssr) return { ssr }
    return { ssr }
  }

  async componentDidMount () {
    // 非 ssr 获取数据
    // if (!this.props.ssr) {}
    this.checkLogin()

    // pgv 上报
    pgvSimple('', {virtualDomain: '', virtualURL: ''})


    // finalboss-lite 加载及启动
    finalboss.ready((fb) => {
      fb({
        template: {
          click: 'BossId=4919&Pwd=187500179&refer={REFER}&pagetype=login&pac_uid={COOKIE.pac_uid}&s_click={%v}&network={UANETTYPE}&_dc={RANDOM}',
          expo: 'BossId=4787&Pwd=1286385847&page=login&source={REFER}&network={UANETTYPE}&pac_uid={COOKIE.pac_uid}&_dc={RANDOM}'
        }
      }).start()
    })
  }

  checkLogin () {
    if ((this.main_login == 'qq' && !!cookie.get('skey') && !!cookie.get('uin')) || (this.main_login == 'wx' && !!cookie.get('wx_openid') && !!cookie.get('wx_access_token'))) {
      // 已登录
      window.location.href = '/'
    }
  }

  handleClick (type) {
    cookie.set('main_login',type,{domain:'.qq.com'})

    if (type == 'wx') {
      let redirect_uri = 'https://xw.qq.com/service/weixin/oauth'
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0787f93501204fe5&redirect_uri='+encodeURIComponent(redirect_uri)+'&response_type=code&scope=snsapi_base&state=#wechat_redirect'
    } else if (type == 'qq') {
      let redirect_uri = cookie.get('xw_lastpage')
      redirect_uri = redirect_uri ? redirect_uri : 'https://xw.qq.com/'
      login.Passport.login(redirect_uri)
    }
  }


  render () {

    // 主结构
    return (
      <div data-boss-expo='pv'>
        <Layout title='登录'>
          <ArticleHeader
            title={'登录腾讯网'}
            hasGoBack={true}
            hasGlobalNav={false} />
          <div className='main'>
            <div className='userInfo'>
              <div className='avatar'></div>
              <div className='info'>登录阅读个性化资讯</div>
            </div>
            <div>
              <a className='qq' onClick={this.handleClick.bind(this,'qq')} data-boss='qqlogin' role="button" aria-label="QQ登录">QQ登录</a>
              <a className='wx' onClick={this.handleClick.bind(this,'wx')} data-boss='wxlogin' role="button" aria-label="微信登录">微信登录</a>
            </div>
            <style jsx>{`
              .userInfo {
                margin:50px auto 50px;
                position: relative;
                text-align: center;
              }
              .userInfo .avatar {
                width: 82px;
                height: 82px;
                background: url(//mat1.gtimg.com/www/mobi/2017/image/loginavatar.svg) no-repeat;
                background-size: 82px;
                margin: 10px auto;
              }
              .userInfo .info {
                font-size: 12px;
                color: #999;
                line-height: 16px;
                background: #f9f9f9;
                position: relative;
                z-index: 2;
                display: inline-block;
                padding: 0 6px;
              }
              .userInfo:after {
                content: '';
                position: absolute;
                height: 1px;
                width: 200px;
                bottom: 8px;
                left: 50%;
                margin-left:-100px;
                background: #eaeaea;
                transform: scaleY(0.5);
                transform-origin: 0 0;
              }
              .qq,.wx {
                display: block;
                width: 200px;
                height: 44px;
                line-height: 44px;
                text-align: center;
                margin: 20px auto 0;
                color: #fff;
                text-decoration: none;
                border-radius: 4px;
              }
              .qq {
                background: #11b7f5;
              }
              .wx {
                background: #48c14c;
              }
            `}</style>
            <style global jsx>{`
              body {
                background: #f9f9f9;
              }
            `}</style>
          </div>
        </Layout>
      </div>
    )
  }
}
