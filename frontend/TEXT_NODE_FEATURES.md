# Enhanced Text Node Features

## Overview

The Text Node has been enhanced with dynamic functionality including auto-resizing and variable detection.

## New Features

### 1. Auto-Resizing

- **Width**: Automatically adjusts based on the longest line of text (min: 320px, max: 600px)
- **Height**: Dynamically grows with content, no manual resizing needed
- **Real-time**: Updates as you type

### 2. Dynamic Variable Detection

- **Pattern**: Detects variables in `{{variableName}}` format
- **Real-time**: Updates as you type or modify text
- **Visual Feedback**: Shows detected variables as colored badges

### 3. Dynamic Input Handles

- **Auto-creation**: Creates input handles for each detected variable
- **Positioning**: Handles are positioned vertically on the left side
- **Unique IDs**: Each handle gets the variable name as its ID for connections

## Usage Examples

### Basic Text

```
Hello World!
```

- Creates a simple text node with no input handles

### Single Variable

```
Hello {{name}}!
```

- Creates one input handle labeled "name"
- Node width adjusts to content

### Multiple Variables

```
Hello {{name}}, you have {{count}} messages from {{sender}}.
```

- Creates three input handles: "name", "count", "sender"
- Handles are distributed vertically
- Node resizes to accommodate content

### Multi-line Content

```
Dear {{recipient}},

Thank you for your {{item}} order.
Your total is {{total}}.

Best regards,
{{company}}
```

- Creates handles for: "recipient", "item", "total", "company"
- Node height grows with content
- Width adjusts to longest line

## Technical Implementation

### Variable Detection

- Uses regex pattern: `/\{\{([^}]+)\}\}/g`
- Extracts unique variable names
- Updates in real-time as text changes

### Auto-Resizing Logic

- Monitors textarea scrollHeight for height
- Calculates width based on longest line length
- Uses `useCallback` and `useEffect` for performance

### Handle Management

- Creates handles dynamically based on detected variables
- Positions handles with custom styling
- Each handle gets unique ID matching variable name

## Visual Indicators

- **Variable Badges**: Blue badges show detected variables
- **Input Handles**: Blue circular handles on the left side
- **Smooth Transitions**: All resizing happens smoothly
- **Responsive Design**: Maintains styling consistency

## Benefits

- **Improved UX**: No manual resizing needed
- **Visual Clarity**: Clear indication of variables and connections
- **Dynamic Workflow**: Handles update automatically as content changes
- **Professional Appearance**: Consistent with overall design system
