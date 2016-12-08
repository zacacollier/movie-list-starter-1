import React, { Component } from 'react'
import Modal from 'react-modal'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
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
                onRequestClose={this.closeModal}
                contentLabel={this.props.Title}
                movie={this.props}
            >
                <Button
                    bsStyle="warning"
                    onClick={this.props.onRequestClose}
                >
                    <FontAwesome
                        name="window-close"
                        size="2x"
                    >
                    </FontAwesome>
                    {this.props.children}

                </Button>
                    <Movie
                        key={this.props.imdbID}
                        Title={this.props.Title}
                        Poster={this.props.Poster}
                    />
            </Modal>
        )
    }
}
