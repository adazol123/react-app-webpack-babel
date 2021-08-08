import React from 'react'
import { render }  from 'react-dom'
import './style/main.scss'
import img from './test.jpg'

function App () {
    return (
        <div className="help">
            <h2>Welcome to React App</h2>
            <p>React from zero ground up : test</p>
            <img src={img} alt="" />
        </div>
    )
}

render(<App/>, document.getElementById('app'))


if (module.hot) module.hot.accept()






