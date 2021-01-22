import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from "@nestjs/websockets";
import { Controller, Get, Logger } from '@nestjs/common';
import {Server, Socket} from 'socket.io';

interface Connection {
	socket: Socket
	id?: string
}

// @Controller('connections')
@WebSocketGateway()
export class WebSocket
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;
	readonly clients: Map<string, Connection> = new Map<string, Connection>();
	private logger: Logger = new Logger('VideoCallWebSocket');

	constructor() {
	}

	afterInit(server: Server) {
		this.logger.log('Init');
	}

	handleConnection(client: Socket, ...args: any[]) {
		this.logger.log(`Client connected: ${client.id}`);
		this.clients.set(client.id, {socket: client});
		//TODO call endpoint
	}

	handleDisconnect(client: Socket) {
		this.clients.delete(client.id);
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	@SubscribeMessage('test')
	default(@ConnectedSocket() client: Socket, @MessageBody() data: { action: string, data: any }) {
		console.log(data)
	}
	//
	// @Get()
	// getHello(): string {
	// 	return 'Hello World! Clients: ' + this.clients.size;
	// }
}
