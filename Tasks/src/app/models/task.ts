/**
 * Modelo Tarea
 */
export class Task {
  constructor(
    public id: number,
    public name: string,
    public responsable_id: number,
    public star_date: string,
    public end_date: string,
    public advance: string,
    public category: string
  ) {}
}
