import React, { Component } from 'react'
import Movie from './Movie'
import MovieDetail from './MovieDetail'
export default class MovieList extends Component {

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
                                        onClick={this.props.onClick}
                                    >
                                        <Movie
                                            key={movie.imdbID}
                                            Title={movie.Title}
                                            Poster={movie.Poster}
                                            onClick={movie.onClick}
                                        />
                                        <MovieDetail
                                            isOpen={this.props.isOpen}
                                            onRequestClose={this.props.onRequestClose}
                                            contentLabel={movie.Title}
                                            movie={movie}
                                            key={movie.imdbID + `m`}
                                            Title={movie.Title}
                                            Poster={movie.Poster}
                                        >
                                        </MovieDetail>
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
