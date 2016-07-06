import React, {Component, PropTypes} from 'react'


export default class DefaultLayout extends Component {
  render() {
    return (
      <div>
        <div className={`contents ${this.props.classes}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

DefaultLayout.displayName = 'DefaultLayout'
