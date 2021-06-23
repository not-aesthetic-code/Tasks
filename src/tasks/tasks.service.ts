import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilterTasks(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    console.log('sadads', filterDto);

    if (status) {
      tasks = tasks.filter(filterbyStatusTask);
    }
    if (search) {
      tasks = tasks.filter(filterbySearchTask);
    }

    return tasks;

    function filterbyStatusTask(task) {
      return task.status === status;
    }

    function filterbySearchTask(task) {
      if (task.title.includes(search) || task.description.includes(search)) {
        return true;
      }

      return false;
    }
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

  getTask(id: string): Task {
    const task = this.tasks.find(findTask);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} is not found`);
    }

    return task;

    function findTask(task) {
      if (task.id === id) return task;
    }
  }

  deleteTask(id: string): void {
    const found = this.getTask(id);

    this.tasks = this.tasks.filter(filterTask);

    function filterTask(task) {
      return task.id !== found.id;
    }
  }

  updateStatus(id: string, status: TaskStatus) {
    const task = this.getTask(id);
    task.status = status;

    return task;
  }
}
