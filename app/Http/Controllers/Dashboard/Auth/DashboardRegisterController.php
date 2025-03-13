<?php

namespace App\Http\Controllers\Dashboard\Auth; // Namespace correcto

use App\Http\Controllers\Controller;
use App\Models\DashboardUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardRegisterController extends Controller
{
    // Mostrar el formulario de registro del dashboard
    public function showRegistrationForm()
    {
        return Inertia::render('Dashboard/Auth/DashboardRegister'); // Renderiza la vista de registro del dashboard
    }

    // Procesar el registro del dashboard
    public function register(Request $request)
    {
        // Validar los datos del formulario
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:dashboard_users',
            'firstName' => 'required|string|max:255', // Campo obligatorio
            'lastName' => 'required|string|max:255',  // Campo obligatorio
            'dni' => 'required|string|size:8|unique:dashboard_users',
            'sexo' => 'required|string|in:Masculino,Femenino,Prefiero no decirlo',
            'email' => 'required|string|email|max:255|unique:dashboard_users',
            'phone' => 'required|string|size:9|unique:dashboard_users',
            'address' => 'nullable|string|max:255',
            'password' => 'required|string|min:8|confirmed',
            'terms' => 'required|accepted',
        ]);

        // Si la validación falla, devuelve errores con Inertia
        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator) // Pasa los errores a la vista
                ->withInput(); // Mantiene los datos del formulario
        }

        // Crear el usuario del dashboard
        $dashboardUser = DashboardUser::create([
            'username' => $request->username,
            'first_name' => $request->firstName, // Usa first_name
            'last_name' => $request->lastName,   // Usa last_name
            'dni' => $request->dni,
            'sexo' => $request->sexo,
            'email' => $request->email,
            'phone' => $request->phone,
            'address' => $request->address,
            'password' => Hash::make($request->password),
            'terms' => $request->terms,
            'role' => 'admin', // Rol por defecto: 'admin'
        ]);

        // Iniciar sesión automáticamente después del registro
        Auth::guard('dashboard')->login($dashboardUser);

        // Redirigir al dashboard con un mensaje de éxito
        return redirect('/dashboard')->with('success', '¡Registro exitoso!');
    }
}