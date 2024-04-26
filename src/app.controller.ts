import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FindCountSmileysDto, FindOddNumberDto, ManipulateDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('manipulate')
  postManipulate(@Body() body: ManipulateDto): string[] {
    return this.appService.postManipulate(body);
  }

  @Post('find-odd-number')
  postFindOddNumer(@Body() body: FindOddNumberDto): string {
    return this.appService.postFindOddNumber(body);
  }

  @Post('find-count-smileys')
  postFindCountSmileys(@Body() body: FindCountSmileysDto): number {
    return this.appService.postFindCountSmileys(body);
  }
}
