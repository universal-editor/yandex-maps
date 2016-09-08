# Yandex maps

Field insert Yandex Map with ability to mark objects. It can be done using double click on map. From backend expects coordinates as string, for example: "37.620393,55.765575".

```json
{
    "name": "coordinates",
    "label": "Map",
    "type": "yandex-maps",
    "hint": "It's map field",
    "required": true,
    "expandable": true,
    "multiple": true,
    "filterable": true,
    "readonly": true,
    "list": true,
    "multiname": "new_value",
    "mapHeight": 400,
    "mapWidth": 400,
    "mapCenter": [37.620393,55.765575],
    "mapZoom": 5,
    "defaultValue" : "37.617313,55.756039"
}
```

## Options

* **name**: name of the field in the backend.
* **label**: field name (displayed in the editor interface).
* **type**: field type.
* **hint**: information tooltip text that is displayed to the left of the header fields.
* **required**: whether the field is required.
* **expandable**: if you want to ask for the additional field at the backend. If it is determined that a request for entity will be made in the format:

```
/rest/v1/news?expand=html_text
```

* **multiple**: setting is responsible for the designation of the field to take the possibility of multiple values.
* **filterable**: setting is responsible for adding fields in the filter shape. This option can only be specified in the fields
the first level. For fields invested in related entities (which are within the fields of type array) filters are not.
They will be created. The default adds all fields except those in which the value is set to false.
* **readonly**: specifies the ban on editing field.
* **list**: whether you want to display the field in the record list. Not valid for nested arrays in fields. In order to
the table was not empty, you must specify this option to true for at least one field.
* **multiname**: a key that will be used to create an array in the request to the backend in the event that the field
plural works in mode. If the key is not installed, go to the backend of the form array
`[ 'value1', 'value2', 'value3']`. If a key is installed, for example: `multiname:" value "`, then go to the backend
An array of the `[[" value "=>" value1 "], [" value "=>" value2 "], [" value "=>" value3 "]`.
* **requiredField**: option makes the field empty inactive when the values ​​of other fields specified in this parameter.
* **mapHeight**: height of the container that contains the map. Default value - 400 pixels.
* **mapWidth**: width of the container that contains the map. Default value - 400 pixels.
* **mapCenter**: map center. Default value — [37.620393,55.765575] (coordinates of the center of Moscow).
* **mapZoom**: map scale. Valid values are from 0 to 23 inclusive. 0 - the smallest (the whole earth). Default value - 5.
* **defaultValue** : Field default value (the first number - the latitude, the second - longitude).
