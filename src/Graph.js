import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {ForceGraph, ForceGraphNode, ForceGraphLink, createSimulation} from 'react-vis-force';

const ALPHA_DECAY_FAST = 0.02276
// const ALPHA_DECAY_FAST = 0.03
const ALPHA_DECAY_SLOW = 0.0022

class TopoGraph extends Component {

  componentDidUpdate (prevProps, prevState) {
    const simulation = this._simulation
    // ensure alpha is atleast min
    // if (simulation.alpha() <= simulation.alphaMin()) {
    //   simulation.alpha(simulation.alphaMin())
    //   simulation.tick()
    // }
    // // animate
    // simulation.alphaTarget(1)
    // setTimeout(() => {
    //   simulation.alphaTarget(0)
    // }, 1000)
    simulation.alphaTarget(1)
    simulation.alphaDecay(ALPHA_DECAY_FAST)
    setTimeout(() => {
      simulation.alphaTarget(0)
      // simulation.alphaDecay(ALPHA_DECAY_SLOW)
      simulation.alphaDecay(ALPHA_DECAY_FAST)
    }, 1000)
  }

  renderNodes () {
    const { nodes } = this.props

    return nodes.map((node) => {
      const { id } = node
      return (
        <ForceGraphNode key={id} node={{ id, radius: 5 }} fill="#47d3d9" />
      )
    })
  }

  renderLinks () {
    const { links } = this.props

    return links.map((link) => {
      const { id, source, target } = link
      return (
        <ForceGraphLink key={id} link={{ source, target, value: 1 }} />
      )
    })
  }

  _createSimulation (opts) {
    const simulation = createSimulation(opts)
    this._simulation = simulation
    // setInterval(() => {
    //   console.log('alpha', simulation.alpha(), simulation.alphaMin(), simulation.alphaDecay())
    // }, 200)
    return simulation
  }

  render() {
    let content = []
    content = content.concat(this.renderNodes())
    content = content.concat(this.renderLinks())
    console.log('render')

    return (
      <ForceGraph createSimulation={ this._createSimulation.bind(this) } simulationOptions={{
        animate: true,
        // alphaDecay: 1 - Math.pow(0.001, 1 / 300),
        // alphaDecay: 0.0002,
        // height: 300,
        // width: 300,
        // radiusMargin: 20,
      }}>
        {content}
      </ForceGraph>
    );
  }
}

export default TopoGraph;
