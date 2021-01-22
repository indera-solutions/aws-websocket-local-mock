import {OnGatewayInit, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Controller, Get, Logger, Param} from '@nestjs/common';


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
		server.on('connection', function connection(ws) {
			const id = Math.random() + '';
			WebSocket.clients.set(id, ws)
			//  CAll sto notification
			ws.on('message', function incoming(message) {
				console.log('received: %s', message);
			});

			ws.send(id);
		});
	}

	@Get('/:id')
	getHello(@Param('id')id, data): string {
		WebSocket.clients.get(id).send('PEOS')
		return 'Hello World! ' + id + ' Clients: ' + WebSocket.clients.size;
	}
}
