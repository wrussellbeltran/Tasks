<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth {

    public $key;

    /**
     * Constructor, asigna a la variable $key la clave para usarse con el token.
     * @return void
     */
    public function __construct() {
        $this->key = 'clave-api-tasks';
    }

    /**
     * Consulta que el usuario que ingreso se encuentre en la base de datos.
     * @param string $username Nombre del usuario
     * @param bool|null $getToken Tipo bool que permite devolver el token
     * @return Devuelve los datos del usuario o el token
     */
    public function signup($username, $getToken = null) {
        $user = User::where(
            array(
                'username' => $username,
            ))->first();

        $signup = false;
        if(is_object($user)) {
            $signup = true;
        }

        if($signup) {
            $token = array(
                'sub' => $user->id,
                'username' => $user->username,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));


            if (!is_null($getToken)) {                
                return $jwt;
            }else {
                return $decoded;
            }

        }else {
            return array('status' => 'error', 'message' => 'Login ha fallado !!');
        }
    }

    /**
     * Permite checar si el token que se manda por la petición es correcto.
     * @param string $jwt Token
     * @return bool Devuelve si el token agregado es correcto o incorrecto
     */
    public function checkToken($jwt) {
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));
        }catch(\UnexpectedValueException $e) {
            $auth = false;
        }catch(\DomainException $e) {
            $auth = false;
        }

        if(isset($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        }else {
            $auth = false;
        }

        return $auth;
    }
}
