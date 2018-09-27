/**
 * @time 2018-09-19
 * @author wpzheng
 * @param {Object} props.data - 视频数据
 */

function VideoItem({ data }) {
  return (
    <div className="video-wrap">
      <div className="video-title">{data.title}</div>
      <div className="video-image">
        <img src={data.img} />
      </div>
      <style jsx>{`
        img{
          width:160px;
          height:90px;
        }
      `}</style>
    </div>
  )
}

export default VideoItem