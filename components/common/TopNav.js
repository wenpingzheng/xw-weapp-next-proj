/**
 * 横滑导航组件
 *
 * props.channel 是中文名
 * props.channelsite 是英文名
 * 不知道谁起的名字，很奇怪，就这样吧
 */
import React, { Component } from 'react'
import fetchLocation from '../../libs/fetch-location'

// 导航项目配置
import Nav from '../../libs/nav-config/nav-resort'

export default class extends Component {
  constructor(props) {
    super(props)
    this.newChannelDate = 1515068621388 // 新频道上线时间，5天内可显示红点
    // 传入的channel参数在导航第几个
    this.state = {
      hasnew: true, // 频次低，手动维护
      doneclick: true, //新频道按钮是否被用户点击过，默认true，防止红点闪现,
      redDot: false,
      channels: {},
      sort: [],
      idx: 0,
      trackOpacity: 0, // 高亮项目比较靠前不需要滚动 所以直接显示
      isExpand: false // 导航是否展开
    }
  }

  // dom 对象
  elems = {
    track: null, // 滑动轨道
    list: null, // 列表容器
    items: [] // 导航项
  }

  // 获取地方站信息
  getLocal = () => {
    // 获取地方站信息
    fetchLocation.getLocationInfo().then((data) => {
      // console.log(data, 222)
      const provinceName = (data.city || data.province).replace('市', '').replace('省', '') // 地方站名称
      const provinceCode = data.py // 地方站代码（拼地址）
      const sort = this.state.sort

      var channels = Object.assign({}, this.state.channels)

      if (provinceName && provinceCode) {
        channels['local'] = {
          name: provinceName,
          link: `/a/area/${provinceCode}/` ,
          boss: provinceCode ,
          className:'nav_local',
          reserve:''
        }
      } else {
        let i = sort.indexOf('local')
        sort.splice(i, 1)
      }

      this.setState({ channels, sort })

      this.scrollToCurrent(!provinceCode)
    })
  }

  markOnBeforeUnload = () => {
    window.localStorage['xwreddot'] = new Date().getTime()
  }

  hasRedDot = () => {
    if (this.props.channelsite !== 'tuijian') {
      let redDot = window.localStorage['xwreddot']
      let nowtime = new Date().getTime()
      redDot = redDot ? Number(redDot) : 0

      if (nowtime - redDot > 120000) {
        // 大于两分钟
        this.setState({
          redDot: true
        })
      } else {
        let timer = setInterval(() => {
          // 每隔20s判断一次时间
          nowtime = new Date().getTime()
          if (nowtime - redDot > 120000) {
            this.setState({
              redDot: true
            })
            clearInterval(timer);
          }
        }, 10000)
      }
    } else {
      // 进入页面时写入时间，防止离开时写入失败
      this.markOnBeforeUnload()
      // 离开推荐页卡的时间，在localStorage写入标记
      if (window.attachEvent) {
        window.attachEvent('onbeforeunload', this.markOnBeforeUnload);
      } else {
        window.addEventListener('beforeunload', this.markOnBeforeUnload, false);
      }
    }
  }

  componentDidMount() {

    const idx = Nav().newSort.indexOf(this.props.channelsite)

    this.setState({
      doneclick: !!window.localStorage['newsortclick'],
      sort: Nav().newSort,
      channels: Nav().info,
      idx: idx,
      trackOpacity: (idx < 2) ? 1 : 0
    })

    if (Nav().newSort.indexOf('local') > -1) {
      // 如果用户设置不显示地方站，无需调用下面的接口
      this.getLocal()
    }

    this.scrollToCurrent()
    this.setState({ trackOpacity: 1 })
    try {
      this.hasRedDot()
    } catch (e) {
      console.log('localstorage error!')
    }
  }

  scrollToCurrent = (placeholderRemoved) => {
    if (this.state.idx > -1) {
      const idx = (placeholderRemoved && this.state.idx > 2) ? this.state.idx - 1 : this.state.idx
      const target = this.elems.items[idx] // 目标所在元素
      if (target) {
        const leftOffset = target.offsetLeft + Math.round(target.offsetWidth / 2) // 该项中心点距离轨道左侧的位置
        const trackWidth = this.elems.track.offsetWidth // 轨道宽度
        const trackMarginRight = parseFloat(window.getComputedStyle(this.elems.track, null).getPropertyValue('margin-right')) || 0
        const scrollWidth = leftOffset - Math.round((trackWidth + trackMarginRight) / 2) // 要滚动的距离
        this.elems.track.scrollLeft = scrollWidth // 执行滚动
      }
    }
  }

  handleTrackScroll = () => {
    // 滚动时根据位置决定显示或隐藏左右渐变
    const isL = this.elems.track.scrollLeft === 0
    const isR = (this.elems.list.offsetWidth - this.elems.track.scrollLeft) === this.elems.track.offsetWidth
    this.elems.gradientL.style.opacity = isL ? 0 : 1
    this.elems.gradientR.style.opacity = isR ? 0 : 1
  }

  handleNavExpand = () => {
    this.setState({ isExpand: !this.state.isExpand })
  }

  // 从地方站标记中获取地方站对象 "_l_guangzhou|广州" -> {name: '广州', link: '/a/area/guangzhou'}
  getLocalSiteObjFromStr = (str) => {
    const b = str.replace('_l_', '').split('|')
    return {link: `/a/area/${b[0]}`, name: b[1], boss: `local_${b[0]}`}
  }

