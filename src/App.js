import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('todo')
@observer
class App extends Component {
  add = (e) => {
    if (e.which !== 13) return
    const { addTodo } = this.props.todo
    addTodo(e.target.value)
    e.target.value = ''
  }
  toggle(todo) {
    todo.complete = !todo.complete
  }
  render() {
    const { todoFilterList, setFilter, deleteComplete, asyncFn, status, removeTodo } = this.props.todo
    return (
      <div style={{padding: 20}}>
        <button onClick={asyncFn}>异步请求</button>
        <div>
          异步状态status: {status}
        </div>
        <p>
          新增
          <input onKeyPress={this.add} />
          过滤器
          <input onChange={(e) => setFilter(e.target.value)} />
        </p>
        {todoFilterList.map((todo, index) => (
          <li key={todo.id}>
            <input 
              type='checkbox' 
              checked={todo.complete} 
              onChange={this.toggle.bind(this, todo)} />
            {todo.value}
            <span 
              onClick={removeTodo.bind(this, todo)} 
              style={{cursor: 'pointer', marginLeft: 20}}>
              delete
            </span>
          </li>
        ))}
        <button onClick={deleteComplete}>delete complete</button>
      </div>
    );
  }
}

export default App;
