<?php

namespace App\Http\Controllers\Dashboard\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DashboardLoginController extends Controller
{
    /**
     * Mostrar el formulario de inicio de sesión del dashboard.
     *
     * @return \Inertia\Response
     */
    public function showLoginForm()
    {
        return Inertia::render('Dashboard/Auth/DashboardLogin');
    }

    /**
     * Manejar el intento de inicio de sesión del dashboard.
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

        Log::info('Credenciales recibidas:', $credentials);

        // Obtener las credenciales correctas para el intento de autenticación
        $authCredentials = $this->getCredentials($credentials);

        Log::info('Credenciales procesadas:', $authCredentials);

        // Intentar autenticar al usuario en el guard 'dashboard'
        if (Auth::guard('dashboard')->attempt($authCredentials)) {
            $request->session()->regenerate(); // Regenerar la sesión

            Log::info('Autenticación exitosa para el usuario:', ['identifier' => $credentials['identifier']]);

            // Redirigir al dashboard con un mensaje de éxito
            return redirect()->intended('/dashboard')->with('success', 'Inicio de sesión exitoso!');
        }

        Log::warning('Autenticación fallida para el usuario:', ['identifier' => $credentials['identifier']]);

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
     * Cerrar la sesión del usuario en el guard 'dashboard'.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function logout(Request $request)
    {
        Auth::guard('dashboard')->logout(); // Cerrar sesión en el guard 'dashboard'
        $request->session()->invalidate(); // Invalidar la sesión
        $request->session()->regenerateToken(); // Regenerar el token de sesión

        Log::info('Sesión cerrada correctamente.');

        // Redirigir a la página de login del dashboard con un mensaje de éxito
        return redirect()->route('dashboard.login')->with('success', 'Sesión cerrada correctamente.');
    }
}