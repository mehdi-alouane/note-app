import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.noteService.findOne(+id);
  }

  @Post()
  create(@Body() note: Note): Promise<Note> {
    return this.noteService.create(note);
  }
}