import { Template } from 'meteor/templating';
import { Equipos } from './API/equipos.js';
import { Super } from './API/equipos.js';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session'

 

import './body.html';

  Price = new Mongo.Collection('price');

 

 
 
Template.body.onCreated(function bodyOnCreated() {

  this.state = new ReactiveDict();
  Session.set('email_user',null)
  

  Meteor.subscribe('equipos');
  Meteor.subscribe('super');
  Meteor.subscribe('user');
  Meteor.subscribe('getPrice');
});



Template.body.helpers({

	 prices() {
      return Price.find();

    },
	

  equipos() {
  		
			if (Super.find({user:Meteor.user().emails[0].address}).count() == 1 ){
					if(Session.get('email_user')==null){
						return Equipos.find();
					}else{
						return Equipos.find({'owner':Session.get('email_user')});
					}

					
				
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
  		
  }

});

Template.body.events({
'click .js-user':function(event,temp){
	//var a = event.target.innerHTML;
	//alert(a);
	//console.log(event.target.getAttribute("data-valor"));
	//console.log(temp.state.get( 'email_user' ));
	var a = event.target.getAttribute("data-valor");
	if (a == null){
		Session.set('email_user',null);
	}
	console.log(event.target.getAttribute("data-valor"))
	


}

});


Template.user.events({
'click .js-user':function(event,temp){
	//var a = event.target.innerHTML;
	//alert(a);
	//console.log(event.target.getAttribute("data-valor"));
	//console.log(temp.state.get( 'email_user' ));
	var a = event.target.getAttribute("data-valor");
	if (a == "null"){
		Session.set('email_user',null);
	}else{
		Session.set('email_user',a);
	
	}
	console.log(event.target.getAttribute("data-valor"))
	


}

});









