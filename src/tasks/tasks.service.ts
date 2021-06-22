import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { DeleteTaskDto } from './dto/delete-task-dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTask(getTaskDto: GetTaskDto): Task {
    const { id } = getTaskDto;

    const task = this.tasks.find(findTask);

    return task;

    function findTask(task) {
      if (task.id === id) return task;
    }
  }

  deleteTask(deleteTaskDto: DeleteTaskDto): Task[] {
    const { id } = deleteTaskDto;

    return this.tasks.filter(filterTask);

    function filterTask(task) {
      if (task.id !== id) return task;
    }
  }
}
