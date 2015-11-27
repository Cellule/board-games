/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './GamesPage.css';
import request from 'superagent';
import xmlParser from 'xml-parser';

const games = [
  {
    name: "Betrayal at the House on the hill",
    workshop: "http://steamcommunity.com/sharedfiles/filedetails/?id=261027555",
    boardgamegeekId: 10547
  },
  {
    name: "Love Letter",
    workshop: "http://steamcommunity.com/sharedfiles/filedetails/?id=369012263",
    boardgamegeekId: 129622
  }
];

@withStyles(styles)
class GamesPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    onPageNotFound: PropTypes.func.isRequired,
  };

  state = {
    games: {}
  }

  getGameState(game) {
    return this.state.games[game.name] || {};
  }
  setGameState(game, state) {
    const thisState = this.state;
    thisState.games[game.name] = state;
    this.setState(thisState);
  }

  toggle(game) {
    const gamestate = this.getGameState(game);
    if(gamestate.expanded) {
      gamestate.expanded = false;
    } else {
      gamestate.expanded = true;
      if(game.boardgamegeekId && !gamestate.geek) {
        gamestate.geek = "Loading";
        request
          .get("http://www.boardgamegeek.com/xmlapi/boardgame/" + game.boardgamegeekId)
          .end((err, data) => {
            const state = this.getGameState(game);
            if(err) {
              state.geek = "Error loading information from boardgamegeek.com"
            } else {
              state.geek = xmlParser(data.text);
            }
            this.setGameState(game, state);
          });
      }
    }
    this.setGameState(game, gamestate);
  }

  render() {
    const title = 'Games';
    this.context.onSetTitle(title);
    const gamesList = games.map(game => {
      const gamestate = this.getGameState(game);
      const panel = gamestate.expanded && typeof gamestate.geek === 'object' ?
        <p>{JSON.stringify(gamestate.geek)}</p>
      : null;
      return (
        <li
          className="game-title"
          onClick={this.toggle.bind(this, game)}
        >
          {game.name}{panel}
        </li>
      );
    });
    return (
      <div>
        <h1>{title}</h1>
        <ul>{gamesList}</ul>
      </div>
    );
  }

}

export default GamesPage;
