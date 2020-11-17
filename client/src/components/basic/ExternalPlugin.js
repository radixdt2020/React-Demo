import React, { Component } from 'react'
import Remarkable from 'remarkable';

export default class ExternalPlugin extends Component {
    constructor(props) {
        super(props);
        this.md = new Remarkable();
        //this.handleChange = this.handleChange.bind(this);
        this.state = { value: 'Append Data !' };
    }

    handleChange =(e)=> {
        console.log('123')
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        return { __html: this.md.render(this.state.value) };
    }
      
    render() {
        return (
            <div className="MarkdownEditor">
                <label htmlFor="markdown-content">
                    Enter some markdown
                </label>
                <textarea
                    id="markdown-content"
                    onChange={this.handleChange}
                    defaultValue={this.state.value}
                />
                <div
                className="content"
                dangerouslySetInnerHTML={this.getRawMarkup()}
                />
            </div>
        )
    }
}
