# Chatbot Flow Builder (Assignment Implementation)

This project implements **exactly the required features** from the BiteSpeed frontend assignment:

## ✅ Requirements Implemented

| Requirement | Implemented | Notes |
|-------------|-------------|-------|
| Use React Flow | ✅ | Library: `reactflow` |
| One Text Node type | ✅ | Custom `textMessage` node |
| Multiple text nodes in one flow | ✅ | Drag to add |
| Nodes Panel | ✅ | Extensible panel (right side) |
| Drag + Drop from Nodes Panel | ✅ | Standard HTML5 DnD |
| Settings Panel replaces Nodes Panel on select | ✅ | Textarea edits node text |
| Edge connections | ✅ | Standard edges with arrowhead |
| Source handle single outgoing edge | ✅ | Enforced in `onConnect` |
| Target handle multiple incoming edges | ✅ | No restriction |
| Save Button | ✅ | Top bar |
| Validation on Save | ✅ | Error if >1 nodes AND >1 node has **no incoming edges** (empty target handles) |
| Error UI | ✅ | Banner: *Cannot save Flow* + nodes flagged internally |

## 🔍 Validation Rule

> *“Show an error if there are more than one Nodes and more than one Node has empty target handles.”*

A node with an **empty target handle** = **no incoming edges**.  
If more than one such node exists (while total nodes >1), we block saving.

## 🚀 Run Locally

```bash
npm install
npm run dev
```

Open: http://localhost:5173

## 🗂 Structure

```
src/
  components/
    FlowBuilder.jsx      # Canvas + logic + validation trigger
    Sidebar.jsx          # Nodes Panel / Settings Panel toggle
    nodes/
      TextMessageNode.jsx
  utils/
    validation.js        # Validation logic (empty target handles rule)
  App.jsx
  main.jsx
  styles.css
```

## ✏️ Editing a Node

1. Click a node – sidebar switches to Settings.
2. Change text in textarea – updates in real time.
3. Click *Back to Nodes* to return to Nodes Panel.

## ➕ Add a Node

Drag the **Message** tile into the canvas.

## 💾 Save

Click **Save Changes**:
- If invalid (multiple 'start' nodes / unconnected from above), shows error banner.
- If valid, shows success alert.

---

Feel free to extend:
- Add more node types to `nodeTypes` + new tile in `Sidebar`.
- Add persistence / JSON export if required (not in base spec).

Good luck! # BiteSpeed_chatbot-flow-builder
