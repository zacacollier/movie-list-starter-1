import React, { Component } from 'react'

export default class Movie extends Component {
    render() {
        const { props } = this
        return (
            <div>
                <div key={props.imdbID}>
                    <img className="center-block" alt={props.Title} src={props.Poster}/>
                    <span>{props.Title}</span>
                </div>
            </div>
        )
    }
}
