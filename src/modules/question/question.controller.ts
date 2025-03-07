import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth-guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;

    return this.questionService.create({
      ...createQuestionDto,
      ownerId: userId,
    });
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const userId = (req.user as { id: string; email: string }).id;
    return this.questionService.update(id, userId, updateQuestionDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;
    return this.questionService.remove(id, userId);
  }
}
