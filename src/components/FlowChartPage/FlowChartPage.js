import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './FlowChartPage.less';
import request from 'superagent';
import xmlParser from 'xml-parser';
import flowchart from './flowchart.json';
import {Col, Row, Grid, Button, Well} from 'react-bootstrap';
import Conditional from '../Conditional';

@withStyles(styles)
class FlowChartPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  state = {
    flow: flowchart,
    back: null
  }

  render() {
    const title = 'Flow Chart';
    var display;
    var flow = this.state.flow;
    if(flow.question) {
      var answers = [];
      for(var answer in flow) {
        if(flow.hasOwnProperty(answer) && answer !== "question") {
          answers.push(answer);
        }
      }
      display = <Col xs={12}>
        <Row><Col xs={12}><Well>{flow.question}?</Well></Col></Row>
        <Row>
          {answers.map((a,i) => <Col xs={10} xsPush={1} md={(10 / answers.length)|0} key={a}>
            <Button block bsStyle={i==0?"primary":"success"} onClick={() => {
              this.setState({
                flow: flow[a],
                back:{flow: this.state.flow, back: this.state.back}}
              )
            }}>{a.charAt(0).toUpperCase() + a.substr(1).toLowerCase()}</Button>
          </Col>)}
        </Row>
      </Col>
    } else {
      display = <div className="result"><Well>{flow}</Well></div>;
    }
    return (
      <Grid className="flowchart">
        <h1>{title}</h1>
        <Row>{display}</Row>
        <Conditional condition={!!this.state.back}>
          <Button bsStyle="danger" onClick={() => {
            this.setState({
              flow: this.state.back.flow,
              back: this.state.back.back
            });
          }}>Back</Button>
        </Conditional>
      </Grid>
    );
  }

}

export default FlowChartPage;
