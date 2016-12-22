import React, { Component } from 'react'
import Movie from './Movie'
import MovieDetail from './MovieDetail'
import { Button, Glyphicon } from 'react-bootstrap'
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

    handleDeleteClick = (event) => {
      this.props.onDeleteClick(event, this.props )
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
                                            pullLeft={true}
                                            id={movie.imdbID}
                                            onClick={this.handleDeleteClick}
                                            style={{ borderRadius: 10+'px' }}
                                            bsStyle="danger"
                                            bsSize="xs"
                                            size="2x"
                                        >
                                          <Glyphicon glyph="remove" />
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
