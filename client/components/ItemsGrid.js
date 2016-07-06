import React, {createClass, PropTypes} from 'react'

let ItemsGrid = createClass({
  propTypes: {
    items: PropTypes.array
  },

  render () {
    return (
      <div className='items-grid'>
        <ul>
          {this.props.items.map((item, i) => {
            return (
              <li key={i}>
                <img src={item.image}></img>
                <h3>{item.name}</h3>
                <h1>${item.price}</h1>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

ItemsGrid.displayName = 'ItemsGrid'

export default ItemsGrid

