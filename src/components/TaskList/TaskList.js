import React from 'react';
import './TaskList.css';
import Task from "../Task/Task";

import _ from 'lodash';

let tasks = require('../../tasks.json');

class TaskList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            allTasks:tasks.tasks,
            loadedTasks:[],
            offset:0,
            showMore:true
        };
        this.showMoreOrLess = this.showMoreOrLess.bind(this);
        this.onChangeCompleted = this.onChangeCompleted.bind(this);
        this.createTask = this.createTask.bind(this);
        this.unloadTasks = this.unloadTasks.bind(this);
    }

    loadTasks(limit){
        let newOffset = this.state.offset + limit;
        let slicedTasks = this.state.allTasks.slice(this.state.offset, newOffset);
        let newTasks = this.state.loadedTasks.concat(slicedTasks);
        this.setState((state, props)=> ({
            loadedTasks : newTasks,
            offset : newOffset,
            showMore: newOffset < state.allTasks.length
        }));
    }

    unloadTasks(limit){
        let newOffset = this.state.offset - limit;
        let newTasks = this.state.allTasks.slice(0, newOffset);
        this.setState((state, props)=> ({
            loadedTasks : newTasks,
            offset : newOffset,
            showMore: newOffset <= 5
        }));
    }

    componentDidMount() {
        this.loadTasks(5);
    }

    showMoreOrLess(){
        if(this.state.showMore){
            this.loadTasks(5);
        }else{
            this.unloadTasks(5);
        }
    }

    onChangeCompleted(taskId,val){
        this.setState((state,props)=>{
            let task = _.find(state.loadedTasks, (o) => o.id === taskId );
            if(task){
                task.completed = val;
            }
            return state;
        });
    }

    createTask(item,index){
        return <Task onChangeCompleted={this.onChangeCompleted} item={item} key={item.id} index={index}/>;
    }

    getTasks(){
        if(this.state.loadedTasks.length<1){
            return (<div>Loading...</div>)
        }else{
            return this.state.loadedTasks.map(this.createTask);
        }
    }

    render() {
        return (
            <ul className="theList" style={{
                background: "lightgrey",
                padding: 8,
                width: 500
            }}>
                {this.getTasks()}
                <button  onClick={this.showMoreOrLess} className="show-more">
                    {this.state.showMore ? 'Show More':'Show Less'}
                </button>
            </ul>
        );
    }
}

export default TaskList;