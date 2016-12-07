import React, { Component } from 'react'
import axios from 'axios'
import Autosuggest, { theme } from 'react-autosuggest'

export default class SearchBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: '',
            userInputList: [],
            suggestions: []
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

    renderSuggestion = (suggestion, { query }) => {
        if (suggestion.Poster) {
            return (
            <a className="searchResult-link col-xs-12 list-group">
                <div id="movie" className="searchResult-text col-xs-12 list-group-item">
                    <img
                        alt={suggestion.Title}
                        src={suggestion.Poster ? suggestion.Poster : 'http://images1.desimartini.com/static1/images/reel.gif'}
                        className="searchResult-image"
                    />
                    <span className="searchResult-name">
                        {suggestion.Title}
                    </span>
                </div>
            </a>
                )
        }
        return (
            <a className="searchResult-link">
                <div id="movie" className="searchResult-text">
                    <span className="searchResult-name">
                        {suggestion.Title}
                    </span>
                </div>
            </a>
        )
    }

    onSuggestionSelected = (event, { suggestion, suggestionValue, method}) => {
        this.handleClick(event, suggestion)
    }


    onSuggestionsClearRequested = () => {
        this.setState({
            value: '',
            suggestions: []
        })
    }

    /* shouldRenderSuggestions = (value) => {
     *     const { suggestions } = this.state
     *     const inputValue = value.trim().toLowerCase()
     *     const inputLength = inputValue.length
     *     for (let movie of suggestions) {
     *         return !!movie.Title 
     *     }
     * }
     */
    onSuggestionsFetchRequested = ({ value }) => {
        console.log(value)
        let inputFilter = value.split('')
                               .map((i) => i.replace(/\s/, "+"))
                               .join('')
        axios.get(`http://www.omdbapi.com/?t=${inputFilter}&plot=short&r=json`)
             .then(resp => this.setState({ suggestions: [resp.data] }))
             .catch(err => console.error(`Axios: SearchBar error: ${err}`))
        /* this.setState({
         *     suggestions: this.getSuggestion(value)
         * })*/
    }

    handleClick = (event, suggestion) => {
        event.preventDefault()
        /* if suggeston is event return */
        this.props.onClick(event, suggestion)
    }

    onSuggestionSelected = (event, { suggestion }) => {
        axios.get(`http://www.omdbapi.com/?t=${suggestion.Title}&plot=short&r=json`)
             .then(resp => this.props.handleSelect([resp.data]))
             .catch(err => console.error(`Axios: SearchBar error: ${err}`))
    }

    onChange = (event, { newValue }) => {
        this.setState({
            ...this.state,
            value: newValue
        })
        // replace spaces with "+"
    }

    render() {
        const { value, suggestions } = this.state
        const inputProps = {
            value,
            onChange: this.onChange,
            onClick: this.handleClick,
            placeholder: 'Search...',
            className: 'form-group col-xs-12'
        }
        return (
            <section className="container">
                <div className="row">
                    <section className="col-xs-12 form-inline search">
                        <Autosuggest
                            movies={this.state.userInputList}
                            suggestions={suggestions}
                            getSuggestionValue={this.getSuggestionValue}
                            onSuggestionSelected={this.onSuggestionSelected}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            shouldRenderSuggestions={this.shouldRenderSuggestions}
                            handleSelect={this.props.handleSelect}
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
