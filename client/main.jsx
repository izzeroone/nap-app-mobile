import {render} from 'react-dom'
import {Button} from 'react-onsenui'
import {Meteor} from 'meteor/meteor'
import React from 'react'

//import style
import '../node_modules/onsenui/css/onsenui.css'
import '../node_modules/onsenui/css/onsen-css-components.css'

import Editor from '../imports/ui/Editor/Editor'
import Page from '../imports/ui/Editor/Page'
import Controls from '../imports/ui/Editor/Controls'

Meteor.startup(function() {
  render(<div>
    <Editor/>
    </div>, document.getElementById('app'));
});