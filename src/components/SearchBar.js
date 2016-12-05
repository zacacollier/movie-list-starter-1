import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Autosuggest, { theme } from 'react-autosuggest'

export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            value: '',
            userInputList: [],
            suggestions: []
        }
        this.onChange = this.onChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        const savedUserInput = JSON.parse(localStorage.getItem('userInputList'))

        if (savedUserInput) {
            this.setState({
                ...this.state,
                userInputList: savedUserInput
            })
        }
    }


    getSuggestion = (value) => {
        const { suggestions } = this.state
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        return inputLength === 0
            ? []
            : suggestions.filter(movie => {
                return movie.Title
                     ? movie.Title.toLowerCase().slice(0, inputLength) === inputLength
                     : `Working...`
                })
    }
    getSuggestionValue = (suggestion) => {
        return suggestion.Title
    }

    renderSuggestion = (suggestion) => {
        return (
            <a className="searchResult-link">
                <img
                    alt={suggestion.Title}
                    src={suggestion.Poster}
                    className="searchResult-image"
                />
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.Title}
                    </div>
                </div>
            </a>
        )
    }

    onSelectSuggestion = (event, { suggestion }) => {
        console.log(`Suggestion: ${suggestion}`)
    }

    onSuggestionsFetchRequested = ({ value }) => {
        console.log(value)
        this.setState({
            suggestions: this.getSuggestion(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    handleClick(event) {
        event.preventDefault()
        /* this.props.onAdd(userInputList[0])*/
    }

    onChange(event, { newValue }) {
        // replace spaces with "+"
        this.setState({
            ...this.state,
            value: newValue
        })
        let inputFilter = this.state.value.split('')
                              .map((i) => i.replace(/\s/, "+"))
                              .join('')
        axios.get(`http://www.omdbapi.com/?t=${event.target.value}&plot=short&r=json`)
             .then(resp => this.setState({ suggestions: [resp.data] }))
             .catch(err => console.error(`Axios: SearchBar error: ${err}`))
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
            value,
            onChange: this.onChange,
            placeholder: 'Search...'
        }
        return (
            <section className="container">
                <div className="row">
                    <section className="col-xs-12">
                        <Autosuggest
                            suggestions={suggestions}
                            getSuggestionValue={this.getSuggestionValue}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            inputProps={inputProps}
                            renderSuggestion={this.renderSuggestion}
                            theme={theme}
                        />

                    </section>
                </div>
            </section>
        )
}
    }
