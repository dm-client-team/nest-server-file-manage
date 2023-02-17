import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppDataSource } from './app.datasource';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { ProjectModule } from './project/project.module';
import { FileModule } from './file/file.module';
import { Project, File, Folder } from './entity/Project.entities';

@Global()
@Module({
  imports: [
    AppDataSource,
    TypeOrmModule.forFeature([Project, File, Folder]),
    ProjectModule, FileModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(dataSource: DataSource) { }
}
