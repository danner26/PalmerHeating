// Collection definition
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

import { UserSchema } from '../users/users.js';

// define collection
const Tickets = new Mongo.Collection('inventory');

// define schema
const AppointmentSchmea = new SimpleSchema({
  meet: Boolean,
  desiredTime: Date,
});
const TechnicianSchema = new SimpleSchema({
  tech_ref: UserSchema,
});
const Schema = new SimpleSchema({
  _id: SimpleSchema.Integer,
  appointment: AppointmentSchmea,
  technician: TechnicianSchema,
});

// attach schema
Tickets.attachSchema(Schema);

export default Tickets;
