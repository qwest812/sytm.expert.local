@extends('admin.layout')
@section('content')
    <a class="add_motobyke" href="{{route('add-type')}}">
        ADD
    </a>
    <div class="container">
        <h1>Types</h1>
        <div class="error">
            @if(!empty(Session::has('error')))
                {{ Session::get('error') }}
            @endif
        </div>
        @if(!empty($types))
            <div class="row">
                @foreach($types as $type)
                    <div class="col-md-2">{{$type['type']}}</div>
                    <div class="col-md-2">{{$type['h1']}}</div>
                    <div class="col-md-2">{{$type['url']}}</div>
                    <div class="col-md-2">{{$type['updated_at']}}</div>
                    <div class="col-md-1">
                        {!! Form::open(array('route' => 'edit-type', 'method' => 'get',)) !!}
                        {!! Form::hidden('id',$type['id'],['class'=>'disp_none']) !!}
                        {!! Form::submit('Edit') !!}
                        {!! Form::close() !!}
                    </div>
                    <div class="col-md-1">
                        {!! Form::open(array('route' => 'dell-type', 'method' => 'post',)) !!}
                        {!! Form::hidden('id',$type['id'],['class'=>'disp_none']) !!}
                        {!! Form::hidden('_method','POST',['class'=>'disp_none']) !!}

                        {!! Form::submit('Dell') !!}
                        {!! Form::close() !!}
                    </div>
                    <div class="col-md-2">

                    </div>
                @endforeach
            </div>
        @else
            <div><span>Please </span><a href="{{route('add-type')}}" class="__blue">Add type</a></div>
        @endif
    </div>
@endsection