<?php

namespace App\Http\Controllers;

use App\Http\Components\ApiTrait;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookController extends Controller
{
    use ApiTrait;
    public function listBooks(Request $request){
        
        // if(!$user){
        //     return response()->json(
        //         ...$this->apiResponseBuilder(
        //             $status_code = Response::HTTP_FORBIDDEN,
        //             $message     = 'User was not found or active !!!',
        //         )
        //     );
        // }
        
        $this->apiSuccess();
        $this->data = [
            'books' => Book::all()//new UserResource($user)
        ];

        return response()->json(
            ...$this->apiResponseBuilder(
                $status_code = Response::HTTP_OK,
                $message     = 'Book List populated Successfully',
            )
        );
    }
}
