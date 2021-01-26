import { OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { EventType, WsMessage } from './wsMessage';
import superagent = require('superagent');


const GATEWAY_HTTP_URL = `http://localhost:5000/websocket/`;

@Controller('connections')
@WebSocketGateway()
export class WebSocket implements OnGatewayInit {
	static readonly clients: Map<string, any> = new Map<string, any>();
	@WebSocketServer() server;
	private logger: Logger = new Logger('VideoCallWebSocket');

	constructor() {
	}

	afterInit(server) {
		this.logger.log('Init');
		server.on('connection', async function connection(ws) {
			const id = Math.random() + '';
			WebSocket.clients.set(id, ws);
			ws.send(JSON.stringify(new WsMessage(EventType.MESSAGE, id, "id")));
			await superagent.post(GATEWAY_HTTP_URL).send({
				eventType: EventType.CONNECT,
				connectionId: id,
				body: 'Hello',
			});
			console.log(`Connected`);
			//  CAll sto notification
			ws.on('message', async function incoming(message) {
				console.log('received: %s', message);
				await superagent.post(GATEWAY_HTTP_URL).send({
					eventType: EventType.MESSAGE,
					connectionId: id,
					body: message,
				});
			});

			ws.on('close', async function disconnect() {
				await superagent.post(GATEWAY_HTTP_URL).send({
					eventType: EventType.DISCONNECT,
					connectionId: id,
					body: 'Goodbye',
				});
			});
		});
	}

	@Get('/:id')
	getHello(@Param('id')id, data): string {
		WebSocket.clients.get(id).send('PEOS');
		return 'Hello World! ' + id + ' Clients: ' + WebSocket.clients.size;
	}

	@Post('/')
	infoRequest(@Body() msg: WsMessage) {
		WebSocket.clients.get(msg.connectionId).send(JSON.stringify(msg));
	}

}
