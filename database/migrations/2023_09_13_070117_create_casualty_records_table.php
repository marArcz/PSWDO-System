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
        Schema::create('casualty_records', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('category');// Dead, Injured, Missing
            $table->string('location');
            $table->integer('number');
            $table->string('cause');
            $table->foreignId('initial_effect_id')->constrained('initial_effects','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('casualty_records');
    }
};
