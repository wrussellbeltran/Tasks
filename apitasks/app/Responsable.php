<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Responsable extends Model
{
    /**
	 * Tabla responsible
	 * @var string
	 */
    protected $table = 'responsible';

    /**
     * Releción de la tabla responsible y tasks donde tasks.responsable_id sea igual a tasks.id.
     * @return Devuelve todo lo relacionado 
     */
    public function tasks() {
        return $this->hasMAny('App\Task');
    }
}
