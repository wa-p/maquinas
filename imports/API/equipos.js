import { Mongo } from 'meteor/mongo';

export const Equipos = new Mongo.Collection('equipos');
export const Super = new Mongo.Collection('superUser');



if (Meteor.isServer) {

  // This code only runs on the server

  Meteor.publish('equipos', function equiposPublication() {	
    return Equipos.find();
  });

 Meteor.publish('super', function superPublication() {
    return Super.find();
  });

 Meteor.publish('user', function userPublication() {
    return Meteor.users.find({'emails.address':{$nin:['antonio@ucv.ve']}});
  });


 Meteor.publish('getPrice', function() {
    var self = this;
    var init = true;
    


		Meteor.setInterval(function() {
		    var res = HTTP.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD', {});
		    var item = JSON.parse(res.content);
		    if (init) {
		      self.added('price', 1, {USD: item.BTC.USD,NAME:'BTC'});
		      self.added('price', 2, {USD: item.LTC.USD,NAME:'LTC'});
		      self.added('price', 3, {USD: item.ETH.USD,NAME:'ETH'});
		    } else {
		      self.changed('price', 1, {USD: item.BTC.USD,NAME:'BTC'});
		      self.changed('price', 2, {USD: item.LTC.USD,NAME:'LTC'});
		      self.changed('price', 3, {USD: item.ETH.USD,NAME:'ETH'});
		    }
		    self.ready();
		    init = false;
		  }, 10000);

});

}