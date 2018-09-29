/**
 * @description 列表通用页头组件
 * @param {String} props.chanel - 频道中文名称
 * @author wpzheng
 */

import React, { Component } from 'react'
import SitehHeader from '../common/SiteHeader'
import TopNav from '../common/TopNav'
import isPassiveEeventSupport from '../../libs/is-passive-event-support'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sticky: false,
      stickyHeight: 0
    }
  }

  stickyElem = null

  componentDidMount() {
    const top = this.stickyElem.offsetTop || 44
    const height = this.stickyElem.offsetHeight
    this.setState({ stickyHeight: height })

    let supportPageOffset = window.pageXOffset !== undefined
    let isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat')

    const refresh = () => {
      const scrollY = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop
      const toSticky = scrollY >= top
      if (toSticky !== this.state.sticky) {
        this.setState({ sticky: toSticky })
      }
    }

    const hasPassive = isPassiveEeventSupport()
    const events = ['scroll', 'load', 'resize', 'orientationchange']
    events.forEach((type) => {
      window.addEventListener(type, refresh, hasPassive ? { passive: true } : false)
    })

    refresh()
  }

  render() {
    return (
      <div className="main-header">
        <SitehHeader />
        <div ref={(el) => this.stickyElem = el}>
          <TopNav
            channel={this.props.channel}
            channelsite={this.props.channelsite}
            isSticky={this.state.sticky}
          />
        </div>
        <div
          className="sticky-placeholder"
          style={{
            height: this.state.stickyHeight,
            display: this.state.sticky ? 'block' : 'none'
          }}
        >
          <style jsx>{`
          .stick-placeholder{
            display: none;
          }
        `}</style>
        </div>
      </div>
    )
  }

}
