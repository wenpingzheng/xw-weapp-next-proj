/**
 * 整理频道顺序
 */
import {
  pullAll as pullAllArray,
} from 'lodash/array'
import navConfig from '../nav-config'

export default function() {
  let sort = navConfig.sort
  let hideRec = navConfig.hideRec
  let add = navConfig.add
  let remove = navConfig.remove
  let info = navConfig.info

  let isSorted = !!window.localStorage.getItem('xwChannel') && window.localStorage.getItem('xwChannel') != '[]'
  let newSort = []
  let newAbandon = []
  let newHideRec = []

  if (isSorted) {
    const lsChFilter = (n) => (info[n] !== undefined) || (n.indexOf('_l_') === 0)
    // 用户排序过
    newSort = JSON.parse(window.localStorage.getItem('xwChannel')).filter(lsChFilter)
    newAbandon = (JSON.parse(window.localStorage.getItem('xwAbandon')) || hideRec || []).filter(lsChFilter)
    hideRec = pullAllArray(hideRec, newSort)

    if (remove.length > 0) {
      // 有删除字段
      for (let i = 0; i < remove.length; i++) {
        let index = newSort.indexOf(remove[i])
        let index2 = newAbandon.indexOf(remove[i])
        if (index > -1) {
          newSort.splice(index, 1)
        } else if (index2 > -1) {
          newAbandon.splice(index2, 1)
        }
      }
    }
    window.localStorage.setItem('xwChannel', JSON.stringify(newSort))
    window.localStorage.setItem('xwAbandon', JSON.stringify(newAbandon))

    // 增加新频道
    for (let i = 0; i < add.length; i++) {
      if (newAbandon.indexOf(add[i]) < 0 && newSort.indexOf(add[i]) < 0) {
        // 如果add列表中的新频道未被用户编辑过，则加到频道列表中
        newSort.push(add[i])
      }
    }

  } else {
    // 用户未排序过
    newSort = sort
    newHideRec = hideRec
  }

  return {newSort, newAbandon, newHideRec, sort, info }
}
