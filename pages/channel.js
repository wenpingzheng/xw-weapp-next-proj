/**
 * 2018-3-16
 */

import { Component } from 'react'
import Layout from '../layouts/CoreLayout'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      data: [],
      subname: ''
    }
  }

  static async getInitialProps({ query }) {
    const name = query.name
    const subname = query.subname
    return { name, subname }
  }

  render() {
    return (
      <div>
        <Layout title="频道页">
          <p>频道页{this.props.name}</p>
        </Layout>
        <style jsx>{`
          p{
            font-size:24px;
            font-weight:800;
          }
        `}</style>
      </div>
    )
  }
}