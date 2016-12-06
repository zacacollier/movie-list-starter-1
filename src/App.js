import React, { Component } from 'react';
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/SearchBar'
import MovieList from './components/MovieList'
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            movies: []
        }
    }
    componentDidMount = () => {
        const savedUserInput = JSON.parse(localStorage.getItem('userInputList'))
        console.log(savedUserInput)
        const filteredMovies = savedUserInput.filter((item) => {
            if (Object.keys(item).includes("imdbID")) {
                return item
            }
        })
        console.log(filteredMovies)
        this.setState({
            movies: filteredMovies
        })
    }
  render() {
    return (
        <div>
            <SearchBar movies={this.props.movies} />
            <MovieList movies={this.state.movies} />
        </div>
    );
  }
}
