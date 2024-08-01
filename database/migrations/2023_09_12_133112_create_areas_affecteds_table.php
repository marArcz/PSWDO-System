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
        Schema::create('areas_affecteds', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('area');
            $table->string('source_of_report');
            $table->date('date');
            $table->time('time');
            $table->foreignId('disaster_profile_id')->constrained('disaster_profiles','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('areas_affecteds');
    }
};
