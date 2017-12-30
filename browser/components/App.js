import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const App = (props) => (

  <BrowserRouter>
    <div>
      <h1>Reacting from App.js</h1>
      <h2>This is red
      </h2>
      <p>
        {'Redux store: ' + props.reduxState}
      </p>
    </div>
  </BrowserRouter>
)

const mapState = (state) => ({reduxState: JSON.stringify(state)})

export default connect(mapState, null)(App)
