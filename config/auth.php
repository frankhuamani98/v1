<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Defaults
    |--------------------------------------------------------------------------
    |
    | Esta opción define el guard de autenticación predeterminado y el broker
    | de restablecimiento de contraseñas para tu aplicación. Puedes cambiar
    | estos valores según sea necesario.
    |
    */

    'defaults' => [
        'guard' => env('AUTH_GUARD', 'web'),
        'passwords' => env('AUTH_PASSWORD_BROKER', 'users'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Aquí se definen los guards de autenticación. Cada guard tiene un 
    | proveedor de usuarios asociado para determinar cómo recuperar usuarios.
    |
    | Soportado: "session"
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'dashboard' => [
            'driver' => 'session',
            'provider' => 'dashboard_users',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | Cada guard tiene un proveedor que determina cómo obtener los usuarios
    | de la base de datos o cualquier otro sistema de almacenamiento.
    |
    | Soportado: "database", "eloquent"
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'dashboard_users' => [
            'driver' => 'eloquent',
            'model' => App\Models\DashboardUser::class,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Reset de Contraseñas
    |--------------------------------------------------------------------------
    |
    | Aquí se configuran las opciones del restablecimiento de contraseña, 
    | incluyendo la tabla de tokens y el tiempo de expiración del token.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],

        'dashboard_users' => [
            'provider' => 'dashboard_users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Tiempo de Expiración de Confirmación de Contraseña
    |--------------------------------------------------------------------------
    |
    | Define el tiempo (en segundos) antes de que una confirmación de contraseña 
    | expire y se solicite nuevamente la contraseña.
    |
    */

    'password_timeout' => env('AUTH_PASSWORD_TIMEOUT', 10800),

];
