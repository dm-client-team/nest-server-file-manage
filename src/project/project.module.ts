import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder, Project, File } from 'src/entity/Project.entities';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, File, Folder])
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
})
export class ProjectModule {

}
