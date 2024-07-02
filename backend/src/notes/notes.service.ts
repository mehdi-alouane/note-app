import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/models/note.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  findAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  findOne(id: number): Promise<Note> {
    return this.noteRepository.findOne({ where: { id } });
  }

  create(note: Note): Promise<Note> {
    return this.noteRepository.save(note);
  }

  async update(id: number, updateNoteDto: Partial<Note>): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { id } });
    Object.assign(note, updateNoteDto);
    return this.noteRepository.save(note);
  }

  async remove(id: number): Promise<void> {
    const note = await this.noteRepository.findOne({ where: { id } });
    if (!note) {
      throw new NotFoundException(`Note with ID "${id}" not found`);
    }
    await this.noteRepository.remove(note);
  }
}