import React from 'react';
import ReactDOM from 'react-dom';


class TaskInput extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.props.onInputChange(event.target.value);
    }

    handleSubmit(event) {
        this.props.onInputSubmit();
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" placeholder="What needs to be done?" value={this.props.value} onChange={this.handleChange} />
            </form>
        );
    }
}


class TaskItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleStatusChange = this.handleStatusChange.bind(this);   
    }

    handleStatusChange(event) {
        this.props.onStatusChange(this.props.index);
        event.preventDefault();
    }

    render() {
        const status = this.props.task.isCompleted ? '✓' : 'x';
        return(
            <li key={this.props.task.id}>{this.props.task.description}: <button onClick={this.handleStatusChange}>{status}</button></li>
        );
    }
}


class TasksList extends React.Component {

    render() {
        const items = this.props.items;
        const listItems = items.map((item, i) => <TaskItem task={item} index={i} onStatusChange={this.props.onStatusChange} />);
        return(
            <ul>
                {listItems}
            </ul>
        );
    }
}


class TodoList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {taskInputValue: '', tasksList: []};
        this.handleTaskInputChange = this.handleTaskInputChange.bind(this);
        this.handleTaskInputSubmit = this.handleTaskInputSubmit.bind(this);
        this.handleTaskStatusChange = this.handleTaskStatusChange.bind(this);
    }


    handleTaskInputChange(textInput) {
        this.setState({taskInputValue: textInput});
    }

    handleTaskInputSubmit() {
        if (this.state.taskInputValue) {
            const newtask = {description: this.state.taskInputValue, id: Date.now(), isCompleted: false }
            this.setState({tasksList: this.state.tasksList.concat(newtask)});
            this.setState({taskInputValue: ''});
        }
    }


    handleTaskStatusChange(index) {
        const newStatus = !(this.state.tasksList[index].isCompleted);
        const taskChanged = Object.assign(this.state.tasksList[index],{isCompleted: newStatus});
        const firstPart = this.state.tasksList.slice(0,index);
        const lastPart = this.state.tasksList.slice(index+1);
        const newList = firstPart.concat(taskChanged,lastPart);
        this.setState({tasksList: newList});
    }

    render() {
        return (
            <div>
                <h1>todos</h1>
                <TaskInput
                    value={this.state.taskInputValue}
                    onInputChange={this.handleTaskInputChange}
                    onInputSubmit={this.handleTaskInputSubmit}
                />
                <TasksList items={this.state.tasksList} onStatusChange={this.handleTaskStatusChange} />
            </div>
        );
    }
}


ReactDOM.render(
    <TodoList />,
    document.getElementById('root')
);