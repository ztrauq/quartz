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

![Flux's unidirectional flow](https://facebook.github.io/flux/img/flux-simple-f8-diagram-explained-1300w.png)
 
For example, here is flow of of a toggle button that shows or hides an element in the UI. The state is held in a property `isVisible` of the element's state

| Action        | Dispatch           | Store  | View |
| ------------- |:-------------| -----| ---|
| User clicks the toggle button and the event handler notifies the Dispatcher the user wants to change the state of the element      | The Dispatcher checks a register of Actions to find which Store handles this action | The Store changes of the state of the element | The View reacts to the state change and renders element |
| toggle state   | dispatch      | set isVisible to its opposite | show or hide element using CSS |

We can pass more than one state change in one Action. For example, if the element has a CSS3 transition on its changing state, toggling the state of `isTransitioning`, which could change the `disabled` property of the element.

| Action        | Dispatch           | Store  | View |                                                                                       
| ------------- |:-------------| -----| ---|                                                  
| toggle state   | dispatch      | set isVisible and isTransitioning to its opposite | show or hide element using CSS _and_ change the disabled property of the toggle button |

A change in the view can trigger a new action. so an event handler for `transitionend` can start a new Action which Dispatched to the Store effection ,

| Action        | Dispatch           | Store  | View |                                                                                       
| ------------- |:-------------| -----| ---|  
| toggle state   | dispatch      | set isVisible and isTransitioning to its opposite | show or hide element using CSS _and_ change the disabled property of the toggle button |
| transitionend   | dispatch      | set i isTransitioning to its opposite | hange the disabled property of the toggle button |