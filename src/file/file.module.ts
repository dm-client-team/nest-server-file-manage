import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder, Project, File } from 'src/entity/Project.entities';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { HttpModule } from '@nestjs/axios'

@Module({
    imports: [
        HttpModule,
        TypeOrmModule.forFeature([Project, File, Folder])
    ],
    controllers: [FileController],
    providers: [FileService],
})
export class FileModule {

}
