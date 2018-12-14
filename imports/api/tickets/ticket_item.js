// Collection definition
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { UserSchema } from '../users/users.js';

// define collection
const Tickets = new Mongo.Collection('inventory');

// define schema
const AppointmentSchmea = new SimpleSchema({
  meet: Boolean,
  desiredTime: Mongo.Collection.ISODate,
});
const TechnicianSchema = new SimpleSchema({
  tech_ref: UserSchema,
});
const UserOrOrgSchema = new SimpleSchema({
  userID: SimpleSchema.Integer,//The users ID number in the users collection
  organizationID: SimpleSchema.Integer,//The organizations ID in the organizations collection
});
const CommentsSchema = new SimpleSchema({
  userID: SimpleSchema.Integer,//The users ID number in the users collection
  text: String,
  _id: Mongo.Collection.ObjectId,
  dateCreated: Mongo.Collection.ISODate,
});
const Schema = new SimpleSchema({
  _id: Mongo.Collection.ObjectID,
  ticketNum: SimpleSchema.Integer,
  dateCreated: Mongo.Collection.ISODate,
  appointment: AppointmentSchmea,
  technician: TechnicianSchema,
  userOrOrg: UserorOrgSchema,
  description: String,
  comments: CommentsSchema,
});

// attach schema
Tickets.attachSchema(Schema);

export default Tickets;
