import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NoteGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinNote')
  handleJoinNote(@MessageBody() noteId: number, @ConnectedSocket() client: Socket) {
    console.log('noteId', noteId)
    client.join(`note_${noteId}`);
  }

  @SubscribeMessage('leaveNote')
  handleLeaveNote(@MessageBody() noteId: number, @ConnectedSocket() client: Socket) {
    client.leave(`note_${noteId}`);
  }

  @SubscribeMessage('updateNote')
  handleUpdateNote(@MessageBody() data: { noteId: number, content: string }) {
    this.server.to(`note_${data.noteId}`).emit('noteUpdated', data);
  }
}