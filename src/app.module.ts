import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebSocket } from './socket';

@Module({
  imports: [],
  controllers: [AppController,WebSocket],
  providers: [AppService, WebSocket],
})
export class AppModule {}
