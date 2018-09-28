/**
 * 全站导航组件(导航+编辑)
 *
 * @author jamieyan
 */
import { Component } from 'react'
import {
  remove as removeArrayItem,
  pullAll as pullAllArray,
} from 'lodash/array'
import HeaderTap from '../../components/common/HeaderTap'
import fetchLocation from '../../libs/fetch-location'
import navResort from '../../libs/nav-config/nav-resort'

const recLocalList = [ // 推荐的地方站频道
  '_l_guangdong|广东', '_l_guangzhou|广州', '_l_shenzhen|深圳', '_l_beijing|北京', '_l_shanghai|上海',
  '_l_wuhan|武汉', '_l_fujian|福建', '_l_chengdu|成都', '_l_hangzhou|杭州', '_l_chongqing|重庆',
  '_l_shijiazhuang|石家庄', '_l_hebei|河北', '_l_henan|河南', '_l_xian|西安', '_l_jiangsu|江苏',
  '_l_liaoning|辽宁', '_l_zhejiang|浙江', '_l_hainan|海南', '_l_tianjin|天津', '_l_yinchuan|银川'
]

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editMode: false,
      channels: {}, // 全部频道信息
      userList: null, // 用户添加的频道(此处不同于其他list，先设置为null，因为要通过这个判断用户配置是否已加载)
      abandonList: [], // 用户未添加的频道
      localList: null,
      currentTab: 'normal', // normal/local 普通/地方站页卡
    }
  }

  componentDidMount () {
    const defaultInfo = navResort()
    // 从recLocalList中，排除用户已经添加的频道
    this.setState({
      channels: defaultInfo.info,
      userList: defaultInfo.newSort,
      abandonList: defaultInfo.newAbandon.concat(defaultInfo.newHideRec), // 推荐频道显示用户删除的和默认隐藏的频道
      localList: pullAllArray(recLocalList, defaultInfo.newSort), // 从默认推荐的地方站频道中，移除用户已经添加过的
    })

    fetchLocation.getLocationInfo().then((data) => {
      // const provinceName = data.province.replace('市', '').replace('省', '') // 地方站名称
      const provinceName = (data.city || data.province).replace('市', '').replace('省', '') // 地方站名称
      const provinceCode = data.py // 地方站代码（拼地址）
      if (provinceName && provinceCode) { // 插入地方站导航
        this.setState({
          channels: Object.assign({}, this.state.channels, {
            'local': { name: provinceName, link: `/a/area/${provinceCode}/` , boss: provinceCode , className: 'nav_local' }
          })
        })
      }
    })
    // console.log(fetchLocation.getLocationInfoByPy('beijing'))
  }

  switchEditMode () {
    // 保存
    if (this.state.editMode) {
      this.handleSave()
    }
    // 更改状态
    this.setState({editMode: !this.state.editMode})
  }

  // 恢复默认设置
  resetDefault () {
    if (window && window.localStorage) {
      try {
        window.localStorage.removeItem('xwChannel')
        window.localStorage.removeItem('xwAbandon')
        window.location.reload()
      } catch (e) {/**/}
    }
  }

  swichTab (targetTab) {
    this.setState({currentTab: targetTab})
  }

  handleEdit (event, method, ch) {
    if (!this.state.editMode || !method) { // 非编辑模式什么也不要做
      return
    } else {
      event.preventDefault()
    }
    const isDFZ = ch.indexOf('_l_') === 0
    let userList
    let abandonList
    let localList
    if (method === 'add') {
      userList = this.state.userList.concat(ch)
      if (isDFZ) {
        localList = removeArrayItem(this.state.localList, (n) => n !== ch)
      } else {
        abandonList = removeArrayItem(this.state.abandonList, (n) => n !== ch)
      }
    } else if (method === 'del') {
      userList = removeArrayItem(this.state.userList, (n) => n !== ch)
      if (isDFZ) {
        localList = this.state.localList.concat(ch)
      } else {
        abandonList = this.state.abandonList.concat(ch)
      }
    }
    if (isDFZ) {
      this.setState({userList, localList})
    } else {
      this.setState({userList, abandonList})
    }
  }

  handleSave () {
    if (window && window.localStorage) {
      try {
        window.localStorage.setItem('xwChannel', JSON.stringify(this.state.userList))
        window.localStorage.setItem('xwAbandon', JSON.stringify(this.state.abandonList))
      } catch (e) {
        alert('隐身模式不支持导航排序!')
      }
    }
  }

  handleBack () {
    if (window && window.history && window.history.length > 1) {
      window.history.back()
    } else {
      window.location.href = '/'
    }
  }

  /**
   * 将特殊的地方站频道名转换为包含link和name的对象
   * @param {string} str 本地频道字符串 如: _l_beijing|北京
   */
  parseLocationInfo (str = '') {
    if (str.indexOf('_l_') !== 0) {
      return null
    }
    let [py, name] = str.replace('_l_', '').split('|')
    return {link: `/a/area/${py}`, name}
  }

  handleTouch = (e) => {
    try { e.stopPropagation() } catch (e) {/**/}
  }

  render() {
    return (
      <div className="main" onTouchMove={(e) => this.handleTouch(e)}>
        { !this.props.noHeader && <HeaderTap title="全部频道" handleClick={()=>{this.handleBack()}}/> }
        <div className="section-title">
          <h3>我的频道</h3>
          <span className="status">点击{this.state.editMode ? '移除' : '进入'}频道</span>
          <button
            type="button"
            className={`edit edit-${this.state.editMode ? 'done' : 'enter'}`}
            onClick={() => this.switchEditMode()}
          >{this.state.editMode ? '完成' : '编辑'}</button>
          { this.state.editMode ? <button type="button" className="reset" onClick={() => this.resetDefault()}>恢复默认设置</button> : null }
        </div>
        <ul className={`ch-list ${this.state.editMode ? 'edit-mode edit-status-del' : ''}`}>
          {
            this.state.userList && this.state.userList.map((ch, i) => {
              let chInfo = (ch.indexOf('_l_') === 0) ? this.parseLocationInfo(ch) : this.state.channels[ch]
              const isEditable = (chInfo.className || '').indexOf('static') === -1
              return (
                <li key={i}>
                  <a
                    href={this.state.editMode ? 'javascript:;' : chInfo.link}
                    target="_self"
                    onClick={(e) => this.handleEdit(e, isEditable ? 'del' : null, ch)}
                    className={`${isEditable ? 'editable' : 'uneditable'}`}
                  >{chInfo.name}</a>
                </li>
              )
            })
          }
        </ul>

        {
          this.state.userList && // 用户列表加载完后再显示此处防止页面跳动
          <div className="section-title underline">
            <h3 className={this.state.currentTab === 'normal' ? 'current' : ''}><a href="javascript:;" target="_self" onClick={() => this.swichTab('normal')}>推荐频道</a></h3>
            <h3 className={this.state.currentTab === 'local'  ? 'current' : ''}><a href="javascript:;" target="_self" onClick={() => this.swichTab('local') }>地方频道</a></h3>
            <span className="status right">点击{this.state.editMode ? '添加' : '进入'}频道</span>
          </div>
        }
        <ul className={`ch-list ${this.state.editMode ? 'edit-mode edit-status-add' : ''}`}>
          {
            // 推荐频道页卡
            (this.state.currentTab === 'normal') &&
            (
              (this.state.abandonList.length > 0) ?
                this.state.abandonList.map((ch, i) => (
                  <li key={i}>
                    <a
                      href={this.state.editMode ? 'javascript:;' : this.state.channels[ch].link}
                      target="_self"
                      onClick={(e) => this.handleEdit(e, 'add', ch)}
                    >{this.state.channels[ch].name}</a>
                  </li>
                ))
                :
                <div className="list-blank">您已添加全部推荐频道</div>
            )
          }
          {
            // 地方频道页卡
            (this.state.currentTab === 'local') &&
            <div>
              {
                (this.state.localList.length > 0) ?
                  this.state.localList.map((ch, i) => {
                    const chInfo = this.parseLocationInfo(ch)
                    return (
                      <li key={i}>
                        <a
                          href={this.state.editMode ? 'javascript:;' : chInfo.link}
                          target="_self"
                          onClick={(e) => this.handleEdit(e, 'add', ch)}
                        >{chInfo.name}</a>
                      </li>
                    )
                  })
                  :
                  <div className="list-blank">您已添加全部地方频道</div>
              }
              <div className="more"><a href="/m/s/loc">更多地方频道</a></div>
            </div>
          }
        </ul>
        <style jsx>{`
          .main { background: white; }
          .section-title {
            position: relative;
            height: 16px;
            line-height: 16px;
            padding-top: 15px;
            margin: 0 20px 9px;
            box-sizing: content-box;
          }
          .section-title.underline { height: 28px; }
          .section-title.underline::after {
            content: '';
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            background: #e9e9e9;
            width: 100%;
            height: 1px;
            transform: scaleY(0.5);
            transform-origin: bottom left;
          }
          .section-title h3 {
            display: inline-block;
            font-size: 15px;
            color: #3F4146;
            font-family: "PingFangSC-Medium", "Source Han Sans CN", sans-serif;
            margin-right: 10px;
          }
          .section-title h3 + h3 { margin-left: 10px; }
          .section-title h3 a {
            color: #9B9EA3;
            text-decoration: none;
            transition: all .2s;
            -webkit-tap-highlight-color: transparent;
          }
          .section-title h3.current a { color: #3F4146; }
          .section-title h3.current::after {
            content: '';
            display: block;
            width: 14px;
            height: 2px;
            background-color: #498BF8;
            margin: 4px auto 0;
          }
          .section-title .status {
            font-size: 12px;
            color: #9B9EA3;
          }
          .section-title .status.right { float: right; }
          .section-title button.edit,
          .section-title button.reset {
            display: inline-block;
            height: 20px;
            line-height: 20px;
            background-color: #EEEFF2;
            border-radius: 10px;
            border: 1px solid #EEEFF2;
            box-sizing: border-box;
            padding: 0 9px;
            font-size: 12px;
            color: #9B9EA3;
            outline: none;
            float: right;
            margin-right: -2px;
            margin-left: 12px;
            transition: all .2s;
          }
          .section-title button.reset {
            border-color: #498BF8;
            background-color: #FFF;
            color: #498BF8;
          }
          .section-title button.edit-enter {}
          .section-title button.edit-done { background-color: #498BF8; color: #FFF; }
          ul.ch-list {
            padding: 0 12px 9px;
          }
          ul.ch-list li {
            display: inline-block;
            vertical-align: top;
            width: 25%;
            margin: 6px 0;
            padding: 0 6px;
            box-sizing: border-box;
          }
          @media screen and (min-width: 540px) {
            ul.ch-list li { width: 20%; }
          }
          @media screen and (min-width: 740px) {
            ul.ch-list li { width: 16.66666%; }
          }
          ul.ch-list li a {
            position: relative;
            display: block;
            height: 34px;
            line-height: 34px;
            text-align: center;
            text-decoration: none;
            font-size: 16px;
            color: #3F4146;
            background-color: #EEEFF2;
            border-radius: 4px;
            user-select: none;
          }
          ul.ch-list li a::before {
            content: '';
            display: block;
            position: absolute;
            width: 16px;
            height: 16px;
            top: -8px;
            right: -8px;
            border: 1px solid #D8DAE0;
            background-color: #FFF;
            background-position: center center;
            background-repeat: no-repeat;
            border-radius: 50%;
            font-size: 0;
            padding: 0;
            transform: scale(0);
            transition: transform .4s;
          }
          ul.ch-list.edit-mode li a.editable::before { transform: scale(1); }
          ul.ch-list.edit-mode li a.uneditable { color: #c3c3c3; -webkit-tap-highlight-color: transparent; }
          ul.ch-list.edit-status-del li a::before {
            background-image: url('data:image/svg+xml;utf8,<svg width="8" height="2" xmlns="http://www.w3.org/2000/svg"><rect fill="%23D8DAE0" width="8" height="2" rx="1" fill-rule="evenodd"/></svg>');
          }
          ul.ch-list.edit-status-add li a::before {
            background-image: url('data:image/svg+xml;utf8,<svg width="8" height="8" xmlns="http://www.w3.org/2000/svg"><g fill="%23D8DAE0" fill-rule="evenodd"><rect y="3" width="8" height="2" rx="1"/><rect transform="rotate(-90 4 4)" y="3" width="8" height="2" rx="1"/></g></svg>');
          }
          ul.ch-list .list-blank {
            color: #b3b8bf;
            font-size: 14px;
            text-align: center;
            margin: 20px 0;
          }
          .more {
            display: block;
            text-align: center;
            margin-top: 8px;
          }
          .more a {
            display: inline-block;
            font-size: 12px;
            font-family: PingFangSC-Medium;
            color: #9b9ea3;
            height: 24px;
            line-height: 24px;
            padding-right: 16px;
            text-decoration: none;
            background-image: url('data:image/svg+xml;utf8,<svg width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6.414 6L4.293 8.121a1 1 0 0 0 1.414 1.414l2.829-2.828a.997.997 0 0 0 0-1.414L5.707 2.464A1 1 0 0 0 4.293 3.88L6.414 6zM2 0h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="%239B9EA3" fill-rule="evenodd"/></svg>');
            background-repeat: no-repeat;
            background-position: right center;
          }
        `}</style>
      </div>
    )
  }
}
