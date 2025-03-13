<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dashboard_users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('first_name'); // Campo obligatorio
            $table->string('last_name');  // Campo obligatorio
            $table->string('dni', 8)->unique();
            $table->string('sexo');
            $table->string('email')->unique();
            $table->string('phone', 9)->unique();
            $table->string('address')->nullable();
            $table->string('password');
            $table->boolean('terms')->default(true);
            $table->enum('role', ['admin', 'user'])->default('admin');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        }); // Aquí faltaba el punto y coma
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dashboard_users');
    }
};
