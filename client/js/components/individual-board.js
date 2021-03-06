import React from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actions.js';
import PanelContainer from './panel-container'
import ComicPreview from './comic-preview'
import Header from './header'

export class IndividualBoard extends React.Component {
  constructor(props) {
    super(props)
    this.newPanel = this.newPanel.bind(this)
    }

    componentDidMount() {
      this.props.dispatch(actions.getPanel());
    }

    newPanel() {
      this.props.dispatch(actions.createNewPanel())
    }

    render() {

      let panelsList = this.props.panels.map((panel, index) => {
        return (
          <ComicPreview key={index} content={panel} />
        )
      })

      return (
        <div className="indivBoard">
          <Header />
          <hr />
          <div className="new-strip-panel">
            <button className="new-strip-panel-button" onClick={() => this.newPanel()}>New Panel</button>
          </div>
          <ul className="listOfPanels">
            {panelsList}
          </ul>
           {this.props.modalUp ? <PanelContainer /> : null}
           {this.props.modalUp ? <div class="overlay"></div> : null}
        </div>
      )
    }
}


const mapStateToProps = (state, props) => ({
	panels: state.strip.panels,
  newPanel: state.strip.newPanel,
  panelInProgress: state.strip.panelInProgress,
  modalUp: state.strip.modalUp
})

export default connect(mapStateToProps)(IndividualBoard)
