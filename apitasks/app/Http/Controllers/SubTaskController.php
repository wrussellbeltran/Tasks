<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\SubTasks;
use App\Task;

class SubTaskController extends Controller
{
    /**
     * Listado de sub tareas
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subTask = SubTasks::all()->load('responsible')->load('tasks');
        return response()->json(array(
            'subTask' => $subTask,
            'status' => 'success'
        ), 200);
    }

    /**
     * Guarda una tarea
     *
     * @param  Request $request Contiene los datos de la sub tarea a registrar 
     * @return response Contiene el array con la sub tarea o si obtuvo un error
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

            $task = Task::where([['end_date', '>=', $params->expiration_date],['id','=', $params->task_id]])->get();

            if (count($task) > 0) {
                $validate = \Validator::make($params_array, [
                    'name' => 'required',
                    'task_id' => 'required',
                    'responsable_id' => 'required',
                    'expiration_date' => 'required'
                ]);

                if ($validate->fails()) {
                    return response()->json($validate->errors(), 400);
                }

                $subTask = new SubTasks();
                $subTask->name = $params->name;
                $subTask->task_id = $params->task_id;
                $subTask->responsable_id = $params->responsable_id;
                $subTask->expiration_date = $params->expiration_date;
                $subTask->save();

                $data = array(
                    'subTask' => $subTask,
                    'status' => 'success',
                    'code' => 200
                );
            } else {
                $data = array(
                    'message' => 'La fecha vencimiento no puede ser mayor a la fecha fin de la tarea',
                    'status' => 'error',
                    'code' => 400
                );
            }

        } else {
            $data = array(
                'message' => 'Sub tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Muestra una Sub tarea
     *
     * @param  int  $id Id de la sub tarea
     * @return response Contiene el array con la sub tarea o si obtuvo un error
     */
    public function show($id)
    {
        $subTask = SubTasks::find($id);
        if (is_object($subTask)) {
            $subTask = SubTasks::find($id)->load('responsible')->load('tasks');
            return response()->json(array(
                'subTask' => $subTask,
                'status' => 'success',
            ), 200);
        } else {
            return response()->json(array(
                'message' => 'La sub tarea no existe',
                'status' => 'error'
            ), 200);
        }
    }

    /**
     * Actualiza una sub tarea.
     *
     * @param  Request  $request Contiene los datos de la sub tarea para actualizar.
     * @param  int  $id Id de la tarea
     * @return response Contiene el array con la sub tarea o si obtuvo un error
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
                'task_id' => 'required',
                'responsable_id' => 'required',
                'expiration_date' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json($validate->errors(), 400);
            }

            unset($params_array['id']);
            unset($params_array['created_at']);
            unset($params_array['responsible']);
            unset($params_array['tasks']);
            $subTask = SubTasks::where('id', $id)->update($params_array);

            $data = array(
                'subTask' => $params,
                'status' => 'success',
                'code' => 200
            );

        }else {
            $data = array(
                'message' => 'Sub tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Elimina una sub tarea.
     *
     * @param  Request $request Contiene los datos de la sub tarea a eliminar 
     * @param  int  $id de la tarea
     * @return response Contiene el array con la sub tarea o si obtuvo un error
     */
    public function destroy(Request $request, $id)
    {
        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken) {
            $subTask = SubTasks::find($id);

            $subTask->delete();

            $data = array(
                'subTask' => $subTask,
                'status' => 'success',
                'code' => 200
            );
        } else {
            $data = array(
                'message' => 'Sub tarea incorrecta',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }
}
