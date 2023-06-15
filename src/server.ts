import express from 'express';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

// Carregando variáveis de ambiente
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource: DataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: Number(process.env.POSTGRES_PORT),
	username: process.env.POSTGRES_USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: true,
	logging: false,
	entities: ['src/entity/**/*.ts'],
	migrations: ['src/migration/**/*.ts'],
	subscribers: ['src/subscriber/**/*.ts'],
});

const app = express();
app.use(express.json());

AppDataSource.initialize()
	.then(() => {
		const port = Number(process.env.SERVER_PORT);
		app.listen(port, () => console.log(`Server is running on port ${port}.`));
	})
	.catch((error) => console.log(error));
