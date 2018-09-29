/**
 * name 分享指引浮层组件
 * param {
 *   isShow[Boolean]: 是否显示当前浮层
 *   guideStyle[String]:ShareGuide的样式
 *   updateGuideStatus[Function]: 更新父组件的状态
 * }
 * @author limeizhang
 * date 2017.07.24
 * modified by liyuanfeng
 * date 2017.10.10
 */
import React, { Component } from 'react'

export default class extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isShow: false,
      guideStyle: this.props.guideStyle
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    // 更新
    this.setState({
      isShow: nextProps.isShow,
      guideStyle: nextProps.guideStyle
    })
  }

  hideLayer = () => {
    this.setState({
      isShow: false
    })
    this.props.updateGuideStatus(false)
  }

  render() {
    const isShow = this.state.isShow? 'on' : ''
    return (
      <div
        className={`share-layer ${isShow} ${this.state.guideStyle}`}
        onClick={this.hideLayer}
      >
        <style jsx>{`
          .share-layer{
            width: 100%;
            height: 100%;
            z-index: 99999;
            position: fixed;
            left: 0;
            top: 0;
            background: url(//mat1.gtimg.com/www/mobi/image/weinxin_share_dialog.png) no-repeat right top rgba(0,0,0,.5);
            background-size: 234px 95px;
            display: none;
          }
          .share-layer.on{
            display: block
          }
          .guidewxf{
            background:url(//mat1.gtimg.com/www/mobi/2017/image/guidewxf.png) rgba(0,0,0,.8) 50% 85% no-repeat;
            background-size: 80%;
          }
          .guidewxt{
            background:url(//mat1.gtimg.com/www/mobi/2017/image/guidewxt.png) rgba(0,0,0,.8) 50% 85% no-repeat;
            background-size: 76%;
          }
          .guideqq{
            background:url(//mat1.gtimg.com/www/mobi/2017/image/guideqq.png) rgba(0,0,0,.8) 50% 85% no-repeat;
            background-size: 80%;
          }
          .qqlayout{
            background-image:url(//mat1.gtimg.com/www/mobi/2017/image/qq_share_dialog.png);
          }
        `}</style>
      </div>
    )
  }
}
