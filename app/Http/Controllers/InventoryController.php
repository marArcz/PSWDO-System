<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryTagFrom;
use App\Models\Report;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InventoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $data['inventories'] = Inventory::all();

        return Inertia::render("Inventories/Inventories", $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['fromTags'] = InventoryTagFrom::all();
        $data['batchNumbers'] =  DB::table('inventories')
                                    ->select('batch_no')
                                    ->groupBy('batch_no')
                                    ->get();
        $data['units'] = Unit::all();
        return Inertia::render("Inventories/Create",$data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $inventory = new Inventory($request->all());
        $inventory->save();

        if (InventoryTagFrom::where('tag', $request->from)->count() == 0) {
            InventoryTagFrom::create([
                'tag' => $request->from,
            ]);
        }

        return redirect(route('pswdo.inventories.index'))->with('success', 'Successfully added an item to inventory!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Inventory $inventory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inventory $inventory)
    {
        $data['fromTags'] = InventoryTagFrom::all();
        $data['inventory'] = $inventory;
        $data['units'] = Unit::all();
        return Inertia::render("Inventories/Edit", $data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inventory $inventory)
    {
        $inventory->update($request->all());
        $inventory->save();
        return redirect(route('pswdo.inventories.index'))->with('success', 'Successfully updated item!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inventory $inventory)
    {
        //

        $inventory->delete();
        return redirect(route('pswdo.inventories.index'))->with('success', 'Successfully deleted item!');
    }
}
