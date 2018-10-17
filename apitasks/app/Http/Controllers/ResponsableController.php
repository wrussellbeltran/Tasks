<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Responsable;
use App\Task;

class ResponsableController extends Controller
{
    /**
     * Listado de responsables
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $responsable = Responsable::all();
        return response()->json(array(
            'responsable' => $responsable,
            'status' => 'success'
        ), 200);
    }

    /**
     * Guarda un responsable
     *
     * @param  Request $request Contiene los datos del responsable a registrar 
     * @return response Contiene el array con el responsable o si obtuvo un error
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
                'name' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json($validate->errors(), 400);
            }

            $responsable = new Responsable();
            $responsable->name = $params->name;
            $responsable->save();

            $data = array(
                'responsable' => $responsable,
                'status' => 'success',
                'code' => 200
            );

        } else {
            $data = array(
                'message' => 'Reponsable incorrecto',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Muestra un responsable.
     *
     * @param  int  $id Id del responsable
     * @return response Contiene el array con el responsable o si obtuvo un error
     */
    public function show($id)
    {
        $responsable = Responsable::find($id);
        if (is_object($responsable)) {
            $responsable = Responsable::find($id);
            $tasks = Responsable::find($id)->tasks;
            return response()->json(array(
                'responsable' => $responsable,
                'tasks' => $tasks,
                'status' => 'success',
            ), 200);
        } else {
            return response()->json(array(
                'message' => 'El responsable no existe',
                'status' => 'error'
            ), 200);
        }
    }

    /**
     * Actualiza un responsable.
     *
     * @param  Request  $request Contiene los datos del responsable para actualizar. 
     * @param  int  $id Id del responsable
     * @return response Contiene el array con el responsable o si obtuvo un error
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
                'name' => 'required'
            ]);

            if ($validate->fails()) {
                return response()->json($validate->errors(), 400);
            }

            unset($params_array['id']);
            unset($params_array['created_at']);
            $responsable = Responsable::where('id', $id)->update($params_array);

            $data = array(
                'responsable' => $params,
                'status' => 'success',
                'code' => 200
            );

        }else {
            $data = array(
                'message' => 'Responsable incorrecto',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Elimina un responsable.
     *
     * @param  Request $request Contiene los datos del responsable a eliminar 
     * @param  int  $id del responsable
     * @return response Contiene el array con el responsable o si obtuvo un error
     */
    public function destroy(Request $request, $id)
    {
        $task = Task::where('responsable_id', $id)->get();

        $hash = $request->header('Authorization', null);

        $jwtAuth = new JwtAuth();
        $checkToken = $jwtAuth->checkToken($hash);

        if($checkToken && count($task) == 0) {
            $responsable = Responsable::find($id);

            $responsable->delete();

            $data = array(
                'responsable' => $responsable,
                'status' => 'success',
                'code' => 200
            );
        } else {
            $data = array(
                'message' => 'Responsable incorrecto',
                'status' => 'error',
                'code' => 400
            );
        }

        return response()->json($data, 200);
    }
}
