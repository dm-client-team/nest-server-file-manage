import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder, Project, File } from 'src/entity/Project.entities';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, File, Folder])
    ],
    controllers: [FolderController],
    providers: [FolderService],
})
export class ProjectModule {

}
