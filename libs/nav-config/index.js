/**
 * 全站导航的配置项，与channel-config对应
 * info: 频道信息
 * sort: 默认顺序
 * sort的顺序严禁互换！！！ by limeizhang 0828
 */
export default {
  info: {
    'yaowen'  : { name: '要闻', link: '/' , boss: 'yaowen' , className: 'static' , reserve: ''},
    'tuijian' : { name: '爱看', link: '/m/recommend' , boss: 'tuijian' ,className: 'nav_rec static', reserve: ''},
    'video'   : { name: '视频', link: '/m/shipin' , boss: 'video' ,className: 'nav_video', reserve: ''},
    'xsd'     : { name: '新时代', link: '/m/xsd' , boss: 'xsd' ,className: '', reserve: ''},
    'local'   : { name: '本地', link: 'javascript:;' , boss: '' , placeholder: true ,className: '', reserve: ''},
    'ent'     : { name: '娱乐', link: '/m/ent' , boss: 'ent' ,className: '', reserve: ''},
    'sports'  : { name: '体育', link: '/m/sports' , boss: 'sports' ,className: '', reserve: ''},
    'finance' : { name: '财经', link: '/m/finance' , boss: 'finance' ,className: '', reserve: ''},
    'mil'     : { name: '军事', link: '/m/mil' , boss: 'mil' ,className: '', reserve: ''},
    'shehui'  : { name: '民生', link: '/m/shehui' , boss: 'shehui' ,className: '', reserve: ''},
    'astro'   : { name: '星座', link: '/m/astro' , boss: 'astro' ,className: '', reserve: ''},
    'nba'     : { name: 'NBA', link: '/m/nba' , boss: 'nba' ,className: '', reserve: ''},
    'tech'    : { name: '科技', link: '/m/tech' , boss: 'tech' ,className: '', reserve: ''},
    'digi'    : { name: '数码', link: '/m/digi' , boss: 'digi' ,className: '', reserve: ''},
    'fashion' : { name: '时尚', link: '/m/fashion' , boss: 'fashion' ,className: '', reserve: ''},
    'auto'    : { name: '汽车', link: '/m/auto' , boss: 'auto' ,className: '', reserve: ''},
    'games'   : { name: '游戏', link: '/m/games' , boss: 'games' ,className: '', reserve: ''},
    'house'   : { name: '房产', link: '/m/house' , boss: 'house' ,className: '', reserve: ''},
    'stock'   : { name: '股票', link: '/m/stock' , boss: 'stock' ,className: '', reserve: ''},
    'music'   : { name: '音乐', link: '/m/music' , boss: 'music' ,className: '', reserve: ''},
    'edu'     : { name: '教育', link: '/m/edu' , boss: 'edu' ,className: '', reserve: ''},
    'cul'     : { name: '文化', link: '/m/cul' , boss: 'cul' ,className: '', reserve: ''},
    // 'huati'   : { name: '今日话题', link: '/m/huati' , boss: 'jrht' ,className: 'yc nav_ht', reserve: ''},
    // 'guiquan' : { name: '贵圈', link: '/m/ent/guiquan' , boss: 'gq' ,className: 'yc nav_gq', reserve: ''},
    // 'MissMoney': { name: 'MissMoney', link: '/m/finance/MissMoney' , boss: 'mm' ,className: 'yc nav_mm', reserve: ''},
    // 'sw'      : { name: '深网', link: '/m/tech/sw' , boss: 'sw' ,className: 'yc nav_sw', reserve: ''},
    'ac'       : { name: '动漫', link: '/m/ac' , boss: 'ac' ,className: '', reserve: ''},
    'book'     : { name: '书城', link: 'http://ubook.qq.com/8/index.html' , boss: 'book' ,className: '', reserve: ''},
    'world'    : { name: '国际', link: '/m/world' , boss: 'world' ,className: '', reserve: ''},
    'movie'    : { name: '电影', link: '/m/movie' , boss: 'movie' ,className: '', reserve: ''},
    'football' : { name: '足球', link: '/m/football' , boss: 'football' ,className: '', reserve: ''},
    'fx'       : { name: '佛学', link: '/m/fx' , boss: 'fx' ,className: '', reserve: ''},
    'meirong'  : { name: '美容', link: '/m/meirong' , boss: 'meirong' ,className: '', reserve: ''},
    'health'   : { name: '健康', link: '/m/health' , boss: 'health' ,className: '', reserve: ''},
    'visit'    : { name: '旅游', link: '/m/visit' , boss: 'visit' ,className: '', reserve: ''},
    'fm'       : { name: '有声', link: '/m/fm' , boss: 'fm' ,className: '', reserve: ''},
    'fun'      : { name: '搞笑', link: '/m/fun', boss: 'fun',className:'', reserve: ''},
    'history'      : { name: '历史', link: '/m/history', boss: 'history',className:'', reserve: ''},
    'inspiration'  : { name: '鸡汤', link: '/m/inspiration', boss: 'inspiration',className:'', reserve: ''},
    'science'      : { name: '科学', link: '/m/science', boss: 'science',className:'', reserve: ''},
    'baby'         : { name: '育儿', link: '/m/baby', boss: 'baby',className:'', reserve: ''},
    'food'         : { name: '美食', link: '/m/food', boss: 'food',className:'', reserve: ''},
    'pet'          : { name: '宠物', link: '/m/pet', boss: 'pet',className:'', reserve: ''},
    'picture'      : { name: '图片', link: '/m/picture', boss: 'picture',className:'', reserve: ''},
    'dujia'        : { name: '独家', link: '/m/dujia', boss: 'dujia',className:'', reserve: ''},
    'icesnow'      : { name: '冰雪',link: '/m/icesnow', boss: 'sports',className:'', reserve: ''},
    'cba'          : { name: 'CBA',link: '/m/cba', boss: 'cba',className:'', reserve: 'new'},
    'nfl'          : { name: 'NFL',link: '/m/nfl', boss: 'nfl',className:'', reserve: 'new'},
    'netcourt'     : { name: '网上法院',link: '/m/netcourt', boss: 'netcourt',className:'', reserve: 'new'},
    'lic'          : { name: '理财',link: '/m/lic', boss: 'money',className:'', reserve: 'new'},
    'esport'       : { name: '电竞',link: '/m/esport', boss: 'esport',className:'', reserve: 'new'},
    'strike'       : { name: '搏击',link: '/m/strike', boss: 'strike',className:'', reserve: 'new'},
    'hanliu'       : { name: '韩流',link: '/m/hanliu', boss: 'hanliu',className:'', reserve: 'new'},
    'media'        : { name: '传媒',link: '/m/media', boss: 'media',className:'', reserve: 'new'},
    'schoolyard'   : { name: '校园',link: '/m/schoolyard', boss: 'school',className:'', reserve: 'new'},
    '24h'          : { name: '24小时',link: '/m/24h', boss: '24h',className:'', reserve: 'new'},
    'hot'          : { name: '热点',link: '/m/hot', boss: 'hot',className:'', reserve: 'new'},
    'ggkf'         : { name: '改革开放',link: '/m/ggkf', boss: 'ggkf',className:'', reserve: 'tiny'},
    'shortvideo'   : { name: '小视界',link: '/m/shortvideo', boss: 'shortvideo',className:'', reserve: ''},
    'tianqi'   : { name: '天气',link: '/m/tianqi', boss: 'tianqi',className:'', reserve: ''}
  },
  // 默认顺序
  // sort: ['yaowen','tuijian','picture','football','dujia','video','local','xsd','ent','nba','sports','astro','finance','mil','shehui','tech','digi','fashion','auto','games','house','stock','music','edu','cul','ac','world','movie','icesnow','fx','meirong','health','visit','fm','fun','history','inspiration','science','baby','food','pet','cba','nfl','lic','esport','strike','hanliu','media','schoolyard','24h'],
  sort: ['yaowen', 'tuijian', 'picture','hot', 'shortvideo', 'dujia', 'local', 'xsd', 'video', 'ent', 'nba', 'sports', 'football', 'astro', 'tianqi', 'finance', 'mil', 'tech', 'digi', 'fashion', 'auto', 'games', 'house', 'stock', 'music', 'edu', 'cul', 'ac', 'world', 'movie', 'fx', 'health', 'fun', 'history', 'inspiration', 'science', 'food', 'cba', 'esport', 'shehui', '24h', 'ggkf'],
  // 推荐频道（默认隐藏，只在频道编辑页展示）
  hideRec: ['hanliu', 'meirong', 'pet', 'baby', 'visit', 'strike', 'lic', 'schoolyard', 'icesnow', 'media', 'nfl', 'fm'],
  // 后期追加的频道，需要在sort的合适位置及add中同步添加
  add: ['24h','ggkf','hot', 'shortvideo', 'tianqi'],
  // 移除的频道，需要在sort中删除，并在remove中添加
  remove: ['book']
}
