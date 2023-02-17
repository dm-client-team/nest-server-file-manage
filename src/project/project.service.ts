import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../entity/Project.entities';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private repositoryProject: Repository<Project>,
    // @InjectRepository(Project)
    // private repositoryFileBusiness: Repository<Project>,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async create(location: string, name: string) {
    const project = new Project()
    Object.assign(project, { location, name })
    await this.repositoryProject.insert(project)
    return project
  }

  async getInfo(id: string) {
    const project = await this.repositoryProject.findOneBy({ id })
    if (!project) throw new Error('error id!')
    return project
  }

  async getInfoByLoc(location:string){
    const project = await this.repositoryProject.findOneBy({ location })
    if (!project) throw new Error('error location!')
    return project
  }

  async list(){
    return await this.repositoryProject.find()
  }

  async update(id: string, data: Partial<Project>) {
    const project = await this.repositoryProject.findOneBy({ id })
    if (!project) throw new Error('error id!')
    Object.assign(project, data)
    project.update_time = new Date()
    await this.repositoryProject.update({ id }, project)
    return project
  }

  async delete() {
    throw Error("can't delete project")
  }
}
