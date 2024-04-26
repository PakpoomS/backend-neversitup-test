import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(createTodoDto: CreateTodoDto) {
    const created = await this.prisma.todos.create({
      data: {
        ...createTodoDto,
      },
    });
    return created;
  }

  async findAll() {
    const result = await this.prisma.todos.findMany({});
    return result;
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.todos.findUnique({
        where: {
          id: id,
        },
      });
      return result || {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    try {
      const result = await this.prisma.todos.update({
        where: {
          id: id,
        },
        data: {
          ...updateTodoDto,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException(
        error.meta.cause,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const result = await this.prisma.todos.delete({
        where: {
          id: id,
        },
      });
      return {
        message: `Delete Todo ID:${result.id} Success`,
      };
    } catch (error) {
      throw new HttpException(
        error.meta.cause,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
