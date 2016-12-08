import React, { Component } from 'react';
import Bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import SearchBar from './components/SearchBar'
import Movie from './components/Movie'
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
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
        const savedUserInput = JSON.parse(localStorage.getItem('movies'))
        if (savedUserInput === null) {
            return
        }
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
        localStorage.setItem('movies', JSON.stringify(this.state.movies))
    }
  render() {
    return (
        <div>
            <SearchBar
                inputProps={this.props.inputProps}
                onChange={this.handleSearchbarChange}
                onClick={this.handleSuggestionSelect}
                movies={this.props.movies}
                handleSelect={this.handleSuggestionSelect}
            />
            <MovieList
                onClick={this.props.onClick}
                movies={this.state.movies}
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
            >
            </MovieList>
        </div>
    );
  }
}
