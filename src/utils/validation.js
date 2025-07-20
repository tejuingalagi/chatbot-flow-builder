/**
 * validateFlow(nodes, edges)
 *
 * Requirement text:
 *  Show an error if there are > 1 nodes AND more than one node has *empty target handles*.
 *
 * Interpretation:
 *  A node's *target handle* is where incoming edges land. An 'empty target handle'
 *  means the node has NO incoming edges. (Commonly called a 'root' in a directed graph.)
 *
 * Returns:
 *  {
 *    isValid: boolean,
 *    nodesWithEmptyTarget: string[]  // IDs of nodes with no incoming edges
 *  }
 */
export function validateFlow(nodes, edges) {
  if (nodes.length <= 1) {
    return { isValid: true, nodesWithEmptyTarget: [] }
  }

  // Count incoming edges for each node
  const incomingCount = {}
  nodes.forEach(n => incomingCount[n.id] = 0)
  edges.forEach(e => {
    if (e.target) {
      incomingCount[e.target] = (incomingCount[e.target] || 0) + 1
    }
  })

  // Nodes whose target handle is unused (no incoming edges)
  const emptyTargetNodes = nodes.filter(n => incomingCount[n.id] === 0).map(n => n.id)

  // Invalid if more than one such node
  const isValid = !(emptyTargetNodes.length > 1)

  return { isValid, nodesWithEmptyTarget: emptyTargetNodes }
}
