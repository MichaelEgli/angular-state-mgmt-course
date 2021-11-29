import { createFeatureSelector, createSelector } from '@ngrx/store';

import { todoFeatureKey, State } from './todo.reducer';

// TODO 1: create feature selector for the todo feature key
export const selectTodoFeature = createFeatureSelector<State>(todoFeatureKey);

// TODO 2: create "selectTodoFilter" selector to select "todoFilter" state property
export const selectTodoFilter = createSelector(selectTodoFeature, state => state.todoFilter);

// TODO 3: create "selectTodos" selector to select todo items as an array (please return only items which are valid based on active filter)
export const selectTodos = createSelector(selectTodoFeature, selectTodoFilter, (todo, filter) => 
Object.values(todo.items).filter(item => {
    if (filter === 'ALL') {
        return true;
    } else if (filter === 'DONE') {
        return item.done;
    } else if (filter === 'ACTIVE') {
        return !item.done;
    }
}));

// TODO 4: create "selectTodosCount" selector to select todo items count (there at least two ways to do this, eg: array vs object)
export const selectTodosCount = createSelector(selectTodos, todos => todos.length);

// TODO 5: create "selectEditedTodo" selector to select todo item that is being edited (state has a "editedTodoId" property)
export const selectEditedTodo = createSelector(selectTodoFeature, todo => todo.items[todo.editedTodoId]);
