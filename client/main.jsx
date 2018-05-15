import {render} from 'react-dom'
import {Button} from 'react-onsenui'
import {Meteor} from 'meteor/meteor'
import React from 'react'
import './css/onsenui.min.css'
import './css/onsen-css-components.css'
// //import style not neccesary because we import from html file instead
import '../imports/styles/index.scss'

import Editor from '../imports/ui/Editor/Editor'

Meteor.startup(function() {
  render(<div>
    <Editor/>
    </div>, document.getElementById('app'));
});