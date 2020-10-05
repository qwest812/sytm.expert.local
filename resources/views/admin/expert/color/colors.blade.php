@extends('admin.layout')
@section('content')
    <h1>Цвета</h1>
    <div class="error">
        @if(!empty(Session::has('error')))
            {{ Session::get('error') }}
        @endif
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h2>Add Color</h2>
                {!! Form::open(array('route' => 'add-color', 'method' => 'post')) !!}
                {!! Form::text('color','',['class'=>'form-control']) !!}
                {!! Form::color('hash','',['class'=>'form-control']) !!}
                {!! Form::submit('Add color',['class'=>'btn btn-secondary']) !!}
                {!! Form::close() !!}
            </div>
            <div class="col-md-3 offset-1">
                <h2>цвета</h2>
                {!! Form::open(array('route' => 'dell-color', 'method' => 'post')) !!}
                @if(isset($colors))
                    <ul>
                        @foreach($colors as $color)

                            <li style="color: {{$color['hash']}}; border: black">
                                {!! Form::checkbox('colors[]',$color['id'],'') !!}
                                <span style="color: {!! $color['hash'] !!}">{!! $color['color'] !!}</span>
                            </li>

                        @endforeach
                        {!! Form::submit('Dell color',['class'=>'btn btn-secondary']) !!}
                    </ul>
                @else
                    <div>Цветов нет</div>
                @endif
                {!! Form::close() !!}
            </div>
        </div>
    </div>
    @endsection