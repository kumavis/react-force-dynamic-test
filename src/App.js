import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TopoGraph from './Graph';


class App extends Component {
  state = {
    counter: 0,
    count: 2,
  }

  componentDidMount () {
    this.updateCount()
    setInterval(() => this.updateCount(), 5e3)
  }

  updateCount () {
    let { counter } = this.state
    counter++
    let count = 2 + counter % 10
    this.setState({ counter, count })
  }

  renderNodes () {
    const { count } = this.state

    console.log('rendering', count)
    return Array(count).fill().map((_, index) => {
      // node obj
      return {}
    })
  }



  render() {
    const { count } = this.state
    // empty objects for nodes and links for now
    const nodes = Array(count).fill().map((_, index) => {
      const id = `node-${index}`
      return { id }
    })
    const links = Array(count).fill().map((_, index) => {
      const source = `node-${index}`
      const target = `node-${(index+1)%count}`
      const id = `${source}_${target}`
      return { id, source, target }
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">topo</h1>
        </header>
        <p className="App-intro">
          <TopoGraph nodes={nodes} links={links} />
        </p>
      </div>
    );
  }
}

export default App;
