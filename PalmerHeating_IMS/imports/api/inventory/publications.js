// Publications send to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import InventoryItem from './inventory_items.js';

if (Meteor.isServer) {
  Meteor.publish('inventory', function() {
    return InventoryItem.find();
  });

  /* Meteor.publish('counters.user', function() {
    if (!this.userId) {
      return this.ready();
    }
    return InventoryItem.find({ _id: this.userId });
  }); */
}
