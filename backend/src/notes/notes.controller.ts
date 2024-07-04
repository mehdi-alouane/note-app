import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete, UnauthorizedException, Req } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class UpdateNoteDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  content?: string;
}

@ApiTags('notes')
@Controller('notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  findAll(): Promise<Note[]> {
    return this.noteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const user = req['user'];
    if (!user || !user.id) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.findOne(user.id, +id);
  }

  @Post()
  async create(@Body() createNoteDto: Note, @Req() req: Request): Promise<Note> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.create(user.id, createNoteDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req: Request): Promise<Note> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.update(user.id, +id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request): Promise<void> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.remove(user.id, +id);
  }
}