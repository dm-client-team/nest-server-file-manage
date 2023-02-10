import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, RelationId } from "typeorm";
import { FileInfo } from "./FileInfo.entities";

@Entity()
export class Project {

    @PrimaryColumn({ length: 50 })
    id: string

    @Column({ length: 50 }) // 项目名
    name: string

    @Column({ length: 200 }) // 备注
    remark: string

    @Column({ type: 'datetime' })
    create_time: Date = new Date()

    @Column({ type: 'datetime' })
    update_time: Date = new Date()

    @Column({ type: 'datetime' })   // 内容更新时间
    content_update_time: Date = new Date()

    // 项目字段
    @Column({ length: 50 })  // 地址
    location: string

    @ManyToOne(() => Folder, (folder) => folder.project)
    folders: Folder[] = []


    @ManyToOne(() => File, (file) => file.project)
    files: File[] = []
}

@Entity()
export class Folder {

    @PrimaryColumn({ length: 50 })
    id: string

    @Column({ length: 50 }) // 文件夹名字
    name: string

    @Column({ length: 200 }) // 备注
    remark: string

    @Column({ type: 'datetime' })
    create_time: Date = new Date()

    @Column({ type: 'datetime' })
    update_time: Date = new Date()

    @Column({ type: 'datetime' })   // 内容更新时间
    content_update_time: Date = new Date()

    // 文件夹字段
    @ManyToOne(() => Project, (project) => project.folders)
    project: Project

    @RelationId((folder: Folder) => folder.project)
    project_id: string


    @ManyToOne(() => Folder, folder => folder.chilren_folders)
    parent: Folder

    @RelationId((folder: Folder) => folder.parent)
    parent_id: string

    @OneToMany(() => Folder, folder => folder.parent)
    chilren_folders: Folder[]

    @OneToMany(() => File, file => file.parent)
    chilren_files: File[]

}

@Entity()
export class File {

    @PrimaryColumn({ length: 50 })
    id: string

    @Column({ length: 50 }) // 文件夹名字
    name: string

    @Column({ length: 200 }) // 备注
    remark: string

    @Column({ type: 'datetime' })
    create_time: Date = new Date()

    @Column({ type: 'datetime' })
    update_time: Date = new Date()

    @Column({ type: 'datetime' })   // 内容更新时间
    content_update_time: Date = new Date()

    // 文件夹字段
    @ManyToOne(() => Project, (project) => project.files)
    project: Project

    @RelationId((file: File) => file.project)
    project_id: string

    @ManyToOne(() => Folder, folder => folder.chilren_folders)
    parent: Folder

    @RelationId((folder: Folder) => folder.parent)
    parent_id: string



    @Column({ length: 50 }) // 备注
    file_content: FileInfo
}
