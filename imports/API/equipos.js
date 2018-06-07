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

}

