/**
 * @description - 用户图标（登录按钮）组件  20px*20px
 * @param {string} skin - 图标线条颜色
 * @author wpzheng
 */

import React, { Component } from 'react'


export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const skinClass = this.props.skin ? ('skin-' + this.props.skin) : ''
    return (
      <i className={`user-icon ${skinClass}`}>
        <style jsx>{`
          .user-icon {
            display: inline-block;
            width: 22px;
            height: 22px;
            position: relative;
            overflow: hidden;
            vertical-align: top;
            margin: 0 auto;
            padding: 0;
            font-size: 0;
            background-image: url('data:image/svg+xml;utf8,<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path d="M22 11c0 6.074-4.925 11-11 11S0 17.074 0 11 4.925 0 11 0s11 4.926 11 11" fill="%23D4D8DF"/><path d="M19.647 17.8A10.98 10.98 0 0 1 11 22a10.98 10.98 0 0 1-8.647-4.2 6.434 6.434 0 0 1 4.423-2.572l.61-.12a1.095 1.095 0 0 0 .524-1.885l.004-.001a3.945 3.945 0 0 1-1.37-2.99V7.755a4.455 4.455 0 0 1 8.91 0v2.477a3.94 3.94 0 0 1-1.369 2.99h.005a1.096 1.096 0 0 0 .524 1.885l.61.121a6.434 6.434 0 0 1 4.423 2.572z" fill="%23BFC6D1"/></g></svg>');
            background-position: right center;
            background-repeat: no-repeat;
          }
          .user-icon.skin-tuyan {
            background-image: url('data:image/svg+xml;utf8,<svg width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path d="M8.017 11.665a4 4 0 1 1 5.965 0 7.023 7.023 0 0 1 3.585 3.905 8.046 8.046 0 0 1-1.618 1.716 5.001 5.001 0 0 0-9.898 0 8.046 8.046 0 0 1-1.618-1.716 7.023 7.023 0 0 1 3.584-3.905zM11 21C5.477 21 1 16.523 1 11S5.477 1 11 1s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="%23212121" fill-rule="evenodd"/></svg>');
          }
          .user-icon.skin-worldcup {
            background-image: url(//mat1.gtimg.com/www/mobi/2017/image/usercentericon.svg)
          }
        `}</style>
      </i>
    )
  }
}
