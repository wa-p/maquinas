import { Template } from 'meteor/templating';
import { Equipos } from './API/equipos.js';
import { Super } from './API/equipos.js';
import { ReactiveDict } from 'meteor/reactive-dict';

 

import './body.html';

 
Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
  this.state.set('email_user':'pepe@gmail.com');

  Meteor.subscribe('equipos');
  Meteor.subscribe('super');
  Meteor.subscribe('user');
});



Template.body.helpers({
	

  equipos() {
  		
			if (Super.find({user:Meteor.user().emails[0].address}).count() == 1 ){
				return Equipos.find();
			}else{
				return Equipos.find({
					 owner: Meteor.user().emails[0].address	
		   							 });
				}
  },

  users(){
  		if (Meteor.user().emails[0].address=='antonio@ucv.ve'){
  				return Meteor.users.find({'emails.address':{$nin:['antonio@ucv.ve']}});
  		}
  		
  },

  usuario: function () {
      return Template.instance().state.get('email_user');
    }

});

Template.user.created = function () {
    // counter starts at 0
    this.state = new ReactiveDict();
    this.state.set('email_user', 'pepe@gmail.com');
  };


Template.user.events({
'click .js-user':function(event,temp){
	//alert(event.target.innerHTML);
	console.log(temp.state.get( 'email_user' ));

}

});









