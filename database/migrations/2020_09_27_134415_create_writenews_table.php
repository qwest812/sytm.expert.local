<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWritenewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('writenews', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->unsignedSmallInteger('lang_id')->nullable();
            $table->foreign('lang_id')->references('id')->on('languages');
            $table->char('title', 150)->nullable();
            $table->unsignedBigInteger('url_id');
            $table->foreign('url_id')->references('id')->on('urls');
            $table->char("main_img",255)->nullable();
            $table->char('type',150); //news or research
            $table->char('h1',150)->nullable();
            $table->text('description')->nullable();
            $table->char('keyword',250)->nullable();
            $table->text('text')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('writenews');
    }
}
