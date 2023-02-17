// import { DataSource } from 'typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project, File , Folder } from './entity/Project.entities'

export const AppDataSource = TypeOrmModule.forRoot({
    type: "better-sqlite3",
    database: "./sqlite/main.sqlite",
    synchronize: true,
    logging: true,
    entities: [Project, File , Folder],
    subscribers: [],
    migrations: [],
})