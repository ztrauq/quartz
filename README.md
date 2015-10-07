# Quartz

__Quartz__ is an internal project of Market Evaluator.

It sets out the guiding principles for development of Market Evaluator products in [MeteorJS](https://github.com/meteor/meteor).

__Quartz__ is motivated by the need to ensure consistency of approach in development. Using principles will help the development team to optimise the code base and make it adoptable by new members to the team.

it is assumed that __Quartz__ projects are conceived as human computer interfaces which allow users to interact with data. To this end, __Quartz__ is user-centric focusing on a standardised and simple user experience. The `User Interface` is a critical bridge between the user and the data. 



1. Stateful UI
2. Component driven 
3. Reactive Updating
4. Seperation Concerns 
                                                                             
### 1. Stateful UI

#### The UI is __stateful__
 
The __stateful__ approach to UI development is declarative, describing the state of the UI. Changes to the state of the UI are reflexive of user interaction and reflects _what the user wanted to do_. It is useful to contrast this with the imperative paradigm which describes _how to do something_. In the declarative paradigm, a change of state is followed by programmatic action. In the imperative paradigm, programmatic action results in a change of state.                                                                   

In the declarative paradigm of __Quartz__, the state of the UI is measure of the user's interaction with the programme. The state of the UI is a delta, reflecting the previous state plus any changes to the state from the last interaction. And the change in state initiates programmatic action.  

The flow of the programme follows a change in its state. It is uni-direction. To handle this, we are deploying Facebook's Flux paradigm. In Flux, an action initiates a change in state. The action is dispatched to function of the programme, which is maintained in a store. The store is the sole delegated change the state, A change in state is then reflected in teh view.
 
For example, here is flow of of a toggle button that shows or hides an element in the UI.

| Action        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
  
 | Action | Dispatch | Store | View |
 | ------ | -------- | ----- | ---- |
 | User Clicks the toggle button and the event handler tells the Dispatcher the user is initiated Action to toggle the state of the element | The Dispatcher checks a register of Actions to find which Store handles this action| The Store changes of the `isVisible` state of the elemnt | The View sees the state has changed, and reflects this, changing both the toggle button and the el. |
  
  This is a double-loop.


