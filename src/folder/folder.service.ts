import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File, Folder, Project } from '../entity/Project.entities';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private repositoryFolder: Repository<Folder>,
    @InjectRepository(File)
    private repositoryFile: Repository<File>,
    // @InjectRepository(Project)
    // private repositoryFileBusiness: Repository<Project>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async getFolderList(project_id: string, pid?: string) {
    const parent_id = pid ? pid : null
    return await this.repositoryFolder.findBy({ parent_id, project_id })
  }

  async getFileList(project_id: string, pid?: string) {
    const parent_id = pid ? pid : null
    return await this.repositoryFile.findBy({ parent_id, project_id })
  }

  async getFolderInfo(id:string){
    const folder = await this.repositoryFolder.findOneBy({id})
    if(!folder) throw Error('folder id error!')
    return folder
  }



}
