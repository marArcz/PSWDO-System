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
        Schema::create('inventory_track_histories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $table->integer('unit_cost');
            $table->integer('quantity');
            $table->integer('batch_no')->default(1);
            $table->date('expiration')->nullable();
            $table->string('from');
            $table->foreignId('unit_id')->constrained("units")->cascadeOnDelete();
            $table->integer('sub_unit_quantity');
            $table->string('purpose')->nullable();
            $table->string('for')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory_track_histories');
    }
};
