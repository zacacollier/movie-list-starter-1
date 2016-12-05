import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import Autosuggest from 'react-autosuggest'

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
                return movie.title
                     ? movie.title.toLowerCase().slice(0, inputLength) === inputValue
                     : `Working...`
                })
    }
    getSuggestionValue = (suggestion) => {
        const { suggestions } = this.state
        return suggestions.name
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

    onChange(event) {
        // replace spaces with "+"
        this.setState({
            ...this.state,
            value: event.target.value
        })
        let inputFilter = this.state.value.split('')
                              .map((i) => i.replace(/\s/, "+"))
                              .join('')
        axios.get(`http://www.omdbapi.com/?t=${inputFilter}&plot=short&r=json`)
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
                        />

                    </section>
                </div>
            </section>
        )
}
    }
