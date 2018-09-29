/**
 * name 底层通用页头组件(包含全站导航的页头)
 *
 * param {
 *   title[String]: 可选,title,一般为频道名，默认为空
 *   hasGoBack[Boolean]: 可选,左边是否显示返回,默认为false
 *   hasGlobalNav[Boolean]: 可选,右侧是否显示去向全站导航,默认为false
 *   hasBottomShare[Boolean]: 可选,右侧是否显示分享,默认为false
 *   shareTitle[String]: 可选,标题,
 *   shareDesc[String]: 可选,描述,
 *   shareImg[String]: 可选,缩略图,
 *   isScroll[Boolean]: 可选,是否需要跟随滚动显示,默认为false
 *   cssTheme[String]: 可选,为'black'时为黑色,默认为空，显示白色
 * }
 * @author limeizhang  2017.07.20
 * modify 增加 subTitle 2017.12.14
 */

import React, { Component } from 'react'
import Headroom from '../../libs/react-headroom'
import elementClass from '../../libs/element-class'
import HeaderNav from './HeaderNav'
import GlobalNav from './GlobalNav'
import Share from './Share'

export default class extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showGlobalNav : false,  // 是否显示全站导航,
      showBottomShare: false, // 是否显示分享
      title : this.props.title,
      subTitle: this.props.subTitle || '',
      isFixed: false, // 是否固定头部
      cssTheme: this.props.cssTheme,
      zIndex: 11,
    }
  }

  // 左边按钮点击回调
  handleReturn = () => {
    if (!this.state.showGlobalNav) {
      // 来自图片分类页面的返回
      if(
        this.state.cssTheme &&
        this.state.cssTheme.indexOf('transparent') !== -1 && // 如果透明主题
        window.location.pathname.indexOf('/m/find/findpage') === 0 // 如果当前在发现页
      ) {
        window.location.href = '/m/find#?tag=1'
      } else {
        if (window.history.length > 1) {
          window.history.go(-1) // 返回上一页
        } else {
          window.location.href = '/'  // 返回首页
        }
      }
    } else {
      this.handleGlobalNav()  // 隐藏全站导航
    }
  }

  // 切换全站导航
  handleGlobalNav = () => {
    if (!this.state.showGlobalNav) {
      this.setState({
        showGlobalNav: true,
        title: '全站导航',
        isFixed: true,
        cssTheme: ''
      })
      elementClass(document.documentElement).add('noscroll')
    } else {
      this.setState({
        showGlobalNav: false,
        title: this.props.title,
        isFixed: false,
        cssTheme: this.props.cssTheme
      })
      elementClass(document.documentElement).remove('noscroll')
    }
  }

  // 显示分享组件
  handleBottomShare = () => {
    this.setState({
      showBottomShare: true
    })
  }

  updateBottomShareStatus = (showBottomShare) => {
    // 更新状态
    this.setState({
      showBottomShare: showBottomShare
    })
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // 更新
    this.setState({
      title: nextProps.title,
      subTitle: nextProps.subTitle,
      cssTheme: nextProps.cssTheme,
    })

    if(nextProps.cssTheme === 'transparent fade'){
      setTimeout(()=>{
        this.setState({
          zIndex: 7
        })
      },20)
    } else {
      this.setState({
        zIndex: 7
      })
    }
  }

  render() {
    const MyHeader = <HeaderNav
      title={this.state.title}
      subTitle={this.state.subTitle}
      hasGoBack={this.props.hasGoBack}
      hasGlobalNav={this.props.hasGlobalNav}
      hasBottomShare={this.props.hasBottomShare}
      cssTheme={this.state.cssTheme}
      isFixed={this.state.isFixed}
      handleReturn={this.handleReturn}
      handleGlobalNav={this.handleGlobalNav}
      handleBottomShare={this.handleBottomShare}
      isScroll={this.props.isScroll}
      hasLogo={this.props.hasLogo}
    />

    return (
      <div style={this.props.hide ? {display: 'none'} : {}}>
        {
          (this.props.isScroll && !this.state.showGlobalNav) ?
            <Headroom style={{zIndex:this.state.zIndex}}>
              { MyHeader }
            </Headroom>
            :
            MyHeader
        }

        {
          this.props.hasGlobalNav &&
          <div
            className={`menuList ${this.state.showGlobalNav?'on':''}`}
            onTouchMove ={() => {}}
          >
            <GlobalNav noHeader={true} />
          </div>
        }

        {
          this.props.hasBottomShare &&
          <Share
            title={this.props.shareTitle}
            desc={this.props.shareDesc}
            img={this.props.shareImg}
            showBottomShare={this.state.showBottomShare}
            updateBottomShareStatus={this.updateBottomShareStatus}
            type={'bottom'}
          />
        }

        <style jsx>{`
          .menuList {
            display: block;
            position: fixed;
            background-color: #fff;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            z-index:10;
            overflow-x: hidden;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            padding-top: 44px;
            transition: transform .4s;
            transform: translateX(100%);
            will-change: transform;
          }
          .menuList.on {
            transform: translateX(0);
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
