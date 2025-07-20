import React from 'react'
import FlowBuilder from './components/FlowBuilder'
import "./App.css";

/**
 * App component:
 * Only responsibility is to render the FlowBuilder.
 * (Keeps future extension easier if we add routing / other pages.)
 */
export default function App() {
  return <FlowBuilder />
}
