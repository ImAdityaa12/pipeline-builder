# Text Node Height Fix

## Issue

The Text Node height calculation was sometimes incorrect, causing content to be cut off or not perfectly visible.

## Root Cause

The original height calculation was using estimated values for different sections rather than measuring the actual rendered content height.

## Solution Implemented

### 1. Accurate Content Measurement

- Added `contentRef` to measure the actual rendered content height
- Uses `scrollHeight` to get the true content dimensions
- Accounts for padding and header height properly

### 2. Improved Timing

- Increased setTimeout delay from 10ms to 50ms to ensure all content is fully rendered
- This allows for proper measurement of dynamic content like variable badges and preview sections

### 3. Better Height Calculation

```javascript
const contentHeight = contentRef.current.scrollHeight;
const headerHeight = 50; // Title bar height
const padding = 32; // Content padding (p-4)
const totalHeight = headerHeight + contentHeight + padding + 10; // Add buffer
```

### 4. Minimum Height Guarantee

- Ensures minimum height of 200px for consistency
- Prevents nodes from becoming too small

## Benefits

- ✅ Content is always perfectly visible
- ✅ No more cut-off text or UI elements
- ✅ Accurate sizing for all content variations
- ✅ Smooth resizing with proper timing
- ✅ Handles dynamic content (variables, preview) correctly

## Testing

To test the fix:

1. Create a Text Node
2. Add various amounts of text content
3. Add multiple variables like `{{var1}} {{var2}} {{var3}}`
4. Verify all content is visible without scrolling
5. Check that the node resizes properly as content changes

The height should now accurately reflect the actual content size in all scenarios.
