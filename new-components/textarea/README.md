# compact-textarea

## Native HTML basis

The component is based on a native `<textarea>` wrapped in a container that provides a label and a fullscreen edit button.

## Props (attributes / properties)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `label` | `string` | The text label for the textarea. |
| `value` | `string` | The textarea value. |
| `placeholder` | `string` | Placeholder text. |
| `rows` | `number` | Initially visible rows. Default is 4. |
| `disabled` | `boolean` | Boolean attribute/property. Disables the textarea. |

## Events

| Event | Type | Description |
| --- | --- | --- |
| `input` | `CustomEvent<{ value: string }>` | Dispatched on input. |
| `change` | `CustomEvent<{ value: string }>` | Dispatched when the value is committed. |
| `fullscreen-open` | `CustomEvent<{}>` | Dispatched when the fullscreen editor opens. |
| `fullscreen-close` | `CustomEvent<{}>` | Dispatched when the fullscreen editor is closed. |
