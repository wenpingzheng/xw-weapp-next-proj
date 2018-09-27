/**
 * @description 列表通用页头组件
 * @param {String} props.chanel - 频道中文名称
 * @author wpzheng
 */

import React, { Component } from 'react'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sticky: false,
      stickyHeight: 0
    }
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="main-header">
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
 