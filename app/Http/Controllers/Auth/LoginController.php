<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Mostrar el formulario de inicio de sesión.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Manejar el intento de inicio de sesión.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function login(Request $request)
    {
        // Validar los datos del formulario
        $credentials = $request->validate([
            'identifier' => 'required|string', // DNI, email o username
            'password' => 'required|string',
        ]);

        // Intentar autenticar al usuario
        if (Auth::attempt($this->getCredentials($credentials))) {
            $request->session()->regenerate(); // Regenerar la sesión

            // Redirigir al dashboard o página principal
            return redirect()->intended('/')->with('success', 'Inicio de sesión exitoso!');
        }

        // Si la autenticación falla, devolver errores
        return back()->withErrors([
            'identifier' => 'Las credenciales proporcionadas no coinciden con nuestros registros.',
        ]);
    }

    /**
     * Obtener las credenciales correctas para el intento de autenticación.
     *
     * @param  array  $credentials
     * @return array
     */
    protected function getCredentials(array $credentials)
    {
        $identifier = $credentials['identifier'];

        // Determinar si el identificador es un email, DNI o username
        if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
            return ['email' => $identifier, 'password' => $credentials['password']];
        } elseif (is_numeric($identifier)) {
            return ['dni' => $identifier, 'password' => $credentials['password']];
        } else {
            return ['username' => $identifier, 'password' => $credentials['password']];
        }
    }

    /**
     * Cerrar la sesión del usuario.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::logout(); // Cerrar sesión
        $request->session()->invalidate(); // Invalidar la sesión
        $request->session()->regenerateToken(); // Regenerar el token de sesión

        // Redirigir a la página principal con un mensaje de éxito
        return redirect('/')->with('success', 'Sesión cerrada correctamente.');
    }
}