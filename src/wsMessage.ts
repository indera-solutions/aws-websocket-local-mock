export enum EventType {
	CONNECT = 'CONNECT',
	MESSAGE = 'MESSAGE',
	DISCONNECT = 'DISCONNECT'
}

export class WsMessage{
	eventType : EventType;
	connectionId: string;
	body: string;


	constructor(eventType: EventType, connectionId: string, body: string) {
		this.eventType = eventType;
		this.connectionId = connectionId;
		this.body = body;
	}
}