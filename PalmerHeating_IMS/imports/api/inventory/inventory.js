// Publications send to the client

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import Inventory from './inventory_items.js';

if (Meteor.isServer) {
  Meteor.publish('inventory.all', function() {
    if (Roles.userIsInRole(this.userId, 'secretary')) {
      return Inventory.find();
    }
    return this.ready();
  });

  Meteor.publish('counters.user', function() {
    if (!this.userId) {
      return this.ready();
    }
    return Inventory.find({ _id: this.userId });
  });
}
