<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    /**
     * Permite registrar un nuevo usuario.
     * @param Request $request Contiene los datos del usuario a registrar
     * @return response Contiene el array con el usuario registrado o si obtuvo un error
     */
    public function register(Request $request) {
        $json = $request->input('json', null);
        $params = json_decode($json);

        $username = (!is_null($json) && isset($params->username)) ? $params->username : null;

        if(!is_null($username)) {

            $user = new User();
            $user->username = $username;

            $isset_user = User::where('username', '=', $username)->first();

            if (is_null($isset_user)) {
                $user->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario registrado correctamente!!'
                );
            }else {
                $data = array(
                    'status' => 'exists',
                    'code' => 200,
                    'message' => 'Usuario registrado correctamente!!'
                );
            }
        }else {
            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no creado'
            );
        }

        return response()->json($data, 200);
    }

    /**
     * Permite acceso al usuario que ingreso.
     * @param Request $request Contiene los datos del usuario a ingresar 
     * @return response Contiene el array con el usuario que ingreso o si obtuvo un error
     */
    public function login(Request $request) {
        $jwtAuth = new JwtAuth();

        $json = $request->input('json', null);
        $params = json_decode($json);

        $username = (!is_null($json) && isset($params->username)) ? $params->username : null;
        $getToken = (!is_null($json) && isset($params->gettoken)) ? $params->gettoken : null;

        if(!is_null($username) && ($getToken == null || $getToken == 'false'))
        {
            $signup = $jwtAuth->signup($username);
        }elseif ($getToken != null){
            $signup = $jwtAuth->signup($username, $getToken);
        }else{
            $signup = array(
                'status' => 'error',
                'message' => 'Envia tus datos por post'
            );
        }
        
        return response()->json($signup, 200);
    }
}
