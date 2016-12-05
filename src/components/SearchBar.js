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
                    src={suggestion.Poster ? suggestion.Poster : 'http://images1.desimartini.com/static1/images/reel.gif'}
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

    onSuggestionSelected = (event, { suggestion, suggestionValue, method = 'click'}) => {
        event.preventDefault()
        /* const updateUserInputList = this.state.userInputList.concat(suggestion)*/
        const userInputList = [this.state.value, ...this.state.suggestions]
        this.setState({
            ...this.state,
            userInput: '',
            userInputList: userInputList
        })
        localStorage.setItem('userInputList', JSON.stringify(this.state.userInputList))
        console.log(this.state.userInputList)
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestion(value)
        })
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            ...this.state,
            value: '',
            suggestions: []
        })
    }

    handleClick(event, {suggestion}) {
        event.preventDefault()
        this.onSuggestionSelected(event, {suggestion})
    }

    onChange(event, { newValue }) {
        this.setState({
            ...this.state,
            value: newValue
        })
        // replace spaces with "+"
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
                            onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
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
