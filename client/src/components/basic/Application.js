import React, { Component } from 'react'

export default class Application extends Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.text.length === 0) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }

    render() {
        return (
            <div>
                <UserList items={this.state.items} />
                <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="new-todo">
                        Add item : 
                    </label>
                    <input
                        id="new-todo"
                        onChange={this.handleChange}
                        value={this.state.text}
                    />
                </div>
                <div>
                    <button>
                        Add #{this.state.items.length + 1}
                    </button>
                </div>
                </form>
            </div>
        )
    }
}
class UserList extends React.Component {
    render() {
      return (
        <ul>
          {this.props.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      );
    }
  }