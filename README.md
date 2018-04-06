# React Simple Checkbox

A react checkbox component, with custom color and simple animation

## Preview

![checkbox.gif](https://media.giphy.com/media/28CorxYk9rZhWcyZl6/giphy.gif)

## Getting Started

### Installing

```
npm install react-simple-checkbox
```

### Usage

```js
import Checkbox from 'react-simple-checkbox';
```

### Props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>id</td>
          <td>String</td>
          <td></td>
          <td>checkbox's id, used for the label's 'for' attribute</td>
        </tr>
        <tr>
          <td>color</td>
          <td>String</td>
          <td>#4A4A4A</td>
          <td>checkbox's color</td>
        </tr>
        <tr>
          <td>size</td>
          <td>number</td>
          <td>1</td>
          <td>possible values are 1, 2 or 3</td>
        </tr>
        <tr>
          <td>borderThickness</td>
          <td>number</td>
          <td>3</td>
          <td>border thickness in pixels, possible values are 1, 2, 3, 4</td>
        </tr>
        <tr>
          <td>className</td>
          <td>String</td>
          <td></td>
          <td>additional class name of root node</td>
        </tr>
        <tr>
          <td>checked</td>
          <td>boolean</td>
          <td>false</td>
          <td></td>
        </tr>
        <tr>
          <td>OnCheck</td>
          <td>Function(isChecked:boolean)</td>
          <td></td>
          <td>called when checkbox is changed. isChecked is the new checkbox value.</td>
        </tr>
    </tbody>
</table>

## Authors

* **Opsolem**

## License

This project is licensed under the MIT License
