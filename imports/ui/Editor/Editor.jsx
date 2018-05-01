import * as Ons from 'react-onsenui'
import c from 'classnames'

import React, {Component} from 'react'

// import Header from './Header.jsx'
// import ToolBar from './ToolBar.jsx'
// import Link from '../common/Link.jsx'
import Chart from './Chart.jsx'
import Controls from './Controls.jsx'
// import Controls from './sections/Controls.jsx'
// import Polyphasic from './sections/Polyphasic.jsx'
import Cookies from 'js-cookie';

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
      items: [
        '#F1948A',
        '#D7BDE2',
        '#85C1E9',
        '#73C6B6',
      ],
      index: 0
    }
  }

  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>My app</div>
        <div className='right'>
        <Ons.ToolbarButton>
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        </div>
      </Ons.Toolbar>
    )
  } 

  renderBottomToolbar(){
    return (
    <Ons.BottomToolbar modifier="material"> 
        <div className='center'>My app</div>
        <div className='right'>
        <Ons.ToolbarButton>
          <Ons.Icon icon='ion-navicon, material:md-menu'></Ons.Icon>
        </Ons.ToolbarButton>
        </div>
    </Ons.BottomToolbar>)
  }

  handleChange = (e) => {
    this.setState({index: e.activeIndex});
  }

  setIndex = (index) => {
    this.setState({index: index});
  }

  render() {

    return (
        <Ons.Page renderToolbar={this.renderToolbar} renderBottomToolbar={this.renderBottomToolbar}>
          <Chart
            napchart={this.state.napchart}
            onUpdate={this.somethingUpdate}
            setGlobalNapchart={this.setGlobalNapchart}
            onLoading={this.loading} onLoadingFinish={this.loadingFinish}
            ampm={this.state.ampm}
          />
          <Ons.Carousel onPostChange={this.handleChange} index={this.state.index}>
            {this.state.items.map((item, index) => (
              <Ons.CarouselItem key={index} style={{backgroundColor: item}}>
                <div style={{marginTop: '50%', textAlign: 'center'}}>
                  Swipe me!
                </div>
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
