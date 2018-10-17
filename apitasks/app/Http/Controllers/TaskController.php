<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Task;
use App\SubTasks;

class TaskController extends Controller
{
    /**
     * Listado de tareas
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $task = Task::all()->load('responsible');
        return response()->json(array(
            'task' => $task,
            'status' => 'success'
        ), 200);
    }

    /**
     * Guarda una tarea
     *
     * @param  Request $request Contiene los datos de la tarea a registrar 
     * @return response Contiene el array con la tarea o si obtuvo un error
     */
    public function store(Request $request)
    {
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken) {
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);

            $validate = \Validator::make($params_array, [
                'name' => 'required',
                'responsable_id' => 'required',
                'star_date' => 'required',
                'end_date' => 'required',
                'advance' => 'required',
                'category' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json($validate->errors(), 400);
            }

            $task = new Task();
            $task->name = $params->name;
            $task->responsable_id = $params->responsable_id;
            $task->star_date = $params->star_date;
            $task->end_date = $params->end_date;
            $task->advance = $params->advance;
            $task->category = $params->category;
            $task->save();

            $data = array(
                'task' => $task,
                'status' => 'success',
                'code' => 200
            );

        } else {
            $data = array(
                'message' => 'Tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Muestra una tarea
     *
     * @param  int  $id Id de la tarea
     * @return response Contiene el array con la tarea o si obtuvo un error
     */
    public function show($id)
    {
        $task = Task::find($id);
        if (is_object($task)) {
            $task = Task::find($id)->load('responsible');
            return response()->json(array(
                'task' => $task,
                'status' => 'success',
            ), 200);
        } else {
            return response()->json(array(
                'message' => 'La tarea no existe',
                'status' => 'error'
            ), 200);
        }
    }

    /**
     * Consulta por rango de fechas
     *
     * @param  Request $request Contiene los datos de las fechas a consultar
     * @return response Contiene el array con las tareas o si obtuvo un error
     */
    public function searchDate(Request $request)
    {
        $hash = $request->header('Authorization', null);
        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken) {
            $json = $request->input('json', null);
            $params = json_decode($json);

            $task = Task::where([['star_date', '>=', $params->star_date],['end_date','<=', $params->end_date]])->get();
            if (is_object($task)) {
                return response()->json(array(
                    'tasks' => $task,
                    'status' => 'success',
                ), 200);
            } else {
                return response()->json(array(
                    'message' => 'La fecha no existe',
                    'status' => 'error'
                ), 200);
            }
        } else {
            $data = array(
                'message' => 'Fechas incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Actualiza una tarea.
     *
     * @param  Request  $request Contiene los datos de la tarea para actualizar.
     * @param  int  $id Id de la tarea
     * @return response Contiene el array con la tarea o si obtuvo un error
     */
    public function update(Request $request, $id)
    {
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken) {
            $json = $request->input('json', null);
            $params = json_decode($json);
            $params_array = json_decode($json, true);

            $validate = \Validator::make($params_array, [
                'name' => 'required',
                'responsable_id' => 'required',
                'star_date' => 'required',
                'end_date' => 'required',
                'advance' => 'required',
                'category' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json($validate->errors(), 400);
            }

            unset($params_array['id']);
            unset($params_array['created_at']);
            unset($params_array['responsible']);
            $task = Task::where('id', $id)->update($params_array);

            $data = array(
                'task' => $params,
                'status' => 'success',
                'code' => 200
            );

        }else {
            $data = array(
                'message' => 'Tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Elimina una tarea.
     *
     * @param  Request $request Contiene los datos de la tarea a eliminar 
     * @param  int  $id de la tarea
     * @return response Contiene el array con la tarea o si obtuvo un error
     */
    public function destroy(Request $request, $id)
    {
        $subTask = SubTasks::where('task_id', $id)->get();

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken && count($subTask) == 0) {
            $task = Task::find($id);

            $task->delete();

            $data = array(
                'task' => $task,
                'status' => 'success',
                'code' => 200
            );
        } else {
            $data = array(
                'message' => 'Tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }
}
