// src/models/note.js
import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

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
      enum: TAGS,
      default: 'Todo',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Додаємо індекс на рівні схеми, як того вимагає тест
notesSchema.index({ tag: 1 });

export const Note = model('Note', notesSchema);
