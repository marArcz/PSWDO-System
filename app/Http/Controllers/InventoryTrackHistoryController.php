<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\InventoryTrackHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryTrackHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['trackHistories'] = InventoryTrackHistory::orderBy('id','desc')->get();
        return Inertia::render('InventoryTrackHistory/TrackHistories', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inventory = Inventory::find($request->id);

        $inventoryTrackHistory = InventoryTrackHistory::create([
            'name' => $inventory->name,
            'unit_cost' => $inventory->unit_cost,
            'batch_no' => $inventory->batch_no,
            'expiration' => $inventory->expiration,
            'from' => $inventory->from,
            'unit_id' => $inventory->unit_id,
            'sub_unit_quantity' => $inventory->sub_unit_quantity,
            'quantity' => $request->quantity,
            'purpose' => $request->purpose,
        ]);

        if($inventoryTrackHistory){
            $new_quantity = $inventory->quantity - $inventoryTrackHistory->quantity;
            $inventory->quantity = $new_quantity;
            $inventory->save();
        }

        return $request->expectsJson() ? response()->json(['success'=>true]): redirect()->route('pswdo.track_histories.index')->with('success','Successfully released stocks!');
    }
    /**
     * Display the specified resource.
     */
    public function show(InventoryTrackHistory $inventoryTrackHistory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InventoryTrackHistory $inventoryTrackHistory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, InventoryTrackHistory $inventoryTrackHistory)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InventoryTrackHistory $inventory_history)
    {
        //
        $inventory_history->delete();
        return redirect()->route('pswdo.inventory_histories.index')->with('success','Successfully deleted!');
    }
}
