import React from 'react';
import './Task.css';

class Task extends React.Component {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(item){
        this.props.onChangeCompleted(item.id, !item.completed)
    }

    render() {
        return (
            <li style={{textDecoration: this.props.item.completed ? "line-through" : "none"}}>
                <input type="checkbox" checked={this.props.item.completed} onChange={
                    (e)=> this.handleClick(this.props.item)
                }/>
                {this.props.item.details}
            </li>
        );
    }
}

export default Task;