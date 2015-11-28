/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './App.css';
import bs from './customBootstrap.less';
import withContext from '../../decorators/withContext';
import withViewport from '../../decorators/withViewport';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Footer from '../Footer';

@withViewport
@withContext
@withStyles(styles)
@withStyles(bs)
class App extends Component {

  static propTypes = {
    children: PropTypes.element.isRequired,
    error: PropTypes.object,
  };

  headerHeight = 166;
  footerHeight = 60;

  getHeight(elem, prevHeight) {
    if(elem) {
      var node = ReactDOM.findDOMNode(elem);
      return node.clientHeight;
    }
    return prevHeight;
  }

  updateheaderFooterHeights() {
    this.headerHeight = this.getHeight(this.header, this.headerHeight);
    this.footerHeight = this.getHeight(this.footer, this.footerHeight);
  }

  componentDidMount() {
    this.updateheaderFooterHeights();
  }

  componentDidUpdate() {
    this.updateheaderFooterHeights();
  }

  render() {
    const { height } = this.props.viewport;
    this.renderCss(`.App-Body {min-height: ${height-this.headerHeight-this.footerHeight}px;}`);
    return !this.props.error ? (
      <div>
        <Header ref={header => this.header = header}/>
        <div className="App-Body">
          {this.props.children}
        </div>
        <Footer ref={footer => this.footer = footer}/>
      </div>
    ) : this.props.children;
  }

}

export default App;
