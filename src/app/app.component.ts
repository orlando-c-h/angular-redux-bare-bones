import {Component} from '@angular/core';
import {createStore} from 'redux';

@Component(
 { selector: 'app-root',
   template: `
   <h1>
     {{title}}     
   </h1>    
   `,
   styles: []
})
export class AppComponent {
 title = 'Open up your browser console to see To-Dos statistics!';

//for now  we will use this helper function to log the current app state in the browser
 logStats(state, message){
   const completeness = Math.round(state.todos.filter(x => x.done).length * 100 / state.todos.length);
   console.log(`%c ${message}`, 'background: lightblue');
   console.log(state);   
   console.log(`%c There are ${state.todos.length} todos in the list`, 'background: lightyellow');
   console.log(`%c ${completeness}% of the tasks are done`, 'background: lightyellow');
 }

 ngOnInit() {   
   this.logStats(store.getState(), 'Initial State...');   

   //we start off by dispatching an action
   store.dispatch({
     type: 'ADD_TODO',
     todo: {
       id: 3,
       name: 'New to-do',
       notes: null,
       due: new Date(new Date().setDate(new Date().getDate() + 7)),
       done: false
     }
   });

   this.logStats(store.getState(), 'After adding a to-do...');   
  }
}

//Default app state
export const defaultState = {
  todos: [
    {
      id: 1,
      name: 'Lunch with Lily',
      notes: 'sea food',
      due: new Date(new Date().setDate(new Date().getDate() + 4)),
      done: false
    }, {
      id: 2,
      name: 'Visit N. Hirano',
      notes: 'confirm the meeting ahead of time',
      due: new Date(new Date().setDate(new Date().getDate() + 5)),
      done: false
    }
  ]
 };

//the reducer will calculate the new state, based on the current state and the action received
export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          action.todo
        ]
      });
    default:
      return state;
  }
}

//We create our only store. It will hold the complete state of the app
export const store = createStore(reducer, defaultState);
