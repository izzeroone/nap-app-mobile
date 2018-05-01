import React from 'react'
import ColorPicker from './ColorPicker.jsx'
import { Meteor } from 'meteor/meteor';

export default class SelectedElement extends React.Component {
  setAlarm(element){
    console.log(element);
    
    if (Meteor.isClient) {
      console.log("Printed in browsers and mobile apps");
    }
    
    if (Meteor.isCordova) {
      cordova.plugins.notification.local.schedule({
        title: 'My first notification',
        text: 'Thats pretty easy...',
        foreground: true
    });
      console.log("Printed only in mobile Cordova apps");
    }
  }
  render() {
    var napchart = this.props.napchart
    var selected = napchart.selectedElement

    if (napchart) {
      var element = napchart.data.elements.find(e => e.id == selected)
      var activeColor = (typeof element == 'undefined') ? napchart.config.defaultColor : element.color


      return (
        <div className="SelectedElement">
          <div className="field">
            <ColorPicker
              onClick={this.changeColor}
              activeColor={activeColor}
            />
          </div>
          <div className="field">
            <input style={{ color: activeColor }} className="colorTag" type='text' placeholder={activeColor + ' ='}
              onChange={this.changeColorTag}
              value={this.colorTag(activeColor)}
            />
          </div>

          {selected &&
            <div>
              <div className="field has-addons level is-mobile">
                <div className="level-left">
                  <div className="level-item">
                    Selected element:
                  </div>
                  <div className="level-item">
                    <button onClick={napchart.deleteElement.bind(napchart, selected)} className="napchartDontLoseFocus button">Delete</button>
                    <button onClick={this.setAlarm.bind(this, element)} className="napchartDontLoseFocus button">Set Alarm</button>
                    {napchart.isTouchUser &&
                      <button onClick={napchart.forceFocusSelected} className="napchartDontLoseFocus button">Edit text</button>
                    }
                  </div>
                </div>
              </div>



            </div>
          }
        </div>
      )


    } else {
      return null
    }
  }

  colorTag = (color) => {
    var napchart = this.props.napchart
    var tagObj = napchart.data.colorTags.find(t => t.color == color)

    if (typeof tagObj == 'undefined') {
      return ''
    } else {
      return tagObj.tag
    }
  }

  changeColor = (color) => {
    var napchart = this.props.napchart
    napchart.changeColor(this.props.napchart.selectedElement, color)
    napchart.config.defaultColor = color
    this.forceUpdate()
  }

  changeColorTag = (e) => {
    var napchart = this.props.napchart
    var activeColor = (typeof element == 'undefined') ? napchart.config.defaultColor : element.color

    napchart.colorTag(activeColor, e.target.value)
    this.forceUpdate()
  }
}