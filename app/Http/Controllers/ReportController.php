<?php

namespace App\Http\Controllers;

use App\Imports\ReportsImport;
use App\Models\Calamity;
use App\Models\Municipality;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data['reports'] = Report::with(['municipality'])->orderBy('updated_at','desc')->get();
        return Inertia::render('Reports/Reports',$data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data['municipalities'] = Municipality::all();
        $data['typhoons'] = Calamity::all();
        return Inertia::render('Reports/Create',$data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $report = new Report($request->all());
        $report->save();

        return redirect(route('pswdo.reports.index'))->with('success','Successfully added report');
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        //
        $data['report'] = Report::with(['municipality'])->find($report->id);

        return Inertia::render('Reports/Details',$data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Report $report)
    {
        //
        $data['municipalities'] = Municipality::all();
        $data['typhoons'] = Calamity::all();
        $data['report'] = $report;

        return Inertia::render('Reports/Edit',$data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Report $report)
    {
        //
        $report->update($request->all());

        return redirect(route('pswdo.reports.index'))->with('success','Successfully Updated!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        //

        $report->delete();
        return redirect(route('pswdo.reports.index'))->with('success','Successfully deleted report!');

    }

    // importing data from excel
    public function import(Request $request)
    {
        $file = $request->file('excel_file');

        Excel::import(new ReportsImport, $file->store('excel_reports'));

        return redirect(route('pswdo.reports.index'))->with('success','Successfully imported report!');
    }
}
