import uuid from 'uuid/v4';
import { createAction, props } from '@ngrx/store';
import { Todo, TodoFilter } from './todo.model';
import { stringify } from 'querystring';

// every action has a type, don't forget to use following type format: [<action-origin>] <action-description>
// eg: [User Page] Load Users

// try to explore reducer to see how is given action used to produce a new state

// TODO 1: create "addTodo" action with a "title" payload (the text of the todo)
export const addTodo = createAction('[Todo Page] Add Todo', props<{title: string}>());

// TODO 2: create "toggleTodo" action with a "id" payload (string)
export const toggleTodo = createAction('[Todo Page] Toggle Todo', props<{id: string}>());

// TODO 3: create "removeTodo" action with a "id" payload (string)
export const removeTodo = createAction('[Todo Page] Remove Todo', props<{id: string}>());

// TODO 4: create "editTodo" action with a "id" payload (string)
export const editTodo = createAction('[Todo Page] Edit Todo', props<{id: string}>());;

// TODO 5: create "cancelEditTodo" action without payload
export const cancelEditTodo = createAction('[Todo Page] Cancel Edit Todo');

// TODO 6: create "updateTodo" action with a "todo" payload (Todo type), (flat or in property? explore reducer...)
export const updateTodo = createAction('[Todo Page] Update Todo', props<{todo: Todo}>());;

// TODO 7: create "removeDoneTodos" action without payload
export const removeDoneTodos = createAction('[Todo Page] Remove Done Todos');;

// TODO 8: create "filterTodos" action  with a "filter" payload (TodoFilter type)
export const filterTodos = createAction('[Todo Page] Filter Todos', props<{filter: TodoFilter}>());;

// TODO 9: create "addTodoWithId" action using CUSTOM action factory method (prop) => payload
// the factory with accept title (text of the to-do) but the resulting payload will be an object with both "title" and "id" properties (id is generated using uuid)
export const addTodoWithId = createAction('[Todo Page] Add Todo (with ID)', (title: string) => ({title, id: uuid() }));;

// there are further TODO comments in todo.component.ts, please continue there...
