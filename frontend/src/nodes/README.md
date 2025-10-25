# Node Abstraction Documentation

## BaseNode Component

The `BaseNode` component provides a consistent abstraction for creating new node types in the React Flow pipeline. It handles common functionality like styling, handle positioning, and layout.

### Props

-   `id` (string): Unique identifier for the node
-   `data` (object): Node data passed from React Flow
-   `title` (string): Display title for the node
-   `inputs` (array): Array of input handle configurations
-   `outputs` (array): Array of output handle configurations
-   `children` (ReactNode): Custom content to render inside the node
-   `width` (number): Node width in pixels (default: 200)
-   `height` (number): Node height in pixels (default: 80)
-   `style` (object): Additional CSS styles to apply

### Handle Configuration

Each handle in the `inputs` and `outputs` arrays should have:

```javascript
{
  type: 'source' | 'target',
  position: Position.Left | Position.Right | Position.Top | Position.Bottom,
  id: 'unique-handle-id',
  style: {} // Optional additional styles
}
```

### Example Usage

```javascript
import { BaseNode } from './BaseNode';
import { Position } from 'reactflow';

export const MyCustomNode = ({ id, data }) => {
    const inputs = [{ type: 'target', position: Position.Left, id: 'input1' }];

    const outputs = [
        { type: 'source', position: Position.Right, id: 'output1' },
    ];

    return (
        <BaseNode
            id={id}
            data={data}
            title="My Custom Node"
            inputs={inputs}
            outputs={outputs}
        >
            <div>Custom content goes here</div>
        </BaseNode>
    );
};
```

## Available Node Types

### Core Nodes

-   **InputNode**: Handles user input with configurable name and type
-   **OutputNode**: Displays output with configurable name and type
-   **LLMNode**: Large Language Model processing node
-   **TextNode**: Simple text processing node

### New Node Types

-   **MathNode**: Performs mathematical operations (add, subtract, multiply, divide)
-   **APIRequestNode**: Makes HTTP requests with configurable method and URL
-   **ConditionNode**: Conditional logic with multiple output paths
-   **FilterNode**: Filters data based on various criteria
-   **TransformNode**: Transforms text data (uppercase, lowercase, trim, etc.)

## Adding New Node Types

1. Create a new file in the `nodes` directory
2. Import `BaseNode` and `Position` from their respective modules
3. Define your inputs and outputs configuration
4. Use `BaseNode` as the wrapper component
5. Add your custom content as children
6. Export your component and add it to `index.js`
7. Register the node type in `ui.js` nodeTypes object
8. Add it to the toolbar in `toolbar.js`
