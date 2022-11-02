<?php

namespace App\Exceptions;

use App\Http\Components\ApiTrait;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Throwable;

class Handler extends ExceptionHandler
{
    use ApiTrait;

    /**
     * A list of the exception types that are not reported.
     *
     * @var array<int, class-string<Throwable>>
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $exception)
    {
        if ( ($exception instanceof ModelNotFoundException || $exception instanceof MethodNotAllowedHttpException || $exception instanceof RouteNotFoundException ) && $request->wantsJson()) {
            // dd( $request->header('Content-Type'));
            // return isset($acceptable[0]) && Str::contains(strtolower($acceptable[0]), ['/json', '+json']);
            $this->data = [
                'not_found'=>'Your items was not found!'
            ];
            // dd($exception->message);
            return response()->json(
                ...$this->apiResponseBuilder(
                    $status_code = Response::HTTP_NOT_FOUND,
                    $message = 'Your Api Resource was not found!'
                )
            );
        }

        return parent::render($request, $exception);
    }
}
