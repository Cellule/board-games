/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './FlowChartPage.less';
import request from 'superagent';
import xmlParser from 'xml-parser';
import flowchart from './flowchart.json';
import {Col, Row, Grid} from 'react-bootstrap';

@withStyles(styles)
class FlowChartPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  state = {
    flow: flowchart
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
      display = <Col>
        <Row><Col className="question">{flow.question}?</Col></Row>
        <Row>
        {answers.map((a,i) => <Col className={"answer" + i} key={a} onClick={() => {
          this.setState({flow: flow[a]})
        }}>{a}</Col>)}
        </Row>
        <div className="clear"></div>
      </Col>
    } else {
      display = <div className="result">{flow}</div>;
    }
    return (
      <Grid className="flowchart">
        <h1>{title}</h1>
        <Row>{display}</Row>
      </Grid>
    );
  }

}

export default FlowChartPage;
