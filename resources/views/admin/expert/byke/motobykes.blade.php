@extends('admin.layout')
@section('content')
    <a class="add_motobyke" href="{{route('add-motobyke')}}">
        ADD
    </a>
    <div class="container">
        @if(!empty($motobykes))
            <div class="row">
                @foreach($motobykes as $type)
                    <div class="col-md-1">{{$type['id']}}</div>
                    <div class="col-md-3">{{$type['h1']}}</div>
                    <div class="col-md-3">{{$type['url']}}</div>
                    <div class="col-md-3">{{$type['updated_at']}}</div>
                    <div class="col-md-1">
                        {!! Form::open(array('route' => 'edit-motobyke', 'method' => 'get',)) !!}
                        {!! Form::hidden('id',$type['id'],['class'=>'disp_none']) !!}
                        {!! Form::submit('Edit') !!}
                        {!! Form::close() !!}
                    </div>
                    <div class="col-md-1">
                        {!! Form::open(array('route' => 'dell-motobyke', 'method' => 'post',)) !!}
                        {!! Form::hidden('id',$type['id'],['class'=>'disp_none']) !!}
                        {!! Form::hidden('_method','POST',['class'=>'disp_none']) !!}

                        {!! Form::submit('Dell') !!}
                        {!! Form::close() !!}
                    </div>
                    {{--<div class="col-md-2">--}}
{{----}}
                    {{--</div>--}}
                @endforeach
            </div>
        @else
            <div><span>Please </span><a href="{{route('add-motobyke')}}" class="__blue">Add motobyke</a></div>
        @endif
    </div>
@endsection