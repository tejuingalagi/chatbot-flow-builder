import React from 'react'

/**
 * Sidebar component:
 * - If no node selected -> shows Nodes Panel (drag source list)
 * - If a node is selected -> shows Settings Panel (edit text)
 *
 * Props:
 *  selectedNode: currently selected node object or null
 *  clearSelection: function to deselect
 *  updateNodeText: function(id, newText) to update node's text
 */
export default function Sidebar({ selectedNode, clearSelection, updateNodeText }) {

  /**
   * Begin drag: we set a MIME type 'application/reactflow' so the canvas
   * knows what node type we want to create on drop.
   */
  const onDragStart = (evt, nodeType) => {
    evt.dataTransfer.setData('application/reactflow', nodeType)
    evt.dataTransfer.effectAllowed = 'move'
  }

  // Settings Panel mode (node selected)
  if (selectedNode) {
    return (
      <aside className="sidebar">
        <h3>Settings</h3>
        <div className="settings-group">
          <label htmlFor="nodeText">Message Text</label>
          <textarea
            id="nodeText"
            value={selectedNode.data.text}
            onChange={e => updateNodeText(selectedNode.id, e.target.value)}
            placeholder="Type message..."
          />
        </div>
        <button className="secondary" onClick={clearSelection}>Back to Nodes</button>
        <footer className="small">
          Node ID: {selectedNode.id}
        </footer>
      </aside>
    )
  }

  // Nodes Panel mode (no selection)
  return (
    <aside className="sidebar">
      <h3>Nodes</h3>
      <div
        className="node-tile"
        draggable
        onDragStart={(e)=> onDragStart(e, 'textMessage')}
      >
        Message
      </div>
      <p className="info">
        Drag a <strong>Message</strong> node onto the canvas. Select a node to edit its text.
        Only one start node (node with empty target handle) allowed when saving.
      </p>
      <footer className="small">
        Panel is extensible: add more node tiles here later.
      </footer>
    </aside>
  )
}
