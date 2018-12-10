// Collection definition
import { Mongo } from 'meteor/mongo';
import Meteor from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// define collection
const InventoryItem = new Mongo.Collection('inventory');

const InventorySchema = new SimpleSchema({
  _id: Mongo.Collection.ObjectID,
  name: String,
  description: String,
  summerLimit: SimpleSchema.Integer,
  winterLimit: SimpleSchema.Integer,
  Price: Number,
  inStock: SimpleSchema.Integer,
});

InventoryItem.allow({
  remove(invID) {
    return true;
  },
});

// attach schema
InventoryItem.attachSchema(InventorySchema);

export default InventoryItem;
