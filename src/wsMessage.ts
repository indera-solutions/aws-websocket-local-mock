export enum EventType {
	CONNECT = 'CONNECT',
	MESSAGE = 'MESSAGE',
	DISCONNECT = 'DISCONNECT'
}

export class WsMessage{
	eventType : EventType;
	connectionId: string;
	body: string;
}