// Collection definition
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// define collection
const Inventory = new Mongo.Collection('inventory');

const Schema = new SimpleSchema({
  _id: SimpleSchema.Integer,
  name: String,
  description: String,
  summerLimit: SimpleSchema.Integer,
  winterLimit: SimpleSchema.Integer,
  Price: Number,
});

// attach schema
Inventory.attachSchema(Schema);

export default Inventory;
