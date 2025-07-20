import React from 'react'
import { Handle, Position } from 'reactflow'
import clsx from 'clsx'

/**
 * TextMessageNode:
 * Custom visual for the single 'Text Message' node type.
 * - Left handle: target (incoming edges) -> can have many.
 * - Right handle: source (outgoing edge) -> limited to ONE (enforced in onConnect logic).
 *
 * Props:
 *  data.text  -> message string
 *  data.hasValidationError -> optional flag added during validation to highlight node
 */
export default function TextMessageNode({ data }) {
  return (
    <div className={clsx('node-container', data?.hasValidationError && 'validation-error')}>
      <div className="node-header">
        💬 Send Message
      </div>
      <div className="node-body">
        {data?.text
          ? data.text
          : <span className="placeholder">Empty message...</span>}
      </div>

      {/* Target Handle (LEFT) - multiple incoming allowed */}
      <Handle
        type="target"
        position={Position.Left}
        id="in"
        style={{ background:'#555' }}
      />

      {/* Source Handle (RIGHT) - only one outgoing edge (logic enforced elsewhere) */}
      <Handle
        type="source"
        position={Position.Right}
        id="out"
        style={{ background:'#555' }}
      />
    </div>
  )
}
