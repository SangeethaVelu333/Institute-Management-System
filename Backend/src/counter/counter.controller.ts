import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { CounterService } from './counter.service';

@Controller('counter')
export class CounterController {
  constructor(private counterService: CounterService) {}

  @Post('create')
  async create_counter(@Req() req, @Res() res) {
    const response = await this.counterService.create_counter(req.body);
    return res.status(HttpStatus.OK).json({
      message: 'counter created successfully!',
      counter: response,
    });
  }

  @Get('all')
  async get_all_counter(@Res() res) {
    const response = await this.counterService.get_all_counters();
    return res.status(HttpStatus.OK).json({
      message: 'List of available counters',
      counters: response,
    });
  }

  @Get(':id')
  async get_counter(@Req() req, @Res() res) {
    const response = await this.counterService.get_counter(req.params.id);
    return res.status(HttpStatus.OK).json({
      message: 'Counter found',
      counter: response,
    });
  }

  @Put(':id')
  async update_counter(@Req() req, @Res() res) {
    const response = await this.counterService.update_counter(req);
    return res.status(HttpStatus.OK).json({
      message: 'Counter updated!',
      counter: response,
    });
  }

  @Delete(':id')
  async delete_counter(@Req() req, @Res() res) {
    const response = await this.counterService.delete_counter(req.params.id);
    return res.status(HttpStatus.OK).json({
      message: 'Counter deleted!',
      counter: response,
    });
  }
}
