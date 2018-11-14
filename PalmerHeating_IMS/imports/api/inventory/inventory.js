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
}
