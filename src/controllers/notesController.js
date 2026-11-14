import { NoteCollection } from '../models/note.js';
import createHttpError from 'http-errors';

// 1. Отримати всі нотатки
export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await NoteCollection.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// 2. Отримати нотатку за ID
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await NoteCollection.findById(noteId);

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// 3. Створити нову нотатку
export const createNote = async (req, res, next) => {
  try {
    const newNote = await NoteCollection.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// 4. Оновити нотатку за ID
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const updatedNote = await NoteCollection.findByIdAndUpdate(
      noteId,
      req.body,
      { new: true, runValidators: true },
    );

    if (!updatedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// 5. Видалити нотатку за ID
export const deleteNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const deletedNote = await NoteCollection.findByIdAndDelete(noteId);

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
