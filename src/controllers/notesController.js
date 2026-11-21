import { Note } from '../models/note.js';
import createHttpError from 'http-errors';

// 1. Отримати всі нотатки (з використанням чейнінгу .where())
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const parsedPage = parseInt(page, 10);
    const parsedPerPage = parseInt(perPage, 10);
    const skip = (parsedPage - 1) * parsedPerPage;

    const notesQuery = Note.find();

    if (tag) {
      notesQuery.where('tag').equals(tag);
    }

    if (search) {
      notesQuery.where({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      });
    }

    const [totalNotes, notes] = await Promise.all([
      notesQuery.clone().countDocuments(),
      notesQuery.skip(skip).limit(parsedPerPage),
    ]);

    const totalPages = Math.ceil(totalNotes / parsedPerPage);

    res.status(200).json({
      page: parsedPage,
      perPage: parsedPerPage,
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// 2. Отримати нотатку за ID
export const getNoteById = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);

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
    const newNote = await Note.create(req.body);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// 4. Оновити нотатку за ID
export const updateNote = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

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
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      throw createHttpError(404, 'Note not found');
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    next(error);
  }
};
