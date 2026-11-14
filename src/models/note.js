import { Schema, model } from 'mongoose';

const notesTagsList = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
];

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      enum: notesTagsList,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const NoteCollection = model('notes', notesSchema);
