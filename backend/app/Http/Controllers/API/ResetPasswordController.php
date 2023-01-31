<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Requests\ResetRequestValidator;
use App\Models\ResetCodePassword;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Hash;

class ResetPasswordController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * return json response global
     *
     * @param  mixed $data
     * @param  mixed $messages
     * @param  mixed $code
     * @return void
     */
    public function jsonResponse($data = null, $messages = null, $code = 200)
    {
        $array = [
            'data'  => $data,
            'message'  => $messages,
            'status'  => in_array($code, $this->codeHTTP()) ? true : false,
        ];
        return response()->json($array, $code);
    }

    public function codeHTTP(): array
    {
        return ['200', '201', '202'];
    }

    /**
     * Change the password (Setp 3)
     *
     * @param  mixed $request
     * @return void
     */
    public function resetPassword(ResetRequestValidator $request)
    {
        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        if ($passwordReset->isExpire()) {
            return $this->jsonResponse(null, 'code is expire', 422);
        }

        $user = User::firstWhere('email', $passwordReset->email);

        // $user->password = Hash::make($request->only('password'));

        // $user->save();

        $user->password =  Hash::make($request->get('password'));
        $user->save();

        $passwordReset->delete();

        return $this->jsonResponse(null, 'password has been successfully reset', 200);
    }
}
