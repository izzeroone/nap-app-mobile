import * as Ons from 'react-onsenui'
import c from 'classnames'

import React, {Component} from 'react'

import Chart from './Chart.jsx'
import Cookies from 'js-cookie';

import ColorPicker from './Control/ColorPicker'
import Lanes from './Control/Lanes'
import SelectedElement from './Control/SelectedElement'
import Shapes from './Control/Shapes'
import SuperLanes from './Control/SuperLanes'
import Schedule from './Control/Schedule'

export default class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      napchart: false, // until it is initialized
      ampm: this.getAmpm(),
      selectedControl: 0,
      showSchedule: false
    }
  }


  renderToolbar = () => {
    return (  
      <Ons.Toolbar>
        <div className='left'>Sleep Planning</div>
        <div className='right'>
        <Ons.ToolbarButton>
          <Ons.Icon icon='md-alarm'></Ons.Icon>
        </Ons.ToolbarButton>
        <Ons.ToolbarButton>
          <Ons.Icon icon='md-floppy'></Ons.Icon>
        </Ons.ToolbarButton>
        </div>
      </Ons.Toolbar>
    )
  } 

  selectControl = (index) => {
    this.setState({selectedControl: index});
    console.log(this.state.selectedControl);
  }

  toggleSchedule = () => {
    this.setState({
      showSchedule: !this.state.showSchedule
    })
  }

  renderBottomToolbar = () => {
    return (
    <Ons.BottomToolbar className='ons-toolbar'> 
        <Ons.Button style={{width: '25%'}} onClick={this.selectControl.bind(this, 0)}>Color</Ons.Button>
        <Ons.Button style={{width: '25%'}} onClick={this.selectControl.bind(this, 1)}>Shape</Ons.Button>
        <Ons.Button style={{width: '25%'}} onClick={this.selectControl.bind(this, 2)}>Lanes</Ons.Button>
        <Ons.Button style={{width: '25%'}} onClick={this.selectControl.bind(this, 3)}>Schedule</Ons.Button>
    </Ons.BottomToolbar>)
  }

  handleChange = (e) => {
    this.setState({selectedControl: e.activeIndex});
  }

  setIndex = (index) => {
    this.setState({selectedControl: index});
  }

  render() {
    let controls = [
      <SelectedElement napchart={this.state.napchart}/>,
      <Shapes napchart={this.state.napchart}/>,
      <SuperLanes napchart={this.state.napchart}/>,
      <Schedule napchart={this.state.napchart}/>
    ]


    return (
        <Ons.Page 
        renderToolbar={this.renderToolbar}
        renderBottomToolbar={this.renderBottomToolbar}>
          <Chart
            napchart={this.state.napchart}
            onUpdate={this.somethingUpdate}
            setGlobalNapchart={this.setGlobalNapchart}
            onLoading={this.loading} onLoadingFinish={this.loadingFinish}
            ampm={this.state.ampm}
          />
          <Ons.Carousel onPostChange={this.handleChange} index={this.state.selectedControl}>
            {controls.map((item, index) => (
              <Ons.CarouselItem key={index}>
                {item}
              </Ons.CarouselItem>
            ))}
          </Ons.Carousel>
        </Ons.Page>
    )
  }


  

  changeSection = (i) => {
    this.setState({
      currentSection: i
    })
  }

  setGlobalNapchart = (napchart) => {
    this.setState({
      napchart: napchart
    })
  }

  somethingUpdate = (napchart) => {
    this.forceUpdate()
  }


  setNumberOfLanes = (lanes) => {
    console.log(lanes)
    this.state.napchart.setNumberOfLanes(lanes)
  }

  getAmpm = () => {

    const cookiePref = Cookies.get('preferAmpm')
    if (cookiePref) {
      return eval(cookiePref)
    }

    var date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
    var dateString = date.toLocaleTimeString();

    //apparently toLocaleTimeString() has a bug in Chrome. toString() however returns 12/24 hour formats. If one of two contains AM/PM execute 12 hour coding.
    if (dateString.match(/am|pm/i) || date.toString().match(/am|pm/i)) {
      return true
    }
    else {
      return false
    }
  }

  setAmpm = (ampm) => {
    Cookies.set('preferAmpm', ampm)

    this.setState({
      ampm: ampm
    })
  }

}
