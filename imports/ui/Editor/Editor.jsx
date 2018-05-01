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

import './Editor.scss'

export default class Editor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      napchart: false, // until it is initialized
      loading: false,
      url: window.siteUrl,
      chartid: window.chartid,
      title: window.title || '',
      description: window.description || '',
      currentSection: this.getInitialSection(),
      ampm: this.getAmpm(),
      selectedControl: 0
    }
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
        <Ons.ToolbarButton>
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        </div>
      </Ons.Toolbar>
    )
  } 

  selectControl = (index) => {
    this.setState({selectedControl: index});
    console.log(this.state.selectedControl);
  }

  renderBottomToolbar = () => {
    let controls = [{
      content: "FFuck",
      toolbarButton: "Stupdid fucking button"
    }];
    return (
    <Ons.BottomToolbar className='ons-toolbar'> 
        <div className='left'>
        <Ons.ToolbarButton onClick={this.selectControl.bind(this, 0)} >
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        <Ons.ToolbarButton onClick={this.selectControl.bind(this, 1)} >
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        <Ons.ToolbarButton onClick={this.selectControl.bind(this, 2)} >
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        <Ons.ToolbarButton onClick={this.selectControl.bind(this, 3)} >
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        </div>
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
      <SuperLanes napchart={this.state.napchart}/>
    ]

    return (
        <Ons.Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
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


  slideSidebarMobile = () => {
    this.setState({
      slideSidebarMobile: !this.state.slideSidebarMobile
    })
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

  loadingFinish = () => {
    this.setState({
      loading: false
    })
  }

  loading = () => {
    this.setState({
      loading: true
    })
  }

  changeTitle = event => {
    this.setState({
      title: event.target.value
    })
  }

  changeDescription = event => {
    this.setState({
      description: event.target.value
    })
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

  getInitialSection = () => {
    // should always return 0 except when s=1 found in url, because
    // then the user just saved chart and we will show share section instead

    if (window.location.toString().includes('s=1')) {
      return 1
    }

    return 0
  }
}
