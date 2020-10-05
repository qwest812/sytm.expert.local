@extends('admin.layout')
@section('content')
    <h1>Transmissions</h1>
    <div class="error">
        @if(!empty(Session::has('error')))
            {{ Session::get('error') }}
        @endif
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h2>Add Transmissions</h2>
                {!! Form::open(array('route' => 'save-transmission', 'method' => 'post')) !!}
                {!! Form::text('transmission','',['class'=>'form-control']) !!}
                {!! Form::submit('Add transmission',['class'=>'btn btn-secondary']) !!}
                {!! Form::close() !!}
            </div>
            <div class="col-md-3 offset-1">
                <h2>Transmissions</h2>
                {!! Form::open(array('route' => 'dell-transmission', 'method' => 'post')) !!}
                @if(!empty($transmissions))
                    <ul>
                        @foreach($transmissions as $transmission)

                            <li>
                                {!! Form::checkbox('transmissions[]',$transmission['id'],'') !!}
                                {{$transmission['transmission']}}</li>
                        @endforeach
                        <input type="submit" value="Удалить трансмисию" name="dell_transmission">
                    </ul>
                @else
                    <div>Трансмисий нет</div>
                @endif
                {!! Form::close() !!}
            </div>
        </div>
    </div>
    @endsection