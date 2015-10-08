
const STORE = 'circuit';
const CIRCUIT_TOGGLE = 'CIRCUIT_TOGGLE';


Template.circuit.utils = {

};



/* ACTION */
Template.circuit.events({
  'click #switch' : function () {
    let payload = {};
    payload.actionType = CIRCUIT_TOGGLE;
    Dispatcher.dispatch(payload);
  }
});

 /* DISPATCHER
   The dispatcher is all handled in meteorflux:disptacher
*/

/* STORE */
Template.circuit.onCreated( function( ){


  // Do stuff when actions happen
  Dispatcher.register(function(payload) {
    switch (payload.actionType) {
      case CIRCUIT_TOGGLE:
        STORES[STORE].circuitToggle();
        break;
    }
  });

  let states = [
    {meta: 'light on', closed: true, currentState: false},
    {meta: 'light off', closed: false, currentState: true},
  ];

  AppState.set(STORE,states);

  // The Store's functions

  STORES[STORE] = {
    circuitToggle : function(){
      console.log('circuitToggle');

      let states = AppState.get(STORE);

      _.each(states, function(state){
        state.currentState = !state.currentState;
      });

      AppState.set(STORE,states);

    },
    getState : function (){
      let states = AppState.get(STORE);
      console.log('getState', states, _.findWhere(states, {currentState: true}))
      return _.findWhere(states, {currentState: true})
    }
  }

});

Template.circuit.onDestroyed( function( ){

});

/* VIEW */
Template.circuit.helpers({
  circuit: function () {
    return STORES[STORE].getState();
  }
});



Template.circuit.onRendered( function( ){

});

/* OTHER STUFF */


