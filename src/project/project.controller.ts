import { Body, Controller, Get, Param, Post, Put, Query, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ResData } from '../tool/ResData';
import { ApiBody, ApiQuery } from '@nestjs/swagger';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get()
  getHello(): string {
    return this.projectService.getHello();
  }


  @Get('/query/:id')
  async getInfo(
    @Param('id') id: string
  ) {
    return ResData.success(await this.projectService.getInfo(id))
  }

  @Get('/query')
  @ApiQuery({
    schema: {
      type: 'object',
      properties: {
        location: { type: 'string' }
      }
    }
  })
  async getInfoByLoc(
    @Query('location') location: string
  ) {
    return ResData.success(await this.projectService.getInfoByLoc(location))
  }


  @Get('/list/')
  async getList() {
    return ResData.success(await this.projectService.list())
  }

  @Post('/create')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        location: { type: 'string' }
      }
    }
  })
  async create(
    @Body() payload: { name: string, location: string }
  ) {
    const { name, location } = payload
    return this.projectService.create(location, name)
  }


  @Put('/update/:id')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        remark: { type: 'string' }
      }
    }
  })
  async update(
    @Param('id') id: string,
    @Body() payload: { name: string, remark: string }
  ) {
    const { name, remark } = payload
    return await this.projectService.update(id, { remark, name })
  }
}
