import React, { Component } from 'react'
import Movie from './Movie'
import MovieDetail from './MovieDetail'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
export default class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    handleMovieClick = (event) => {
        this.props.onClick(event)
    }

    onRequestClose = () => {
        this.setState({
            isOpen: false
        })
    }

    render() {
    const { movies } = this.props
        return (
            <section className="container-fluid">
                <div className="row">
                    <ul className="list-group">
                        {
                            movies.map((movie) => {
                                return (
                                    <li
                                        className="col-xs-12 col-sm-6 col-md-3 list-group-item text-center movie"
                                    >
                                        <Button
                                            bsStyle="danger"
                                            size="2x"
                                        >
                                            <FontAwesome
                                                name="window-close"
                                                size="2x"
                                            >
                                            </FontAwesome>
                                        </Button>
                                        <Movie
                                            key={movie.imdbID}
                                            Title={movie.Title}
                                            Poster={movie.Poster}
                                            onClick={this.props.onClick}
                                            isOpen={this.props.isOpen}
                                        />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </section>
        )
    }
}
