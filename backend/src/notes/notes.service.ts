import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/models/note.entity';
import { UpdateNoteDto } from './notes.controller';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(user_id: number, note_id: number): Promise<Note> {
    return this.noteRepository.findOne({
      where: {
        id: note_id,
        user: user_id
      },
      relations: ['user']
    });
  }

  async create(userId: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.noteRepository.create({
      ...updateNoteDto,
      user: userId,
    });
    return this.noteRepository.save(note);
  }


  async update(userId: number, noteId: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.findOne(userId, noteId);
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }
    Object.assign(note, updateNoteDto);
    return this.noteRepository.save(note);
  }

  async remove(userId: number, noteId: number): Promise<void> {
    const note = await this.findOne(userId, noteId);
    if (!note) {
      throw new NotFoundException(`Note with ID "${noteId}" not found`);
    }
    await this.noteRepository.remove(note);
  }
}