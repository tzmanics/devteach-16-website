import React, {createClass} from 'react'

import '../styles/main.scss'

let App = createClass({
  render() {
    return (
      <div className='page-container'>
        <div>{this.props.children}</div>
      </div>
    )
  }
})

export default App
