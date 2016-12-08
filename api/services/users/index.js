import mongoose, { Schema, model } from 'mongoose';
import mongooseService from 'feathers-mongoose';
import hooks from './hooks';
export default function userService() {
  const app = this;

  const UsersSchema = new Schema({
    email: String,
    password: String,
    
  });

  const Users = mongoose.model('Users', UsersSchema);


  // Initialize our service with any options it requires
  app.use('/users', mongooseService({
    Model: Users,
    paginate: {
      default: 5,
      max: 25
    }
  }));

  app.service('users')
    .before(hooks.before)
    .after(hooks.after);
}
