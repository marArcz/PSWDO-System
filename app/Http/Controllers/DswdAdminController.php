<?php

namespace App\Http\Controllers;

use App\Models\AssistanceRequest;
use App\Models\Barangay;
use App\Models\Calamity;
use App\Models\Distribution;
use App\Models\DswdAdmin;
use App\Models\Inventory;
use App\Models\Municipality;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;

class DswdAdminController extends Controller
{
    /*
        Auth routes
    */
    public function login(Request $request)
    {
        if (DswdAdmin::count() == 0) {
            return redirect(route('pswdo.register'));
        }
        return Inertia::render('Dswd/Login');
    }
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        $user = DswdAdmin::where('email', $request->email)->first();
        if ($user) {
            if (!Auth::guard('dswd')->attempt($request->only('email', 'password'), true)) {
                throw ValidationException::withMessages([
                    'password' => 'You entered an incorrect password',
                ]);
            } else {
                return redirect(route('pswdo.dashboard'));
            }
        } else {
            throw ValidationException::withMessages([
                'email' => 'No matching account is found',
            ]);
        }
    }
    public function register(Request $request)
    {
        return Inertia::render('Dswd/Register');
    }

    public function create(Request $request)
    {
        $request->validate([
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:dswd_admins',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = DswdAdmin::create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->addRole('super_admin');

        event(new Registered($user));
        Auth::guard('dswd')->login($user);

        return redirect(route('pswdo.dashboard'));
    }

    public function dashboard()
    {
        $data['barangays'] = Barangay::all();
        // $data['inventories'] = DB::table('inventories')->limit(6)->get();
        $data['inventories'] = Inventory::limit(6)->get();
        $municipalities = Municipality::with(['barangays','reports'])->get();
        $total_households = 0;
        $total_centers = 0;
        $barangays = 0;

        foreach ($municipalities as $key => $municipality) {
            $barangays += $municipality->barangays()->count();
            foreach ($municipality->barangays as $key => $barangay) {
                $total_households += $barangay->households;
                $total_centers += $barangay->evac_centers;
            }
        }

        $data['province'] = [
            'municipalities' => $municipalities,
            'total_households' => $total_households,
            'total_centers' => $total_centers,
            'total_barangays' => $barangays,
        ];

        $data['typhoons'] = Calamity::all();

        return Inertia::render('Dswd/Dashboard',$data);
    }
    public function logout()
    {
        Auth::guard('dswd')->logout();
        return redirect(route('home'));
    }

}
