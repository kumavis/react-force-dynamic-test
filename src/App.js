import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ForceGraph, ForceGraphNode, ForceGraphLink} from 'react-vis-force';


class App extends Component {
  state = {
    counter: 4,
    count: 6,
  }

  componentDidMount () {
    setInterval(() => {
      let { counter } = this.state
      counter++
      let count = 2 + counter % 10
      this.setState({ counter, count })
    }, 1000)
  }

  renderNodes () {
    const { count } = this.state

    console.log('rendering', count)
    return Array(count).fill().map((_, index) => {
      const id = `node-${index}`
      return (
        <ForceGraphNode key={ id } node={{ id, radius: 5 }} fill="#47d3d9" />
      )
    })
  }

  renderLinks () {
    const { count } = this.state

    return Array(count).fill().map((_, index) => {
      const source = `node-${index}`
      const target = `node-${(index+1)%count}`
      console.log('links', source, target)
      return (
        <ForceGraphLink key={`${source}_${target}`} link={{ source, target, value: 1 }} />
      )
    })
  }

  render() {
    let content = []
    content = content.concat(this.renderNodes())
    content = content.concat(this.renderLinks())

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">topo</h1>
        </header>
        <p className="App-intro">
          <ForceGraph simulationOptions={{ animate: true, height: 300, width: 300 }}>
            {content}
          </ForceGraph>
        </p>
      </div>
    );
  }
}

export default App;
