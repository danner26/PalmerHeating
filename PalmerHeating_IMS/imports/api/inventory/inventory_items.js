// Collection definition
import { Mongo } from 'meteor/mongo';
import Meteor from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// define collection
const Inventory = new Mongo.Collection('inventory');

const InventorySchema = new SimpleSchema({
  _id: String,
  itemNumber: SimpleSchema.Integer,
  name: String,
  description: String,
  summerLimit: SimpleSchema.Integer,
  winterLimit: SimpleSchema.Integer,
  Price: Number,
  inStock: SimpleSchema.Integer,
});

// attach schema
Inventory.attachSchema(InventorySchema);

if (Inventory.find().count() === 0) {
  Inventory.insert({
    _id: new Mongo.Collection.ObjectID()._str,
    itemNumber: 1,
    name: 'Test Item 1',
    description: 'Test Description 1',
    summerLimit: 6,
    winterLimit: 12,
    Price: 13.22,
    inStock: 10,
  });
}

export default Inventory;
