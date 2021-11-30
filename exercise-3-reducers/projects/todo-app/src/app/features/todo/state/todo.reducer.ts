import uuid from 'uuid/v4';
import { Action, createAction, createReducer, on, props } from '@ngrx/store';

import * as TodoActions from './todo.actions';
import { Todo, TodoFilter } from './todo.model';

// In this exercise, the order of TODO comments is bit more jumping around the files than in previous exercises
// please try to follow them in that order (1, 2, 3 ...) so that you build your implementation as expected

// TODO 1: define and export "todoFeatureKey" to give name to a feature state slice (eg: todos)
export const todoFeatureKey = 'todo';

// TODO 2: define and export "State" interface with:
// "items" object consisting of "[id: string]" props and "Todo" values
// "editedTodoId" which can be string or null
// "todoFilter" of "TodoFilter" type
export interface State {
    items: {
        [id: string]: Todo;
    };
    editedTodoId: string | null;
    todoFilter: TodoFilter;
} // tslint:disable-line

// TODO 3: define and export "initialState" of type "State" with some default values
// Predefine (and store in constant variable) four IDs using uuid() and use them to create initial items with following titles
// 'Sign up for NgRx workshop' (mark it as done)
// 'Learn NgRx'
// 'Use NgRx in your apps'
// 'Implement amazing features for users'
const id1 = uuid();
const id2 = uuid();
const id3 = uuid();
const id4 = uuid();

export const initialState: State = {
    items: {
        [id1]: {id: id1, title: 'Sign up for NgRx workshop', done: true},
        [id2]: {id: id2, title: 'Learn Ngrx', done: false},
        [id3]: {id: id3, title: 'Use NgRx in your apps', done: false},
        [id4]: {id: id4, title: 'Implement amanzing features for users', done: false}
    },
    editedTodoId: null,
    todoFilter: 'ALL'
}
// TODO 4: define and export "todoReducer" const using "createReducer" NgRx factory

// TODO 5: pass in initialState as a first argument

// TODO 6: add "on(<some action>, (state, action) => { return state; })" handler (actions were imported as TodoActions)

// TODO 7: implement this for a real action eg "filterTodos" which re-uses whole state and overwrites "todoFilter" with the action payload value
// the 8th step is at the end of this file

// TODO 10: implement "on" handlers for all other actions (addTodoWithId, toggleTodo, removeTodo, editTodo, cancelEditTodo, updateTodo, removeDoneTodos)
// try to implement all of them while exploring different ways of creating new state using immutable approach

// TODO 11: try to run tests to see if adding implementation fulfilled their expectation

// TODO 8: define and export "reducer" function which accepts state and action and returns "todoReducer" called with state and action
// the 9th step is in todo.module.ts file

const todoReducer = createReducer(
    initialState,

    on(TodoActions.addTodo, (state, { title }) => {
        const id = uuid();
        return {
            ...state,
            items: {
                ...state.items,
                [id]: {
                    id,
                    title,
                    done: false
                }
            }
        }
    }),

    on(TodoActions.filterTodos, (state, { filter }) => ({
        ...state,
        todoFilter: filter
    })),

    on(TodoActions.addTodoWithId, (state, { title, id }) => {
        return {
            ...state,
            items: {
                ...state.items,
                [id]: {
                    id,
                    title,
                    done: false
                }
            }
        }
    }),

    on(TodoActions.toggleTodo, (state, { id }) => {
        const todo = state.items[id];
        return {
            ...state,
            items: {
                ...state.items,
                [id]: {
                    ...todo,
                    done: !todo.done
                }
            }
        }
    }),

    on(TodoActions.removeTodo, (state, { id }) => {
        const newState = {
            ...state,
            items: {
                ...state.items
            }
        };
        delete newState.items[id];
        if (newState.editedTodoId === id) {
            newState.editedTodoId = null;
        }
        return newState;
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return todoReducer(state, action);
}
