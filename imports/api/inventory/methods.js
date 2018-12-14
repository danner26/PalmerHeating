import { Meteor } from 'meteor/meteor';
import Mongo from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { LoggedInMixin } from 'meteor/tunifight:loggedin-mixin';
import { MethodHooks } from 'meteor/lacosta:method-hooks';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';

import InventoryItem from './inventory_items.js';

/** **************** Helpers **************** */

const mixins = [LoggedInMixin, MethodHooks, CallPromiseMixin];

// not logged in error message
const checkLoggedInError = {
  error: 'notLogged',
  message: 'You need to be logged in to call this method',
  reason: 'You need to login',
};

/** **************** Methods **************** */

// eslint-disable-next-line no-unused-vars, arrow-body-style
const beforeHookExample = (methodArgs, methodOptions) => {
  // console.log('countersIncrease before hook');
  // perform tasks
  return methodArgs;
};
// eslint-disable-next-line no-unused-vars, arrow-body-style
const afterHookExample = (methodArgs, returnValue, methodOptions) => {
  // console.log('countersIncrease: after hook:');
  // perform tasks
  return returnValue;
};

function getNextID() {
  return (
    InventoryItem.find({}, { itemNumber: '$itemNumber' })
      .limit(1)
      .sort({ $natural: -1 }) + 1
  );
}

export const inventoryAdd = new ValidatedMethod({
  name: 'inventory.add',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  checkLoggedInError,
  checkRoles: {
    roles: ['admin', 'secretary'],
    rolesError: {
      error: 'not-allowed',
      message: 'You are not allowed to call this method',
    },
  },
  validate: new SimpleSchema({
    itemNumber: SimpleSchema.Integer,
    name: String,
    description: String,
    summerLimit: SimpleSchema.Integer,
    winterLimit: SimpleSchema.Integer,
    Price: Number,
    inStock: SimpleSchema.Integer,
  }).validator(),
  run() {
    console.log('inventory.add', this);
    if (Meteor.isServer) {
      // secure code - not available on the client
    }
    // call code on client and server (optimistic UI)
    return InventoryItem.insert({ _id: getNextID() });
  },
});

export const inventoryList = new ValidatedMethod({
  name: 'inventory.list',
  mixins,
  beforeHooks: [beforeHookExample],
  afterHooks: [afterHookExample],
  checkLoggedInError,
  checkRoles: {
    roles: ['admin', 'secretary', 'technician'],
    rolesError: {
      error: 'not-allowed',
      message: 'You are not allowed to call this method',
    },
  },
  validate: new SimpleSchema({
    itemNumber: SimpleSchema.Integer,
    name: String,
    description: String,
    summerLimit: SimpleSchema.Integer,
    winterLimit: SimpleSchema.Integer,
    Price: Number,
    inStock: SimpleSchema.Integer,
  }).validator(),
  run() {
    return InventoryItem.find().fetch();
  },
});

export const GetInventory = () => {
  return Mongo.Collection('inventory');
};

Meteor.methods({
  'inventory.remove'(invID) {
    console.log(invID);

    console.log(InventoryItem.remove({ _id: invID }));
  },
  'inventory.edit'(theData) {
    console.log(theData);

    console.log();
  }
});
