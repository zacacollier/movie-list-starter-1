import React, { Component } from 'react';
import SearchBar from './components/SearchBar'
/* import './App.css';
 * */
export default class App extends Component {
  render() {
    return (
        <div>
            <link href="../node_modules/bootstrap/dist/css/bootstrap.min.css" />
            <SearchBar />
            <script href="../node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
            <script href="../node_modules/jquery/dist/jquery.min.js"></script>
        </div>
    );
  }
}
