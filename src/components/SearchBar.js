import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            userInput: '',
            userInputList: []
        }
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

    handleInputChange(event) {
        // replace spaces with "+"
        this.setState({
            ...this.state,
            userInput: event.target.value
        })
        let inputFilter = this.state.userInput.split('').map((i) => i.replace(/\s/, "+")).join('')
        axios.get(`http://www.omdbapi.com/?t=${inputFilter}&plot=short&r=json`)
             .then(resp => console.log(resp.data))
             .catch(err => console.error(`Axios: SearchBar error: ${err}`))
    }

    handleClick(event) {
        event.preventDefault()
        /* this.props.onAdd(userInputList[0])*/
    }

    render() {
        return (
            <section className="container">
                <div className="row">
                    <section className="col-xs-12">
                        <label htmlFor="userInput">Search movies to add:
                        </label>
                        <input
                            type="text"
                            value={this.state.userInput}
                            onChange={this.handleInputChange.bind(this)}
                        />
                        <Button
                            bsStyle="primary"
                            type="submit"
                            onClick={this.handleClick.bind(this)}
                        >
                            Add
                        </Button>
                    </section>
                </div>
            </section>
        )
}
    }
