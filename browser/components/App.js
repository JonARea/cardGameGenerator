import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

const App = (props) => (

  <BrowserRouter>
    <div>
      <h1>Reacting from App.js</h1>
      <p>
        {'Redux store: ' + props.statePiece}
      </p>
    </div>
  </BrowserRouter>
)

const mapState = ({statePiece}) => ({statePiece})

export default connect(mapState, null)(App)
