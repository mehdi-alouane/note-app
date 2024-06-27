import { Injectable } from '@nestjs/common';
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
}