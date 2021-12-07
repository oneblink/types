# OneBlink SDK | Form Element Definitions

[Back to all Elements](./README.md)

## ABN Element

Allow the user to enter a valid ABN (as per https://abr.business.gov.au/).

| Property       | Required | Type      | Default | Description                                                                              |
| -------------- | -------- | --------- | ------- | ---------------------------------------------------------------------------------------- |
| `type`         | Yes      | `string`  | `'abn'` | The type of Form Element.                                                                |
| `name`         | Yes      | `string`  |         | The key that will be assigned a value in the submission data when the form is submitted. |
| `label`        | Yes      | `string`  |         | Display text presented to the user above the input by default.                           |
| `defaultValue` | No       | `string`  |         | A default value when the form is opened.                                                 |
| `required`     | Yes      | `boolean` | `false` | Determine if this input requires a value entered by the user (`true`) or not (`false`).  |
| `readOnly`     | Yes      | `boolean` | `false` | Determine if this input can be edited by the user (`false`) or not (`true`).             |

ABN element also inherits the properties of the following:

- [Base Element](./base-element.md)
- [Lookup Element](./lookup-element.md)

### Example

```JSON
{
  "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
  "type": "abn",
  "name": "ABN",
  "label": "Please Enter Your ABN number",
  "defaultValue": "26008672179",
  "required": true,
  "readOnly": false
}
```

### Example Submission Data

```json
{
  "submission": {
    "[element.name]": {
      "abn": "26008672179"
    }
  }
}
```
