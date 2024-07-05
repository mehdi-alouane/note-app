import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/models/note.entity';
import { AuthModule } from 'src/auth/auth.module';
import { NoteGateway } from './note-gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Note]),
  ],
  providers: [NotesService, NoteGateway],
  controllers: [NotesController]
})
export class NotesModule {}
