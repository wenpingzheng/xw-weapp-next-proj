
import Head from 'next/head'

export default ({ children, viewportScale = 1, title='' }) => (
  <div>
    <Head>
      <meta charSet="utf8" />
      <meta name="viewport" content={`width=device-width, initial-scale=${viewportScale}, maximum-scale=${viewportScale}, minimum-scale=${viewportScale}, user-scalable=no`} />
      <title>{`${title}_腾讯网`}</title>
      <style>{'html,body,p,ol,ul,li,dl,dt,dd,blockquote,figure,fieldset,legend,textarea,pre,iframe,hr,h1,h2,h3,h4,h5,h6{margin:0;padding:0}h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}ul{list-style:none}button,input,select,textarea{margin:0}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}embed,iframe,object,audio,video{height:auto;max-width:100%}iframe{border:0}table{border-collapse:collapse;border-spacing:0}td,th{padding:0;text-align:left}html, body {font-family: sans-serif;}'}</style>
    </Head>
    { children }
    <style jsx global>{`
      body{
        background-color:#ddd;
      }
    `}</style>
  </div>
)