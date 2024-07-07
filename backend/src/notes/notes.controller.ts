import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete, UnauthorizedException, Req, Request } from '@nestjs/common';
import { Note } from 'src/models/note.entity';
import { NotesService } from './notes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


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
  constructor(
    private readonly noteService: NotesService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  findAll(@Req() request: Request): Promise<Note[]> {
    return this.noteService.findAll(request['sub']);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const user = req['user'];
    if (!user) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.findOne(user.id, +id);
  }

  @Post()
  async create(@Body() createNoteDto: Note, @Req() req: Request): Promise<Note> {
    const user = req['user']['sub'];
    if (!user) {
      throw new UnauthorizedException('User not authenticated or invalid user data');
    }
    return this.noteService.create(createNoteDto, user);
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

  @Post(':id/share')
  async generateShareableUrl(@Request() req, @Param('id') id: number) {
    const shareableUrl = await this.noteService.generateShareableUrl(id, req.user);
    const baseUrl = this.configService.get<string>('BASE_URL');
    return { shareableUrl: `${baseUrl}/api/notes/shared/${shareableUrl}` };
  }

  @Get('shared/:shareableUrl')
  async getSharedNote(@Param('shareableUrl') shareableUrl: string) {
    return this.noteService.getNoteByShareableUrl(shareableUrl);
  }
}