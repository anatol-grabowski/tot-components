# compact-button

## Native HTML basis

The component creates a standard `<button type="button">` element with built-in styles.

## Props (attributes)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `variant` | `string` | The visual style. One of `primary`, `secondary` (default), or `danger`. |
| `disabled` | `boolean` | Boolean attribute. Disables the button. |

## Events

| Event | Type |
| --- | --- |
| `compact-click` | `CustomEvent<{}>` |

Dispatched when the button is clicked.

## Slots

| Slot | Description |
| --- | --- |
| `default` | The content inside the button (e.g., text, icons). |
