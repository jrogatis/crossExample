import mongoose, { Schema } from 'mongoose';
import mongooseService from 'feathers-mongoose';
import hooks from './hooks';

export default function messagesService() {
  const app = this;

  const MessagesSchema = new Schema({
    text: String,
    sentBy: String,
    createdAt: Date,
  });

  const Messages = mongoose.model('Messages', MessagesSchema);

  app.use('/messages', mongooseService({
    Model: Messages,
    paginate: {
      default: 25,
      max: 100
    }
  }));

  app.service('messages')
    .before(hooks.before)
    .after(hooks.after);
}
