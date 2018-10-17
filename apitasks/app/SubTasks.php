<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SubTasks extends Model
{
	/**
	 * Tabla sub_tasks
	 * @var string
	 */
    protected $table = 'sub_tasks';

    /**
     * Releción de la tabla sub_tasks y tasks donde sub_tasks.task_id sea igual a tasks.id.
     * @return Devuelve todo lo relacionado 
     */
    public function tasks() {
        return $this->belongsTo('App\Task', 'task_id');
    }

    /**
     * Releción de la tabla sub_tasks y responsible donde sub_tasks.responsable_id sea igual a responsible.id.
     * @return Devuelve todo lo relacionado 
     */
    public function responsible() {
        return $this->belongsTo('App\Responsable', 'responsable_id');
    }
}
