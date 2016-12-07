import React, { Component } from 'react'
import Modal from 'react-modal'
import Movie from './Movie'

export default class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    closeModal = () => {
        this.setState({
            isOpen: false
        })
    }
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                onRequestClose={this.props.onRequestClose}
                contentLabel={this.props.Title}
            >
                <Movie
                    key={this.props.imdbID}
                    Title={this.props.Title}
                    Poster={this.props.Poster}
                />
                <button onClick={this.props.onRequestClose}>X</button>
            </Modal>
        )
    }
}
