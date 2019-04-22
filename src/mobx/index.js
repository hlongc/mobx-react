import { observable, action, computed, autorun, flow } from 'mobx';

class Item{
  @observable value
  @observable id
  @observable complete

  constructor(value) {
    this.value = value
    this.id = Date.now()
    this.complete = false
  }
}

class Todo {
  @observable todoList = []
  @observable filter = ''
  @observable status = 'pending'
  @computed get todoFilterList() {
    const reg = new RegExp(this.filter, 'i')
    return this.todoList.filter(item => !this.filter || reg.test(item.value))
  }
  @action.bound removeTodo(todo) {
    this.todoList.remove(todo)
  }
  @action.bound setFilter(keyword) {
    this.filter = keyword
  }
  @action.bound addTodo(value) {
    this.todoList.push(new Item(value))
  }
  @action.bound deleteComplete() {
    const incompleteTodos = this.todoList.filter(item => !item.complete)
    this.todoList.replace(incompleteTodos)
  }
  @action.bound
  asyncFn = flow(function *() {
    try {
      this.status = 'pending'
      const result = yield function() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('success')
          }, 2000)
        })
      }()
      this.status = result
    } catch {
      this.status = 'error'
    }
  })
}

const todo = window.todo =  new Todo()

autorun(() => {
  console.log(todo.status)
})
export default todo;