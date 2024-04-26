import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FindCountSmileysDto, FindOddNumberDto, PermutationsDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('permutations')
  postManipulate(@Body() body: PermutationsDto): string[] {
    return this.appService.postPermutations(body);
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
