# Resizing Algorithm

## Table of Contents

- [Definitions](#definitions)
  - [Resizable](#resizable)
- [Props](#props)
  - [Resizable](#resizable-1)

### Definitions

#### Resizable

**What?**
`<Resizable />` is a wrapper for creating a resizable component

**How?**
To wrap a `<ChildComponent />` in a resizable component, use the following syntax:

```tsx
<Resizable>
  <ChildComponent />
</Resizable>
```

The `<Resizable />` component accepts the following props ([See Here](#resizable-1))

**Why?**
The `<Resizable />` component provides the following features:

- The Top, Left, Right & Bottom borders can be dragged to resize the component
- There are invisible borders added to the edges of the component to increase the area that can be dragged
- Resizing will snap to `squareWidth` and `squareHeight` props
- `onResizeStartCallback` and `onResizeEndCallback` props can be used to trigger functions when resizing starts and ends
- `shouldResizeCallback` prop can be used to trigger a function that determines whether the component should be resized

```
                +-----------------+
                | +-------------+ |
                | |             | |
                | |             | |
                | |             | |
                | |             | |
                | |             | |
                | |             | |
                | +-------------+ |
                +-----------------+
```

### Props

#### Resizable

| Prop Name               | Type                  | Description                                                      |
| ----------------------- | --------------------- | ---------------------------------------------------------------- |
| `childWidth`            | `number`              | The width of the child component                                 |
| `childHeight`           | `number`              | The height of the child component                                |
| `coordinate`            | `Coordinates`         | The coordinates of the child component                           |
| `childStyleToApply`     | `React.CSSProperties` | The CSS styling to apply to child component                      |
| `squareWidth`           | `number`              | The maximum width of the resizable component                     |
| `squareHeight`          | `number`              | The maximum height of the resizable component                    |
| `borderWidth`           | `function`            | A callback function that is called when the component is resized |
| `borderColor`           | `function`            | A callback function that is called when the component is resized |
| `startTop`              | `function`            | A callback function that is called when the component is resized |
| `startLeft`             | `function`            | A callback function that is called when the component is resized |
| `onResizeStartCallback` | `function`            | A callback function that is called when the component is resized |
| `onResizeEndCallback`   | `function`            | A callback function that is called when the component is resized |
| `shouldResizeCallback`  | `function`            | A callback function that is called when the component is resized |
