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
    <a class="add_motobyke" href="{{route('add-news')}}">
        ADD
    </a>
    <div class="container">
        <h1>Удаленные Новости</h1>
        <div class="error">
            @if(!empty(Session::has('error')))
                {{ Session::get('error') }}
            @endif
        </div>
        @if(!empty($news))
            <table>
                <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>URL</th>
                    <th>Последнее Обновление</th>
                    <th>Действия</th>
                </tr>

                <div class="row">
                    @foreach($news as $new)
                        <tr>
                            <td>{{$new['h1']}}</td>
                            <td>
                                @switch($new["type"])
                                    @case (1) {{"Новость"}}
                                    @break
                                    @case (2) {{"Иследование"}}
                                    @break
                                @endswitch
                            </td>
                            <td><a href="/{{$new['url']}}" style="color:#007bff;" target="_blank">{{$new['url']}}</a></td>
                            <td>{{$new['updated_at']}}</td>
                            <td>

                                <div class="col-md-1">
                                    {!! Form::open(array('route' => 'return-news', 'method' => 'post',)) !!}
                                    @csrf
                                    {!! Form::hidden('id',$new['id'],['class'=>'disp_none']) !!}
                                    {!! Form::hidden('_method','POST',['class'=>'disp_none']) !!}

                                    {!! Form::submit('Return') !!}
                                    {!! Form::close() !!}
                                </div>
                            </td>
                        </tr>
                        {{--<div class="col-md-2">{{$new['h1']}}</div>--}}
                        {{--<div class="col-md-2">{{$new['url']}}</div>--}}
                        {{--<div class="col-md-2">{{$new['updated_at']}}</div>--}}

                        <div class="col-md-2">

                        </div>
                    @endforeach
                </div>
            </table>
        @else
            <div><span>Please </span><a href="{{route('add-news')}}" class="__blue">Add new</a></div>
        @endif
    </div>
@endsection