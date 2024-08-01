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
        Schema::create('request_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('report_on');
            $table->string('origin');
            $table->string('what');
            $table->string('when');
            $table->string('where');
            $table->string('why');
            $table->string('who');
            $table->string('how');
            $table->boolean('rescue_assistance');
            $table->boolean('evacuation');
            $table->foreignId('request_id')->constrained('assistance_requests','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_details');
    }
};
