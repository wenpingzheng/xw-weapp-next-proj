/**
 * test sort
 *
 * @author jamieyan
 */
import { Component } from 'react'
import Layout from '../../../layouts/CoreLayout'
import GlobalNav from '../../../components/common/GlobalNav'

import pgvSimple from '../../../libs/pgv-simple'

// 主组件
export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
    pgvSimple({'pgv_site': ''})
  }

  render () {
    return (
      <div data-boss-expo='pv'>
        <Layout title="频道列表" includePecker={true}>
          <GlobalNav />
        </Layout>
      </div>
    )
  }
}
