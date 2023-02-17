import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FolderService } from './folder.service';
import { ResData } from '../tool/ResData';
import { ApiBody } from '@nestjs/swagger';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) { }

  @Get()
  getHello(): string {
    return this.folderService.getHello();
  }


  @Get('/info/:id')
  async getInfo(
    @Param('id') id: string
  ) {
    return ResData.success(await this.folderService.getInfo(id))
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
    return this.folderService.create(location, name)
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
    return await this.folderService.update(id, { remark, name })
  }
}
