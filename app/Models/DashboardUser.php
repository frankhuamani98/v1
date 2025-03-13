<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class DashboardUser extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'dni',
        'sexo',
        'email',
        'phone',
        'address',
        'password',
        'terms',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'terms' => 'boolean', // Asegura que 'terms' sea tratado como booleano
        'email_verified_at' => 'datetime', // Asegura que 'email_verified_at' sea tratado como fecha
    ];
}