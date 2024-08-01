<?php

namespace Database\Seeders;

use App\Models\Municipality;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MunicipalityAndBarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $municipalities = [
            'Virac' => [
                'Gogon Centro',
                'Calatagan',
                'Francia',
                'Sta. Cruz',
                'San Jose',
                'San Juan',
                'San Vicente',
                'San Pablo',
                'Cavinitan',
                'Constantino',
                'Moonwalk',
                'Palnab',
            ],
            'Bagamanoc'=>[],
            'San Andres' => [],
            'Bato' => [],
            'San Miguel' => [],
            'Baras' => [],
            'Gigmoto' => [],
            'Viga' => [],
            'Caramoran' => [],
            'Panganiban' => []
        ];

        foreach ($municipalities as $municipality => $barangays) {
            $municipalityRow = Municipality::create([
                'name' => $municipality
            ]);

            foreach ($barangays as $key => $barangay) {
                $municipalityRow->barangays()->create([
                    'name' => $barangay
                ]);
            }
        }
    }
}
