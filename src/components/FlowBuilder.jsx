import React, { useState, useCallback } from 'react';
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

import Sidebar from './Sidebar';
import TextMessageNode from './nodes/TextMessageNode';
import { validateFlow } from '../utils/validation';

/**
 * ---- Core Design Notes (Requirement Mapping) ----
 * 1. We have ONLY ONE node type: Text Message.
 * 2. Nodes Panel (right) lists supported node types (currently just one) - extensible.
 * 3. Drag from Nodes Panel -> drop onto canvas to create a new text node.
 * 4. Selecting a node replaces Nodes Panel with Settings Panel to edit text.
 * 5. Source handle (right) is restricted to ONLY ONE outgoing edge (enforced in onConnect).
 * 6. Target handle (left) can have many incoming edges (no restriction).
 * 7. Save Button triggers validation:
 *      Rule: If there are > 1 nodes AND more than one node has an EMPTY TARGET HANDLE
 *            (meaning: it has NO *incoming* edge), we show error "Cannot save Flow".
 */

const nodeTypes = { textMessage: TextMessageNode };

// Simple ID generator
let idCounter = 1;
const nextId = () => `text-${idCounter++}`;

// Initial Node
const initialNodes = [
  {
    id: nextId(),
    type: 'textMessage',
    position: { x: 250, y: 100 },
    data: { text: 'First message' }
  }
];

const initialEdges = [];

export default function FlowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [showError, setShowError] = useState(false);

  /** Allow only one outgoing edge per source node */
  const onConnect = useCallback(
    (params) => {
      const already = edges.some((e) => e.source === params.source);
      if (already) return;
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            id: `e-${params.source}-${params.target}`,
            markerEnd: { type: MarkerType.ArrowClosed, color: '#555' }
          },
          eds
        )
      );
    },
    [edges, setEdges]
  );

  /** Drag & Drop for new nodes */
  const onDragOver = (evt) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (evt) => {
    evt.preventDefault();
    const type = evt.dataTransfer.getData('application/reactflow');
    if (type !== 'textMessage') return;

    const reactFlowBounds = evt.currentTarget.getBoundingClientRect();
    const position = {
      x: evt.clientX - reactFlowBounds.left - 75,
      y: evt.clientY - reactFlowBounds.top
    };

    const newNode = {
      id: nextId(),
      type: 'textMessage',
      position,
      data: { text: 'New message' }
    };
    setNodes((nds) => nds.concat(newNode));
  };

  /** Node selection */
  const handleNodeClick = (_, node) => setSelectedNodeId(node.id);
  const handlePaneClick = () => setSelectedNodeId(null);

  /** Update node text */
  const updateNodeText = (id, newText) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, text: newText } } : n
      )
    );
  };

  /** SAVE: Validate flow */
  const handleSave = () => {
    const { isValid, nodesWithEmptyTarget } = validateFlow(nodes, edges);
    if (isValid) {
      setShowError(false);
      alert('Flow saved successfully (validation passed).');
    } else {
      // Highlight invalid nodes
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            hasValidationError: nodesWithEmptyTarget.includes(n.id)
          }
        }))
      );
      setShowError(true);
    }
  };

  return (
    <div className="app-shell">
      {/* Top bar with Save Button */}
      <div className="top-bar">
        <button className="primary" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      {showError && <div className="error-banner">Cannot save Flow</div>}

      {/* Canvas Area */}
      <div className="canvas-wrapper" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          onPaneClick={handlePaneClick}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={20} size={1} />
          <MiniMap pannable />
          <Controls showInteractive={false} />
        </ReactFlow>
      </div>

      {/* Sidebar */}
      <Sidebar
        selectedNode={nodes.find((n) => n.id === selectedNodeId) || null}
        clearSelection={() => setSelectedNodeId(null)}
        updateNodeText={updateNodeText}
      />
    </div>
  );
}
