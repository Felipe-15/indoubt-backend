import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth-guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { AlreadyHypedQuestionError } from '../exceptions/AlreadyHypedQuestion';
import { NeverHypedQuestionError } from '../exceptions/NeverHypedQuestion';
import { IVectorialService } from './resource/vector/vectorial-service.interface';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
    private readonly vectorialService: IVectorialService,
  ) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createQuestionDto: CreateQuestionDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as { id: string; email: string }).id;

    const createdQuestion = await this.questionService.create({
      ...createQuestionDto,
      ownerId: userId,
    });

    await this.vectorialService.create({
      question: createdQuestion.content,
      linkedId: createdQuestion.id,
    });

    return createdQuestion;
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get('search')
  async search(@Query('q') query: string) {
    const vectorResult = await this.vectorialService.search(query);
    if (!vectorResult) {
      throw new NotFoundException('No results found');
    }
    const questionIds = vectorResult.map((item) => item.linkedId);
    const resultQuestions =
      await this.questionService.findManyByIdsArray(questionIds);
    return resultQuestions;
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
  @Post(':id/hype')
  hype(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;
    try {
      return this.questionService.hype(id, userId);
    } catch (error) {
      if (error instanceof AlreadyHypedQuestionError) {
        throw new ConflictException();
      }
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Post(':id/unhype')
  unhype(@Param('id') questionId: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;
    try {
      return this.questionService.unhype(userId, questionId);
    } catch (error) {
      if (error instanceof NeverHypedQuestionError) {
        throw new BadRequestException();
      }
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') questionId: string, @Req() req: Request) {
    const userId = (req.user as { id: string; email: string }).id;
    return this.questionService.remove(questionId, userId);
  }
}