  render() {

    const channelInfo = this.state.channels
    this.elems.items = this.elems.items.filter((item) => {
      return item !== null
    })
    const hasMoreDot = this.state.hasnew && !this.state.doneclick && (new Date().getTime() - this.newChannelDate < 432000000)
    // const filterSort = this.state.sort.filter((item) => {
    //   return channelInfo[item] !== undefined
    // })

    return (
      <div className={'topnav ' + (this.props.isSticky ? 'sticky' : '')}>
        <div className="scroller">
          <div className="main">
            <div
              className="track"
              ref={(el) => { this.elems.track = el }}
              style={{ opacity: this.state.trackOpacity }}
              onScroll={this.handleTrackScroll}
            >{/* 滑动轨道 */}
              <div className="list" ref={(el) => { this.elems.list = el }}>{/* 频道列表 */}
                {
                  this.state.sort.map((ch, i) => {
                    let c = (ch.indexOf('_l_') === 0) ? this.getLocalSiteObjFromStr(ch) : channelInfo[ch]
                    const isCurrent = this.props.channel === c.name
                    return <a
                      key={i}
                      href={c.link}
                      target="_self"
                      className={`${ch === 'tuijian' && this.state.redDot ? 'tuijian' : ''} ${isCurrent ? 'current' : ''}`}
                      style={{ color: c.placeholder ? '#CCC' : null }}
                      ref={(el) => { this.elems.items[i] = el }}
                      data-boss={`&map=${c.boss}`}
                      hrefLang="zh"
                      aria-label={c.name + (isCurrent ? ' 已选中' : '')}
                    >{c.name}</a>
                  })
                }
              </div>
            </div>
            <div className="gradient-r" ref={(el) => { this.elems.gradientR = el }}></div>{/* 右侧渐变 */}
            <div className="gradient-l" ref={(el) => { this.elems.gradientL = el }}></div>{/* 左侧渐变 */}
            <a
              className={`expand-btn ${hasMoreDot ? 'hasnew' : ''} ${this.state.isExpand ? 'close' : ''}`}
              // onClick={this.handleNavExpand}
              aria-label="展开频道"
              role="button"
              // href="javascript:;"
              href="/m/s/sort"
              target="_self"
            ><i></i></a>
          </div>
        </div>

        <style jsx>{`
          .topnav {
            position: relative;
            z-index: 8;
          }
          .topnav.sticky {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 8;
            width: 100%;
          }
          .scroller {
            display: block;
            height: 35px;
            position: relative;
            overflow: hidden;
            background-color: rgba(255,255,255,.3);
            transition: background 500ms ease-out, padding 300ms;
            padding-top: 0;
          }
          .topnav.sticky .scroller {
            background-color: #FFF;
            background-color: rgba(255,255,255,1);
            padding-top: 1px;
          }
          .scroller::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            background-color: #e4e4e4;
            width: 100%;
            height: 1px;
            transform: scaleY(0.5);
            transform-origin: bottom left;
          }
          .scroller .main .track {
            display: block;
            height: 60px;
            overflow-y: hidden;
            overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            -webkit-user-select: none;
            backface-visibility: hidden;
            margin-right:35px;
            transition: opacity .2s ease-out;
            opacity: 0;
          }
          .scroller .main .track .list {
            display: inline-block;
            vertical-align: top;
            white-space: nowrap;
            word-break: break-all;
            padding: 0 5px 0 2px;
          }
          .scroller .main .track .list a {
            display: inline-block;
            text-decoration: none;
            color: #666;
            font-size: 16px;
            padding: 0 12px;
            height: 35px;
            line-height: 33px;
            vertical-align: top;
            font-family: "PingFangSC-Regular", "Source Han Sans CN", sans-serif;
          }
          .scroller .main .track .list a.current {
            color: #498BF8;
            background-image: url('data:image/svg+xml;utf8,<svg width="10" height="2" xmlns="http://www.w3.org/2000/svg"><rect fill="%23498BF8" fill-rule="nonzero" width="10" height="2" rx="1"/></svg>');
            // color: #d52a35;
            // background-image: url(//mat1.gtimg.com/sports/xw2018/nav-focus.svg);
            background-position: center 28px;
            background-repeat: no-repeat;
            font-family: "PingFangSC-Medium", "Source Han Sans CN", sans-serif;
          }
          .scroller .track a.tuijian::after,
          .scroller .main .expand-btn.hasnew::after {
            content: '';
            background: #ed5151;
            display: block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            float: right;
            margin: 3px -8px 0 2px;
            position: relative;
          }
          .scroller .main .expand-btn.hasnew::after {
            margin: 6px 6px 0 2px;
          }
          .scroller .track a.tuijian.current::after {
            display: none;
          }
          .scroller .main .gradient-l,
          .scroller .main .gradient-r,
          .scroller .main .expand-btn {
            height: 35px;
            position: absolute;
            pointer-events: none;
            top: 0;
            width: 30px;
            backface-visibility: hidden;
            transition: opacity .2s ease-out;
          }
          .scroller .main .gradient-l {
            background: linear-gradient(to left,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
            left:  0;
            opacity: 0;
          }
          .scroller .main .gradient-r {
            background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%);
            right: 0;
            opacity: 1;
            width: 60px;
          }
          .scroller .main .expand-btn {
            width: 32px;
            height: 34px;
            right: 0px;
            pointer-events: auto;
            z-index: 3;
          }
          .scroller .main .expand-btn i {
            display: block;
            height: 100%;
            background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h12a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 5h12a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h12a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" fill="%233F4146" fill-rule="evenodd"/></svg>');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 20px 20px;
            transform-origin: center;
          }
          .scroller .main .expand-btn.close i { transform: rotate(90deg); }
        `}</style>
      </div>
    )
  }
}
