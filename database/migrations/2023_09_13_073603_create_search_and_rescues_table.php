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
        Schema::create('search_and_rescues', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('location');
            $table->integer('missing_children');
            $table->integer('missing_adults');
            $table->string('response_status');
            $table->foreignId('request_details_id','id')->constrained('request_details','id')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('search_and_rescues');
    }
};
