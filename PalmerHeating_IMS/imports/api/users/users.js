/**
 * Deny write access on users collection from client
 */

import { Meteor } from 'meteor/meteor';


// Collection definition
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// define collection
const Users = new Mongo.Collection('useraccounts');

// define schema
const ResumeSchema = new SimpleSchema({

});
const ServicesSchema = new SimpleSchema({
  password: String,
  resume: ResumeSchema,
});
const EmailSchema = new SimpleSchema({
  address: String,
  verified: Boolean,
});
const RolesSchema = new SimpleSchema({
  __global_roles__: Array,
  '__global_roles__.$': String,
});
const LastLoginSchema = new SimpleSchema({
  date: Date,
  ipAddr: String,
  userAgent: String,
});
const StatusSchema = new SimpleSchema({
  lastLogin: LastLoginSchema,
  online: Boolean,
});
export const UserSchema = new SimpleSchema({
    _id : SimpleSchema.Integer,
    createdAt : Date,
    services: ServicesSchema,
    emails: EmailSchema,
    roles: RolesSchema,
    status: StatusSchema,
});

// attach schema
Users.attachSchema(UserSchema);

// This fixes default writable profile field:
// https://guide.meteor.com/accounts.html#dont-use-profile
Meteor.users.deny({
  update() {
    return true;
  },
});

export default Users;
