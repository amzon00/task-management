import { Controller, Get, Post, Body, Query, UsePipes, ValidationPipe, Delete, Param, Patch } from '@nestjs/common';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilters(filterDto)
    } else {
      return this.taskService.getAllTasks();
    }
  }

  @Get("/:id")
	getTaskById(@Param("id") id: string): Task {
		return this.taskService.getTaskById(id);
	}

  @Post()
  @UsePipes(ValidationPipe)
  createTask(
    @Body('title') title: string,
    @Body('description', TaskStatusValidationPipe) description: string
  ): Task {
    return this.taskService.createTask(title, description);
  }

  @Delete("/:id")
	deleteTask(@Param("id") id: string): void {
		return this.taskService.deleteTask(id);
	}

  @Patch("/:id/status")
	updateTask(@Param("id") id: string, @Body("status") status: TaskStatus): Task {
		return this.taskService.updateTask(id, status);
	}
}

