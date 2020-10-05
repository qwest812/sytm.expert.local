<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Language::create(["language_name"=>"ru"]);
        \App\Language::create(["language_name"=>"ua"]);
    }
}
