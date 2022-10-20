<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Book::insert([
        //     ['title'=>'Angle and Demons', 'author'=>'Dan Brown'],
        //     ['title'=>'De Vinci Codes', 'author'=>'Dan Brown'],
        // ]);
        
        $content =  json_decode(Storage::get( '/public/books.json'), true);
        Book::insert($content);
    }
}
