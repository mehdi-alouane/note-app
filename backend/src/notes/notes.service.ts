import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from 'src/models/note.entity';
import { UpdateNoteDto } from './notes.controller';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/models/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private noteRepository: Repository<Note>,
  ) {}

  async findAll(user_id: any): Promise<Note[]> {
    const userId = user_id;

    if (!userId) {
      throw new NotFoundException('User not found in the request');
    }

    const notes = await this.noteRepository.find({
      where: {
        user:  {
          id: userId
        }
      },
      relations: ['user'],
    });

    if (!notes || notes.length === 0) {
      throw new NotFoundException('No notes found for the user');
    }

    return notes;
  }

  findOne(user_id: number, note_id: number): Promise<Note> {
    return this.noteRepository.findOne({
      where: {
        id: note_id,
        user: { id: user_id }
      },
      relations: ['user']
    });
  }

  async create(createNoteDto: Partial<Note>, user_id: number): Promise<Note> {
    const note = this.noteRepository.create({
      ...createNoteDto,
      user: { id: user_id }
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


  async generateShareableUrl(id: number, user: User): Promise<string> {
    const note = await this.findOne(user.id, id);
    if (!note.shareableUrl) {
      note.shareableUrl = uuidv4();
      note.isShared = true;
      await this.noteRepository.save(note);
    }
    return note.shareableUrl;
  }

  async getNoteByShareableUrl(shareableUrl: string): Promise<Note> {
    const note = await this.noteRepository.findOne({ where: { shareableUrl } });
    if (!note || !note.isShared) {
      throw new NotFoundException('Shared note not found');
    }
    return note;
  }

}