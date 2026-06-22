# compact-file-input

## Native HTML basis

The component is based on a native `<input type="file">` element, styled as a dashed drag-and-drop zone.

## Props (attributes / properties)

| Name | TypeScript type | Description |
| --- | --- | --- |
| `label` | `string` | The primary text shown in the drop zone. |
| `accept` | `string` | Comma-separated list of acceptable file extensions or MIME types. |
| `multiple` | `boolean` | Boolean attribute/property. Whether multiple files can be selected. |

## Events

| Event | Type |
| --- | --- |
| `files-change` | `CustomEvent<{ files: File[] }>` |

Dispatched when files are selected or dropped into the area.
