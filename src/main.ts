import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import WildcardsIoAdapter from "./adapter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	// app.useWebSocketAdapter(new WildcardsIoAdapter(app));
	await app.listen(6000);
}

bootstrap();
