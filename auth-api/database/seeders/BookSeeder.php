<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Book::insert([
            ['title'=>'Angle and Demons', 'author'=>'Dan Brown'],
            ['title'=>'De Vinci Codes', 'author'=>'Dan Brown'],
        ]);
    }
}
