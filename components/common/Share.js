/**
 * name 通用分享组件
 * param {
 *   title[String]:标题,
 *   desc[String]:描述,
 *   img[String]:缩略图,
 *   type[String]: 可选,为bottom时，为页脚分享组件
 *   showBottomShare[Boolean]: 可选, 是否显示页脚分享组件
 *   updateBottomShareStatus[Function]: 可选,与showBottomShare关联,更新父组件的状态
 * }
 * @author limeizhang
 * date 2017.07.24
 * modified by liyuanfeng
 * date 2017.10.10
 * add showNewPicStyle
 * date 2018.04.06
 * add 网络优化 展示时才加载图标 by jamieyan
 */
import React, { Component } from 'react'
import ShareList from './ShareList'
import ShareGuide from './ShareGuide'

export default class extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showShareGuide: false,  // 是否显示ShareGuide组件
      guideStyle: '', // ShareGuide组件的样式
      showBottomShare: false, // 是否显示页脚分享组件
      showNewPicStyle: false, // 是否显示新图片站分享样式
      iconsDisplay: false, // 图标区域是否显示（优化图片加载）
    }
  }

  _mounted = false

  componentDidMount() {
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  iconsDisplayTimer = null
  UNSAFE_componentWillReceiveProps(nextProps) {
    // 如要显示，先设置成block
    if (nextProps.showBottomShare && this.shareWrap) {
      this.shareWrap.style.display = 'block'
    }
    // 加延迟为了显示动画不丢失
    setTimeout(() => {
      if (!this._mounted) {
        return
      }
      this.setState({
        showBottomShare: nextProps.showBottomShare,
        showNewPicStyle: nextProps.showNewPicStyle
      })
      if (!nextProps.showBottomShare) {
        this.iconsDisplayTimer = setTimeout(() => {
          if (this._mounted) {
            this.setState({ iconsDisplay: false })
          }
        }, 500) // 需要比css中的transition时间长
      } else {
        this.iconsDisplayTimer && clearTimeout(this.iconsDisplayTimer)
        this.setState({ iconsDisplay: true })
      }
    }, 10)
  }

  setGuideStyle = (guideStyle) => {
    // 显示ShareGuide并设置样式
    this.setState({
      showShareGuide: true,
      guideStyle: guideStyle
    })
  }

  shareListClickHandler = () => {
    // 隐藏底部分享，显示ShareGuide
    this.setState({
      showBottomShare: false
    })
    this.props.updateBottomShareStatus(false)
  }

  cancelClickHandler = () => {
    // 隐藏底部分享
    this.setState({
      showBottomShare: false
    })
    this.props.updateBottomShareStatus(false)
  }

  updateGuideStatus = (isShow) => {
    // 更新ShareGuide状态
    this.setState({
      showShareGuide: isShow
    })
  }

  render() {
    return (
      <div>
        {
          // 视频底层使用 type='vdetail'
          (this.props.type !== 'bottom')
            ? <ShareList
              title={this.props.title}
              desc={this.props.desc}
              img={this.props.img}
              url={this.props.url}
              setGuideStyle={this.setGuideStyle}
              type={this.props.type}
            />
            :
            <div
              className={`share-wrap ${this.state.showBottomShare ? 'on' : ''} ${this.props.showNewPicStyle ? 'newpic-share' : ''}`}
              ref={(c) => { this.shareWrap = c }}
            >
              <div
                className='share-list'
                style={{ display: this.state.iconsDisplay ? 'block' : 'none' }}
                onClick={this.shareListClickHandler}
              >
                <ShareList
                  title={this.props.title}
                  desc={this.props.desc}
                  img={this.props.img}
                  url={this.props.url}
                  setGuideStyle={this.setGuideStyle}
                  showNewPicStyle={this.state.showNewPicStyle}
                  showText={false}
                />
              </div>
              <div className='cancel' data-boss={`fun=f_cancel${this.state.showNewPicStyle ? '&pagetype=tjdc' : ''}`} onClick={this.cancelClickHandler}>取消</div>
              <div className="border-wrap"></div>
            </div>
        }

        <ShareGuide
          isShow={this.state.showShareGuide}
          guideStyle={this.state.guideStyle}
          updateGuideStatus={this.updateGuideStatus}
        />

        {this.props.type === 'bottom' && <div className={`layer ${this.state.showBottomShare ? 'on' : ''}`} onClick={this.cancelClickHandler}></div>}

        <style jsx>{`
          .share-wrap {
            display:none;
            position: fixed;
            bottom: 0;
            height: 145px;
            background: #fff;
            width: 100%;
            text-align: center;
            z-index: 20;
            border: 1px solid #e0e0e0;
            transform: translateY(100%);
            transition: transform .4s;
            will-change: transform;
          }
          .border-wrap{
            display:none;
          }
          .newpic-share{
            background:#2E2F32;
            border:0;
          }
          .newpic-share .border-wrap{
            display:block;
            -webkit-transform:scale(0.5);
            transform:scale(0.5);
            position:absolute;
            border:1px solid #45464C;
            top:-50%;
            right:-50%;
            bottom:-50%;
            left:-50%;
            z-index:-1;
          }
          .share-wrap.on {
            transform: translateY(0);
          }
          .share-list {
            padding: 30px 14px 10px 14px;
          }
          .cancel {
            height: 45px;
            line-height: 45px;
            font-size: 18px;
            color: #808288;
            position: absolute;
            bottom: 0;
            width: 100%;
            text-align: center;
          }
          .cancel::before {
            content: '';
            position: absolute;
            left: 0;
            background: #e0e0e0;
            width: 100%;
            height: 1px;
            transform: scaleY(0.5);
            transform-origin: 0 0;
          }
          .newpic-share  .cancel::before{
            background:#404147;
          }
          .layer {
            position: fixed;
            top: 0;
            left: 0;
            background: rgba(0,0,0,.5);
            height: 100%;
            width: 100%;
            display: none;
            z-index: 11;
          }
          .layer.on {
            display: block;
          }
        `}</style>
      </div>
    )
  }
}
