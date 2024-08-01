<?php

namespace App\Imports;

use App\Models\Calamity;
use App\Models\Report;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithStartRow;

class ReportsImport implements ToCollection, WithStartRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function collection(Collection $rows)
    {
        foreach ($rows as $row) {
            $calamity = Calamity::where('name', $row[1])->first();
            if (!$calamity) {
                Calamity::create([
                    'name' => $row[1]
                ]);
            }

            Report::create([
                'municipality_name' => $row[0],
                'calamity_name' => $row[1],
                'typhoon_level' => $row[2],
                'lce_present' => $row[3],
                'no_of_barangay' => $row[4],
                'no_of_punong_barangay_present' => $row[5],
                'remarks' => $row[6],
                'no_of_families' => $row[7],
                'no_of_barangay_covered' => $row[8],
                'no_of_evacuation' => $row[9],
                'no_of_families_served' => $row[10],
                'no_of_barangay_conducted_evacuation' => $row[11],
                'total_served' => $row[12],
                'total_barangay_served' => $row[13],
                'power_supply_status' => $row[14],
                'water_supply_status' => $row[15],
                'telecommunication_status' => $row[16],
                'roads_and_bridges_status' => $row[17],
            ]);
        }
    }

    public function startRow(): int
    {
        return 2;
    }
}
