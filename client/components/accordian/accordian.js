const STORE = 'accordion';
const ACCORDION_TOGGLE = 'ACCORDION_TOGGLE';


/* ACTION */
Template.accordion.events({
  'click .accordion>.title' : function (e,t) {
    let name = t.$(e.target).attr('name');
    let payload = {};
    payload.actionType = ACCORDION_TOGGLE;
    payload.data = {name: name};
    Dispatcher.dispatch(payload);
  }
});

 /* DISPATCHER
   The dispatcher is all handled in meteorflux:disptacher
*/

/* STORE */
Template.accordion.onCreated( function( ){

  // Do stuff when actions happen
  Dispatcher.register(function(payload) {
    switch (payload.actionType) {
      case ACCORDION_TOGGLE:
        STORES[STORE].accordionToggle(payload.data);
        break;
    }
  });

  let states = [
    {name: 'Intro', template: 'introContent', active: true},
    {name: 'Demo', template: 'demoContent', active: false},
    {name: 'Action', template: 'actionContent', active: false},
    {name: 'Dispatcher', template: 'dispatcherContent', active: false},
    {name: 'Store', template: 'storeContent', active: false},
    {name: 'View', template: 'viewContent', active: false},
    {name: 'Other', template: 'otherContent', active: false},
  ];

  AppState.set(STORE,states);

  // The Store's functions

  STORES[STORE] = {
    accordionToggle : function(item){

      let states = AppState.get(STORE);

      _.each(states, function(state){
        state.active = state.active ? !state.active : state.name === item.name;
      });

      AppState.set(STORE,states);

    }.bind(this),
    getState : function (){
      console.log(AppState.get(STORE))
        return AppState.get(STORE);
    }.bind(this)
  }

});

Template.accordion.onDestroyed( function( ){

});

/* VIEW */
Template.accordion.helpers({
    state : function () {
      return STORES[STORE].getState()
    }
});

Template.accordion.onRendered( function( ){

});

/* OTHER STUFF */

Template.accordion.utils = {};