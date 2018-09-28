/**
 * name 底层通用页头组件(仅包含页头)
 *
 * param {
 *   title[String]: 可选,title,一般为频道名，默认为空
 *   hasGoBack[Boolean]: 可选，默认为false,是否显示返回
 *   hasGlobalNav[Boolean]: 可选，默认为false,右侧是否显示去向全站导航
 *   hasBottomShare[Boolean]: 可选,右侧是否显示分享,默认为false
 *   isFixed[Boolean]: 可选，默认为false,是否需要固定在顶部
 *   cssTheme[String]: 可选,为'black'时为黑色
 *   handleReturn[Function]: 左侧返回按钮回调函数
 *   handleGlobalNav[Function]: 右侧去往全站导航回调函数
 *   handleBottomShare[Function]: 右侧分享回调函数
 * }
 * @author limeizhang  2017.07.20
 * modify 增加subTitle
 */
import React, { Component } from 'react'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      title : this.props.title || '',
      subTitle: this.props.subTitle || '',
      goChannelStyle: ''
    }
    this.cssTheme = ''  // 记录是否设置过cssTheme
  }

  handlePrevent (e)  {
    if (this.props.isFixed) {
      e.preventDefault()
    }
  }

  // 点击去往全站导航回调
  handleGoChannelClick = () => {
    // 切换样式
    this.setState({
      goChannelStyle: this.state.goChannelStyle === 'on' ? '' : 'on'
    })
    // 调用回调
    this.props.handleGlobalNav()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // 更新
    this.setState({
      title: nextProps.title,
      subTitle: nextProps.subTitle
    })
  }

  render() {

    let cssTheme = this.props.cssTheme

    return (
      <header id='header' className={`header ${cssTheme} ${this.props.isFixed?'fixed':''}`} onTouchMove={(e) => this.handlePrevent(e)}>
        {
          this.props.hasGoBack &&
          <a
            aria-label="返回"
            role="button"
            className='treturn'
            data-boss='fun=t_return'
            onClick={this.props.handleReturn}
          >
          </a>
        }

        {
          this.state.subTitle ?
            <a className = 'tochannel'>
              <span>{this.state.title}</span>
              <span className='om'>{this.state.subTitle}</span>
            </a>
            :
            <a className = {`tochannel ${(this.props.hasLogo && !this.props.title) ? 'qqlogo' : ''}`}>{this.state.title}</a>
        }

        {
          this.props.hasGlobalNav &&
          <span
            role="button"
            aria-label="全站导航"
            className = {` gochannels ${this.state.goChannelStyle}`}
            style = {{transition: `${this.cssTheme ? '0s' : '0.5s'}`}}
            data-boss = 'fun=t_nav'
            onClick = {this.handleGoChannelClick}
          ></span>
        }

        {
          this.props.hasBottomShare &&
          <span
            role="button"
            aria-label="分享"
            className = "share"
            data-boss = 'fun=t_share'
            onClick = {this.props.handleBottomShare}
          ></span>
        }

        <style jsx>{`
          header {
            font-size: 18px;
            color: #333;
            height: 44px;
            line-height: 44px;
            text-align: center;
            position: relative;
            top: 0px;
            background: #fff;
            width: 100%;
            z-index: 11;
          }
          header::after{
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            background: #e0e0e0;
            width: 100%;
            height: 1px;
            transform: scaleY(0.5);
            transform-origin: bottom left;
          }
          header.black{
            background: rgba(42, 43, 46, 0.7);
            color: #fff;
          }
          header.vdetail {
            background: #181818
          }
          header.black::after{
            background: rgba(42, 43, 46, 0.1);
          }
          header.vdetail:after{
            display: none;
          }
          header .treturn {
            font-size: 17px;
            color: #333;
            left: 0;
            top: 0;
            padding-left:14px;
            position: absolute;
            z-index: 1;
            min-width: 60px;
            text-align: left;
            text-decoration: none;
          }
          header.black .treturn,header.vdetail .treturn{
            color: #fff;
          }
          header .treturn::before,
          header.transparent .treturn::before{
            content: '';
            display: inline-block;
            background: url('data:image/svg+xml;utf8,<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M6.929 11l7.778 7.778a1 1 0 0 1-1.414 1.414l-8.485-8.485a.997.997 0 0 1 0-1.414l8.485-8.485a1 1 0 0 1 1.414 1.414L6.93 11z" fill="%233F4146" fill-rule="evenodd"/></svg>') 0 0 no-repeat;
            width: 20px;
            height: 20px;
            vertical-align: sub;
            margin-right: 6px;
          }
          header.black .treturn::before,header.vdetail .treturn:before, header.fade .treturn::before  {
            content: "";
            display: inline-block;
            background: url('data:image/svg+xml;utf8,<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M6.929 11l7.778 7.778a1 1 0 0 1-1.414 1.414l-8.485-8.485a.997.997 0 0 1 0-1.414l8.485-8.485a1 1 0 0 1 1.414 1.414L6.93 11z" fill="%23FFF" fill-rule="evenodd"/></svg>') 0 0 no-repeat;
          }
          header .tochannel{
            display: block;
            box-sizing: content-box;
            padding: 0px 60px;
            height: 44px;
            line-height: 44px;
            text-decoration: none;
            color: #333;
            white-space: nowrap;
            word-break: break-all;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          header.black .tochannel{
            color: #fff;
          }
          header.fixed {
            position:fixed;
            top:0;
          }

          header.transparent{
            background:unset;
          }
          header.transparent{
            background:rgba(255,255,255,1);
            -webkit-transition: all 500ms ease-out;
          }
          header.fade{
            background:rgba(255,255,255,0);
          }
          header.transparent::after{
            display:none;
          }

          header .gochannels {
            background: url('data:image/svg+xml;utf8,<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><g fill="%233F4146" fill-rule="evenodd"><rect x="2" y="3" width="18" height="2" rx="1"/><rect x="2" y="10" width="18" height="2" rx="1"/><rect x="2" y="17" width="18" height="2" rx="1"/></g></svg>')  0 0 no-repeat;
            background-size: 22px auto;
            margin: 11px 11px 0 0;
            position: absolute;
            right: 0;
            top: 0;
            width: 22px;
            height: 22px;
            z-index: 1;
            -webkit-transition: .5s;
            transition: .5s;
          }
          header.black .gochannels, header.vdetail .gochannels{
            background: url(//mat1.gtimg.com/www/mobi/2017/image/black-icon-image.svg) 0 0 no-repeat;
          }
          header .gochannels.on {
            transform: rotateZ(-180deg);
            transform-origin: center center;
          }
          header .share, header.transparent .share{
            background: url(//mat1.gtimg.com/www/mobi/2017/image/icon-share.svg) 0px 0 no-repeat;
            background-size: 22px;
            margin: 11px 11px 0 0;
            position: absolute;
            right: 0;
            top: 0;
            width: 22px;
            height: 22px;
            z-index: 1;
          }
          header.fade .share{
            background: url(//mat1.gtimg.com/www/mobi/2017/image/icon-share-black.svg) 0px 0 no-repeat;
            background-size: 22px;
          }
          header .om {
            font-size: 11px;
            color: #fff;
            background: #448aff;
            height: 18px;
            line-height: 18px;
            border-radius: 9px;
            padding: 0 6px;
            display: inline-block;
            vertical-align: middle;
            margin: -4px 0 0 6px;
          }
          header .qqlogo {
            display: inline-block;
            width: 150px;
            height: 100%;
            margin: 0 auto;
            -webkit-text-decoration: none;
            text-decoration: none;
            font-size: 0;
            background-repeat: no-repeat;
            background-position: center center;
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/logo-text-color_v2.svg);
            background-size: 97px auto;
          }
        `}</style>
      </header>
    )
  }
}
