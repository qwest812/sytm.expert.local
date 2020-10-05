@extends('admin.layout')
@section('content')
<h1>Изменить статью</h1>
<div class="error">
    @if($errors->any())
        @switch($errors->first())
            @case ('ok') <div>
                <h5 style="color: green">
                    Язык добавлен
                </h5>
            </div>
            @break
            @case ('language') <div>
                <h5 style="color: red">
                    Ошибка языка
                </h5>
            </div>
            @break

            @case ('article') <div>
                <h5 style="color: red">
                    Ошибка добавления статьи
                </h5>
            </div>
            @break
            @case ('url') <div>
                <h5 style="color: red">
                    Ошибка URL
                </h5>
            </div>
            @break
        @endswitch
    @endif
</div>

    {!! Form::model($page,array('route' => 'save-news', 'method' => 'put', 'enctype'=>'multipart/form-data')) !!}
    <div class="container">
        {{ Form::hidden('id') }}
        @include('admin.expert.components.component-add-page')
        {!! Form::submit('Save') !!}
        {!! Form::close() !!}
    </div>
@endsection