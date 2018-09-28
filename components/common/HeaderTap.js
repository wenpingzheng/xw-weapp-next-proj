/**
 * 公共导航页的头部
 * @author wpzheng 2017-10-19
 */
const HeaderTap = ({ title, handleClick=()=>{}, bossClick='' }) => {
  return (
    <div className='header'>
      {title || ''}
      <a className='backBtn' onClick={handleClick} data-boss={bossClick}></a>
      <style jsx>{`
        .header {
          height: 44px;
          text-align: center;
          line-height: 44px;
          font-size: 18px;
          position: relative;
          color:#3F4146;
          background:#fff;
        }
        .header:after {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          bottom: 0;
          background: #e0e0e0;
          width: 100%;
          height: 1px;
          -webkit-transform: scaleY(0.5);
          -ms-transform: scaleY(0.5);
          transform: scaleY(0.5);
          -webkit-transform-origin: bottom left;
          -ms-transform-origin: bottom left;
          transform-origin: bottom left;
        }
        .backBtn{
          width: 39px;
          height: 39px;
          background: url(//mat1.gtimg.com/www/mobi/2017/image/menuclose.png) center no-repeat;
          background-size: 33%;
          display: block;
          position: absolute;
          right: 0px;
          top: 2px;
        }
      `}</style>
    </div>
  )
}

export default HeaderTap;
