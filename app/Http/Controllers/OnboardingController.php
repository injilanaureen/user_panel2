<?php

namespace App\Http\Controllers;
use Inertia\Inertia;


use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function showForm(){
        return Inertia::render('User/onboarding/onboarding_doc');
    }
}
