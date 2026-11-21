// src/validations/notesValidation.js
import { Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

// Кастомна валідація MongoDB ObjectId
const objectIdValidator = (value, helper) => {
  if (!isValidObjectId(value)) {
    return helper.message('Invalid id format');
  }
  return value;
};

// 1. Валідація для GET /notes (параметри рядка запиту)
export const getAllNotesSchema = {
  query: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().allow(''),
  }),
};

// 2. Валідація для GET /notes/:noteId та DELETE /notes/:noteId (параметр ID)
export const noteIdSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

// 3. Валідація для POST /notes (тіло запиту)
export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow('').default(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

// 4. Валідація для PATCH /notes/:noteId (параметри + тіло, хоча б одне поле в тілі)
export const updateNoteSchema = {
  params: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  body: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1), // Перевірка, що тіло запиту не порожнє
};
