import React, { Component } from 'react'
import Movie from './Movie'
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
                                    <li className="col-xs-12 col-sm-6 col-md-4 list-group-item text-center">
                                        <Movie
                                            key={movie.imdbID}
                                            Title={movie.Title}
                                            Poster={movie.Poster}
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
