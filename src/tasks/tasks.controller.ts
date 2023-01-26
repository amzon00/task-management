import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto)
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body('title') title: string,
    @Body('description', TaskStatusValidationPipe) description: string
  ): Task {
    return this.taskService.createTask(title, description);
  }
}

