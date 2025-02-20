<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('User/dashboard/Dashboard'); 
    }
    public function dthrecharge()
    {
        return Inertia::render('User/recharge/dthrecharge'); 
    }
    public function mobilerecharge()
    {
        return Inertia::render('User/recharge/mobilerecharge'); 
    }
    public function upidashboard()
    {
        return Inertia::render('User/upi/upidashboard'); 
    }

    public function upitransaction()
    {
        return Inertia::render('User/upi/upitransaction'); 
    }
    public function upidispute()
    {
        return Inertia::render('User/upi/upidispute'); 
    }
    public function upiprofit()
    {
        return Inertia::render('User/upi/upiprofit'); 
    }


    public function busapi()
    {
        return Inertia::render('User/api/busapi'); 
    }
    public function licapi()
    {
        return Inertia::render('User/api/licapi'); 
    }
 



    public function commissionslab() {
        return Inertia::render('User/commission/commissionslab');
    }

    public function myfundrequest()
    {
        return Inertia::render('User/wallet/myfundrequest'); 
    }


    public function reportwallettransaction()
    {
        return Inertia::render('User/reports/reportwallettransaction'); 
    }
    public function reportrechargetransaction()
    {
        return Inertia::render('User/reports/reportrechargetransaction'); 
    }
    public function reportdispute()
    {
        return Inertia::render('User/reports/reportdispute'); 
    }
    public function reportcommission()
    {
        return Inertia::render('User/reports/reportcommission'); 
    }
    public function reportlogin()
    {
        return Inertia::render('User/reports/reportlogin'); 
    }

}
 
