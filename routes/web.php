<?php

use App\Http\Controllers\AuthController;
use App\Http\Middleware\CorsMiddleware;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RechargeController;
use App\Http\Controllers\FinoController;
use App\Http\Controllers\DTHController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\AirtelController;
use App\Http\Controllers\RechargeStatusEnquiryController;
use App\Http\Controllers\DTHStatusEnquiryController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\BillPaymentController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\LICEnquiryController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware([CorsMiddleware::class])->group(function () {
    Route::get('/test', function () {
        return response()->json(['message' => 'CORS is working!']);
    });
});  

Route::get('/', function(){
    return Inertia::render('Welcome');
})->name('welcome');

// Login Routes (Blocked for authenticated users)
Route::middleware(['guest_only'])->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'login']);
});

// User Page (Only for authenticated users)
Route::middleware(['is_user'])->group(function () {
    Route::get('/dashboard', [UserController::class, 'dashboard'])->middleware('is_user')->name('user.dashboard');   
     Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});


    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit'); // Edit profile
    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show'); // Show profile
  
    Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update'); // Update profile
    Route::get('/profile/settings', [ProfileController::class, 'settings'])->name('profile.settings'); 
    // Change Password Routes
    Route::get('/change-password', [ProfileController::class, 'editPassword'])->name('profile.change-password'); // Edit password page
    Route::post('/change-password', [ProfileController::class, 'updatePassword'])->name('profile.update-password'); // Update password



Route::prefix('/upiservices')->group(function () {
    Route::get('/upiservices/transactions', [UserController::class, 'recharge'])->name('recharge');
});
Route::prefix('/recharge')->group(function () {
    Route::get('/mobilerecharge', [UserController::class, 'mobilerecharge']);
    Route::get('/dthrecharge', [UserController::class, 'dthrecharge']);
});
Route::prefix('/upi')->group(function () {
    Route::get('/dashboard', [UserController::class, 'upidashboard']);
    Route::get('/transactions', [UserController::class, 'upitransaction']);
    Route::get('/dispute', [UserController::class, 'upidispute']);
    Route::get('/profit', [UserController::class, 'upiprofit']);
});
Route::prefix('/api')->group(function () {
    Route::get('/bus', [UserController::class, 'busapi']);
    Route::get('/lic', [UserController::class, 'licapi']);
  
});
Route::prefix('/cms')->group(function () {
    Route::get('/airtel', [AirtelController::class, 'generate'])->name('airtel');
    Route::post('/airtel', [AirtelController::class, 'process'])->name('airtel.post');
    Route::get('/fino', [FinoController::class, 'generate'])->name('fino');
    Route::post('/fino', [FinoController::class, 'process'])->name('fino.post'); // Process API call
  
});




Route::get('/commission', [UserController::class, 'commissionslab']);


Route::prefix('/wallet')->group(function () {
    Route::get('/fundrequest', [UserController::class, 'myfundrequest']);
  
});

Route::prefix('/reports')->group(function () {
    Route::get('/wallet-transaction', [UserController::class, 'reportwallettransaction']);
    Route::get('/recharge-transactions', [UserController::class, 'reportrechargetransaction']);
    Route::get('/dispute', [UserController::class, 'reportdispute']);
    Route::get('/commision', [UserController::class, 'reportcommission']);
    Route::get('/login', [UserController::class, 'reportlogin']);
});



///////Operartor route


Route::post('/save-prepaid-operators',[OperatorController::class,'storePrepaid']);
Route::post('/save-dth-operators',[OperatorController::class,'storeDTH']);

////csrf-token

// routes/web.php
Route::get('/get-csrf-token', function () {
    return response()->json(['csrf_token' => csrf_token()]);
});


///recharge route

Route::post('/save-recharge', [RechargeController::class, 'store'])->name('recharge.store');


//recharge status

Route::post('/save-recharge-status', [RechargeStatusEnquiryController::class, 'store']);
Route::get('/recharge-statuses', [RechargeStatusEnquiryController::class, 'index']);


///DTH route

Route::post('/save-dth', [DTHController::class, 'store'])->name('dth.store');


//DTH status

Route::post('/save-dth-status', [DTHStatusEnquiryController::class, 'store']);
// Route::get('/dth-statuses', [DTHStatusEnquiryController::class, 'index']);


//Onboarding Merchant


Route::get('/onboarding-merchant', [OnboardingController::class, 'showForm']);

//lic 



Route::post('/save-bill-payment', [BillPaymentController::class, 'store']);


// save lic bill fetch 

Route::post('/save-bill', [BillController::class, 'store']);

Route::post('/save-lic-status', [LICEnquiryController::class, 'store']);