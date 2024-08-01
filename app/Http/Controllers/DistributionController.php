<?php

namespace App\Http\Controllers;

use App\Models\Distribution;
use App\Models\Inventory;
use App\Models\InventoryTrackHistory;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistributionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Report $report)
    {
        $inventories = Inventory::orderBy("batch_no", "asc")->get();

        return Inertia::render("Distribution/Create", [
            "report" => Report::with(['municipality'])->find($report->id),
            'inventories' => $inventories
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Report $report)
    {
        $input = $request->input();

        $items = $input['selectedItems'];

        $distribution = $report->distribution()->create([
            'report_id' => $request->report_id,
            "no_of_families" => $report->no_of_families - $report->no_of_families_served,
            'municipality_name' => $report->municipality_name,
            'typhoon_name' => $report->calamity_name,
        ]);

        // add distribution items
        foreach ($items as $key => $item) {
            $distributionItem = $distribution->distributionItems()->create([
                "name" => $item["inventory"]["name"],
                "unit_id" => $item["inventory"]["unit_id"],
                "sub_unit_quantity" => $item["inventory"]["sub_unit_quantity"],
                "unit_cost" => $item["inventory"]["unit_cost"],
                'quantity' => $item["rate"],
                "inventory_id" => $item['inventory']['id'],
            ]);

            // subtract quantity of inventory
            $inventory = Inventory::find($item["inventory"]['id']);
            if ($inventory) {
                $new_quantity = $inventory->quantity - $item['distribution'];
                $inventory->quantity = $new_quantity;
                $inventory->save();
            }
        }

        $report->status = "Assisted";
        $report->save();

        return redirect()->route('pswdo.distributions.show', $distribution->id)->with('success', 'Successfully recorded assistance distribution!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Distribution $distribution)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Distribution $distribution)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Distribution $distribution)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Distribution $distribution)
    {
        //
    }

    public function calculator()
    {
        $inventories = Inventory::orderBy("batch_no", "asc")->get();

        return Inertia::render("Distribution/Calculator", [
            'inventories' => $inventories
        ]);
    }

    public function declined(Distribution $distribution)
    {
        $distribution->status = "Declined";
        $distribution->archived = true;

        $distribution->save();

        // revert allocated stocks;
        foreach ($distribution->distributionItems as $key => $distributionItem) {
            $inventory = $distributionItem->inventory()->first();
            if ($inventory) {
                $inventory->quantity = $inventory->quantity + $distributionItem->quantity;
                $inventory->save();
            }
        }

        return redirect()->route("pswdo.distributions.archived")->with("success", 'Successfully updated status to ' . $distribution->status);
    }
    public function distributed(Distribution $distribution)
    {
        $distribution->status = "Distributed";
        $distribution->archived = true;

        $distribution->save();
        // revert allocated stocks;
        foreach ($distribution->distributionItems as $key => $distributionItem) {
            $inventory = $distributionItem->inventory()->first();
            $quantity = $distributionItem->quantity;
            if ($inventory) {
                $inventoryTrackHistory = new InventoryTrackHistory([
                    'name' => $inventory->name,
                    'unit_cost' => $inventory->unit_cost,
                    'quantity' => $quantity,
                    'batch_no' => $inventory->batch_no,
                    'expiration' => $inventory->expiration,
                    'from' => $inventory->from,
                    'unit_id' => $inventory->unit_id,
                    'sub_unit_quantity' => $inventory->sub_unit_quantity,
                    'purpose' => $distribution->report()->first()->municipality_name . " - Typhoon Assistance (" . $distribution->report()->first()->calamity_name . ")",
                ]);

                $inventoryTrackHistory->save();
            }
        }
        return redirect()->route("pswdo.distributions.archived")->with("success", 'Successfully updated status to ' . $distribution->status);
    }
    public function archived()
    {
        $distributions = Distribution::with(['report'])->where('archived', true)->get();

        return Inertia::render('Distribution/Archived', [
            'distributions' => $distributions
        ]);
    }
}
