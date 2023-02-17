import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File, Folder, Project } from '../entity/Project.entities';


const link = async (server: () => HttpService, file_id: string, business_id: string) => {
  const type_code = `22feda96-544d-45a9-baec-a5573bc0c527`
  const url = `http://1.15.102.208/api/file-upload/link/${file_id}`
  const { data } = await server().axiosRef.put(url, { business_id, type_code })
  return data && data.success && data.result
}

const unlink = async (server: () => HttpService, file_id: string, business_id: string) => {
  const url = `http://1.15.102.208/api/file-upload/unlink/${file_id}`
  const { data } = await server().axiosRef.put(url, { business_id })
  if (!data && data.success) throw Error('unlink error!')
}


@Injectable()
export class FileService {
  constructor(

    private readonly httpService: HttpService,
    @InjectRepository(Project)
    private repositoryProject: Repository<Project>,
    @InjectRepository(File)
    private repositoryFile: Repository<File>,
    @InjectRepository(Folder)
    private repositoryFolder: Repository<Folder>
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async insert(projectId: string, file_content_id: string, file_name: string, folder_id?: string) {
    const project = await this.repositoryProject.findOneBy({ id: projectId })
    if (!project) throw new Error('project id error!')

    const folder = folder_id ? await this.repositoryFolder.findOneBy({ id: projectId }) : null
    if ((!folder) && (folder !== null)) throw new Error('folder id error!')

    const file = new File()

    file.name = file_name
    file.parent = folder
    file.parent_id = folder.id
    file.project = project
    file.project_id = project.id

    const info = await link(() => this.httpService, file_content_id, file.id)

    if (!info) throw new Error('link file error')

    file.content_id = info.id
    file.content_download_id = info.download_id
    file.content_hash = info.hash
    file.content_size = info.size

    await this.repositoryFile.insert(file)

    return file
  }

  async updateContent(id: string, file_content_id: string) {
    const file = await this.repositoryFile.findOneBy({ id })
    if (!file) throw Error('file id error!')
    unlink(() => this.httpService, file.content_id, file.id)
    const info = await link(() => this.httpService, file_content_id, file.id)

    file.content_id = info.id
    file.content_download_id = info.download_id
    file.content_hash = info.hash
    file.content_size = info.size
    file.content_update_time = new Date()

    await this.repositoryFile.update({ id: file.id }, file)

    return file

  }

  async updateInfo(id: string, { name, remark }: { name?: string, remark?: string }) {

    const file = await this.repositoryFile.findOneBy({ id })
    if (!file) throw Error('file id error!')

    file.name = (typeof name === 'string') ? name : file.name
    file.remark = (typeof remark === 'string') ? remark : file.remark

    await this.repositoryFile.update({ id: file.id }, file)
    return file
  }

  async shareFile(id: string) {
    const file = await this.repositoryFile.findOneBy({ id })
    if (!file) throw Error('file id error!')
    file.is_share = true
    await this.repositoryFile.update({ id: file.id }, file)
    return file
  }

  async cancelShareFile(id: string) {
    const file = await this.repositoryFile.findOneBy({ id })
    if (!file) throw Error('file id error!')
    file.is_share = false
    await this.repositoryFile.update({ id: file.id }, file)
    return file
  }

  async delete(id: string) {
    const file = await this.repositoryFile.findOneBy({ id })
    if (!file) throw Error('file id error!')
    unlink(() => this.httpService, file.content_id, file.id)
    await this.repositoryFile.delete({ id: file.id })
  }

}
