//import { render } from '@testing-library/react';
import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users}));
    }

    onSearchChange = (event) => {
        this.setState({searchfield: event.target.value})    
    }

    time = (date) => {
        if(date.getHours() > 12) {
            return (date.getHours()-12 + ' pm')
        } else {
            return (date.getHours() + ' am')
        }
        
    }
    
    render() {
        const date = new Date();
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        }) 
        return (
            <div className='tc'>
                <h1 className='f1'>RoboFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <p className='time'>REAL TIME: {this.time(date)}</p>
                <Scroll>
                    <CardList robots={filterRobots}/>
                </Scroll>
            </div>
        );  
    } 
}

export default App;