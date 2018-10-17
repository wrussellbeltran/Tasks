<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
	/**
	 * Tabla tasks
	 * @var string
	 */
    protected $table = 'tasks';

    /**
     * Releción de la tabla tasks y responsible donde tasks.responsable_id sea igual a responsible.id.
     * @return Devuelve todo lo relacionado 
     */
    public function responsible() {
        return $this->belongsTo('App\Responsable', 'responsable_id');
    }
}
