<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Requests\CodeCheckRequest;
use App\Models\ResetCodePassword;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;

class CodeCheckController extends Controller
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
     * Check if the code is exist and it is valid
     *
     * @param  mixed $request
     * @return void
     */
    public function checkCode(CodeCheckRequest $request)
    {
        $passwordReset = ResetCodePassword::firstWhere('code', $request->code);

        if ($passwordReset->isExpire()) {
            return $this->jsonResponse(null, 'code is expire', 422);
        }

        return $this->jsonResponse(['code' => $passwordReset->code], 'code is valid', 200);
    }
}
