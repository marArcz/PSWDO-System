<?php

namespace App\Http\Controllers;

use App\Models\DswdAdmin;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\Rules\Unique;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class StaffController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $staffs = DswdAdmin::whereHasRole("staff")->get();
        return Inertia::render("Staffs/Staffs", [
            "staffs" => $staffs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Staffs/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:dswd_admins,email'],
            'password' => ['confirmed', 'min:8'],
        ]);

        $request->password = Hash::make($request->password);

        $staff = DswdAdmin::create($request->all());
        $staff->addRole('staff');

        return redirect()->route('pswdo.staffs.index')->with('success', 'Sucessfully added a staff!');
    }

    /**
     * Display the specified resource.
     */
    public function show(DswdAdmin $staff)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DswdAdmin $staff)
    {
        //

        return Inertia::render('Staffs/Edit', [
            'staff' => $staff
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DswdAdmin $staff)
    {
        $request->validate([
            'email' => ['required', 'email', 'unique:dswd_admins,email,' . $staff->id],
        ]);
        $has_password = false;

        if ($request->has("password") && !empty($request->password)) {
            if (strlen($request->password) < 8) {
                return throw ValidationException::withMessages([
                    'password' => 'Password must be at least 8 characters!'
                ]);
            }

            $isConfirmed = ($request->password === $request->password_confirmation);

            if (!$isConfirmed) {
                return throw ValidationException::withMessages([
                    'password' => 'Password confirmation does not match'
                ]);
            }

            $request->password = Hash::make($request->password);

            $has_password = true;
        }

        $staff->update([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
        ]);

        if($has_password){
            $staff->password = $request->password;
            $staff->save();
        }

        return redirect()->route('pswdo.staffs.index')->with('success', 'Successfully updated staff!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DswdAdmin $staff)
    {
        //

        $staff->delete();
        return redirect()->back()->with('success','Successfully deleted staff account!');
    }
}
