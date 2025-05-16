import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from 'src/guards/auth-guard';
import { Request } from 'express';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAnswerDto: CreateAnswerDto, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;
    return this.answerService.create({ ...createAnswerDto, ownerId: userId });
  }

  @Get()
  findAll() {
    return this.answerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.update(id, updateAnswerDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;

    return this.answerService.remove(id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/like')
  like(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;

    return this.answerService.like(id, userId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id/dislike')
  dislike(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;

    return this.answerService.dislike(id, userId);
  }
}
