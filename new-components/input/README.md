# compact-input

## Native HTML basis

The component is based on a native `<input>` wrapped in a `<label>`.

## Props (attributes / properties)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `label` | `string` | The text label for the input. |
| `value` | `string` | The input value. |
| `type` | `string` | The input type (e.g. `text`, `password`, `email`). Default is `text`. |
| `placeholder` | `string` | Placeholder text for the input. |
| `disabled` | `boolean` | Boolean attribute/property. Disables the input. |

## Events

| Event | Type |
| --- | --- |
| `input` | `CustomEvent<{ value: string }>` |
| `change` | `CustomEvent<{ value: string }>` |

Dispatched corresponding to the native input events.
