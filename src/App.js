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
            movies: [],
            userInputList: [],
            isOpen: false
        }
    }
    componentDidMount = () => {
        const savedUserInput = JSON.parse(localStorage.getItem('userInputList'))
        const filteredMovies = savedUserInput.filter((item) => {
            if (Object.keys(item).includes("imdbID")) {
                return item
            }
        })
        this.setState({
            movies: filteredMovies
        })
    }
    handleSearchbarChange = (event, suggestions) => {
        this.setState({
            suggestions: suggestions
        })
        console.log(suggestions)
        // replace spaces with "+"
    }
    handleSuggestionSelect = (suggestion) => {
        const newMovies = this.state.movies.concat(suggestion).reduce((acc, prev) => {
            if (prev.Actors) acc.push(prev)
            return acc
        }, [])
        console.log(newMovies)
        this.setState({
            movies: newMovies
        })
        /* localStorage.setItem('userInputList', JSON.stringify(this.state))*/
    }
    handleMovieClick = (event) => {
        console.log(event.target.value)
    }
  render() {
    return (
        <div>
            <SearchBar inputProps={this.props.inputProps} onChange={this.handleSearchbarChange} onClick={this.handleSuggestionSelect} movies={this.props.movies} handleSelect={this.handleSuggestionSelect} />
            <MovieList handleMovieClick={this.handleMovieClick} movies={this.state.movies} />
        </div>
    );
  }
}
