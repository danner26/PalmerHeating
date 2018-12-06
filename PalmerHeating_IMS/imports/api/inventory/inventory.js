import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import InventoryItem from './inventory_items.js';

if (Meteor.isServer) {
  Meteor.publish('inventory.all', function() {
    if (Roles.userIsInRole(this.userId, 'secretary')) {
      return InventoryItem.find();
    }
    return this.ready();
  });
}
