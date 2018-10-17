/**
 * Modelo Sub Tareas
 */
export class SubTask {
  constructor(
    public id: number,
    public name: string,
    public task_id: number,
    public responsable_id: number,
    public expiration_date: string
  ) {}
}
