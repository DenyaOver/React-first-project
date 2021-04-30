import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

import './app.css'

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn react', important:true, like: false, id: 1},
                {label: 'This is so good', important:false, like: false, id: 2},
                {label: 'I need to break...', important:false, like: false, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = Math.floor(Math.random()*10000);
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const newArr = [...data.slice(0, index), ...data.slice(index +1)];

            return {
                data: newArr
            }
        });
    }
    addItem = (body) => {
        const newItem = {
            label: body,
            important: false,
            id: Date.now()+this.maxId
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex(elem=> elem.id === id);

            const old = data[index];
            const newItem = {...old, important:!old.important};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];
            return{
                data: newArr
            }

        })
    }

    onToggleLike = (id) => {
        this.setState(({data})=> {
            const index = data.findIndex(elem=> elem.id === id);

            const old = data[index];
            const newItem = {...old, like:!old.like};

            const newArr = [...data.slice(0, index), newItem, ...data.slice(index +1)];
            return{
                data: newArr
            }

        })
    }

    SearchPost(item, term) {
        if (term.length === 0){
            return item
        }
            return item.filter((item)=> {
                return item.label.indexOf(term) > -1
        });
    }

    filterPosts(items, filter) {
        if (filter === 'like'){
            return items.filter(item=> item.like)
        } else {
            return items
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) =>{
        this.setState({filter})
    }

    render(){
        const {data, term, filter} = this.state;
        const liked = data.filter(item=> item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.SearchPost(data, term), filter);
    return (
        <div>
        <AppHeader
        liked ={liked}
        allPosts={allPosts}/>
            <div className="search-panel d-flex">
                <SearchPanel
                onUpdateSearch = {this.onUpdateSearch}/>
                <PostStatusFilter
                filter = {filter}
                onFilterSelect={this.onFilterSelect}/>
            </div>
            <PostList 
            posts={visiblePosts}
            OnDelete={this.deleteItem}
            onToggleImportant = {this.onToggleImportant}
            onToggleLike = {this.onToggleLike}/>
            <PostAddForm
            onAdd={this.addItem} />
        </div>
    )
}}
