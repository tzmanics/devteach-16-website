import React, {createClass} from 'react'
import Request from 'superagent'

import Config from '../config'
import DefaultLayout from '../layouts/Default'
import ItemsGrid from '../components/ItemsGrid'

let Home = createClass({
  getInitialState () {
    return {
      items: []
    }
  },

  getItems () {
    Request
    .get(`${Config.api.url}/items`)
    .set('Content-Type', 'application/json')
    .end((err, res) => {
      if (err) console.log(err)
      this.setState({
        items: res.body
      })
    })
  },

  componentWillMount () {
    this.getItems()
  },

  render () {
    return (
      <DefaultLayout className='home'>
        <div className='container'>
          <ItemsGrid items={this.state.items} />
        </div>
      </DefaultLayout>
    )
  }
})

Home.displayName = 'Home'

export default Home
