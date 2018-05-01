import React, {Component} from 'react'
import * as Ons from 'react-onsenui'
export default class Page extends Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }
  
    renderToolbar() {
      return (
        <Ons.Toolbar>
          <div className='left'>
            <Ons.ToolbarButton onClick={this.show}>
              <Ons.Icon icon='ion-navicon, material:md-menu' />
            </Ons.ToolbarButton>
          </div>
          <div className='center'>Side menu</div>
        </Ons.Toolbar>
      );
    }
  
    hide = () => {
      this.setState({isOpen: false});
    }
  
    show = () => {
      this.setState({isOpen: true});
    }
  
    render(){
      return (
        <Ons.Splitter>
          <Ons.SplitterSide
            style={{
                boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
            }}
            side='left'
            width={200}
            collapse={true}
            swipeable={true}
            isOpen={this.state.isOpen}
            onClose={this.hide}
            onOpen={this.show}
          >
            <Ons.Page>
              <Ons.List
                dataSource={['Profile', 'Followers', 'Settings']}
                renderRow={(title) => (
                  <Ons.ListItem key={title} onClick={this.hide} tappable>{title}</Ons.ListItem>
                )}
              />
            </Ons.Page>
          </Ons.SplitterSide>
          <Ons.SplitterContent>
            <Ons.Page renderToolbar={this.renderToolbar}>
              <section style={{margin: '16px'}}>
                <p>
                  Swipe right to open the menu.
                </p>
              </section>
            </Ons.Page>
          </Ons.SplitterContent>
        </Ons.Splitter>
      );
    }
}