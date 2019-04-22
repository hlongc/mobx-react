import { observable, action, computed } from 'mobx';

class mainStore{
  @observable 
  todoList = [
    { text: '我是待办事项1', complete: false }
  ]
  @computed
  get finish() {
    return this.todoList.filter(todo => todo.complete).length
  }
  @action
  onClick = () => {
    console.log('触发了action')
  }
  addTodo() {
    this.todoList.push({ text: `待办事项 ${Date.now()}`, complete: false })
  }
}

export default new mainStore();