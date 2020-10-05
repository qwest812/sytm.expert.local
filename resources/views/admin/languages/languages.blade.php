@extends('admin.layout')
@section('content')
    <style>
        table {
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 10px 15px;
        }
    </style>
    <h1>Languages</h1>

    @if($errors->any())
        @switch($errors->first())
            @case ('delete')
            <div>
                <h5 style="color: red">
                    Невозможно удалить, данный язык использует одна из статей
                </h5>
            </div>
            @break
        @endswitch
    @endif
    <div class="container">
        {!! Form::open(array('route' => 'save-languages', 'method' => 'post')) !!}
        @if($errors->any())
            @switch($errors->first())
                @case ('ok')
                <div>
                    <h5 style="color: green">
                        Язык добавлен
                    </h5>
                </div>
                @break
                @case ('fail')
                <div>
                    <h5 style="color: red">
                        Такой язык уже существует
                    </h5>
                </div>
                @break

                @case ('dell-ok')
                <div>
                    <h5 style="color: green">
                        Язык Удален
                    </h5>
                </div>
                @break
                @case ('dell-fail')
                <div>
                    <h5 style="color: red">
                        Удалить невозможно
                    </h5>
                </div>
                @break
            @endswitch
        @endif
        {!! Form::text('languages-name') !!}
        {!! Form::submit('Добавить') !!}
        {!! Form::close() !!}


        <table>
            @if(!empty($languages))
                <tr>
                    <th>Язык</th>
                    <th>Действие</th>
                </tr>
            @endif

            @foreach($languages as $language)
                <tr>

                    <td>
                        <span>{{$language['language_name']}}</span>
                    </td>
                    <td>
                        {!! Form::open(array('route' => 'delete-languages', 'method' => 'post')) !!}
                        @csrf
                        {!! Form::text('language_name',$language['id'] ,["hidden",]) !!}
                        {!! Form::submit('Удалить') !!}
                        {!! Form::close() !!}
                    </td>
                </tr>
            @endforeach
        </table>
    </div>

@endsection