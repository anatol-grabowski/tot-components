# compact-checkbox

## Native HTML basis

The component is based on a native `<input type="checkbox">` wrapped in a `<label>`.

## Props (attributes / properties)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `label` | `string` | The text label for the checkbox. |
| `checked` | `boolean` | Boolean attribute/property. Whether the checkbox is checked. |
| `indeterminate` | `boolean` | Boolean attribute/property. Sets the indeterminate state. |
| `disabled` | `boolean` | Boolean attribute/property. Disables the checkbox. |

## Events

| Event | Type |
| --- | --- |
| `change` | `CustomEvent<{ checked: boolean }>` |

Dispatched when the native input emits a `change` event.
