<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id(); // ID unique pour chaque article
            $table->string('title'); // Titre de l'article
            $table->string('author'); // Auteur de l'article
            $table->date('publication_date'); // Date de publication
            $table->string('category'); // Catégorie de l'article (ex: sport, politique, etc.)
            $table->text('content'); // Contenu de l'article
            $table->string('source'); // Source de l'article (ex: Le Parisien, L'Équipe, etc.)
            $table->timestamps(); // Colonnes created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('articles');
    }
};
