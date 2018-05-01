import {render} from 'react-dom'
import {Button} from 'react-onsenui'
import {Meteor} from 'meteor/meteor'
import React from 'react'

// //import style not neccesary because we import from html file instead
// import '../node_modules/onsenui/css/onsenui.css'
// import '../node_modules/onsenui/css/onsen-css-components.css'
import '../imports/styles/index.scss'

import Editor from '../imports/ui/Editor/Editor'
import Page from '../imports/ui/Editor/Page'
import Controls from '../imports/ui/Editor/Controls'

Meteor.startup(function() {
  render(<div>
    <Editor/>
    </div>, document.getElementById('app'));
});