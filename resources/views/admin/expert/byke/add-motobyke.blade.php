@extends('admin.layout')
@section('content')
<h1>Add Motobyke</h1>
<div class="error">
    @if(!empty(Session::has('error')))
        {{ Session::get('error') }}
    @endif
</div>
    {!! Form::open(array('route' => 'save-motobyke', 'method' => 'post', 'enctype'=>'multipart/form-data')) !!}
    <div class="container">
       @include('admin.moto.components.component-add-page')
        <div class="add-images">
            <div>Add Images</div>
            {!! Form::file('images[]',['multiple']) !!}
        </div>
        <div class="choose_color">
            <div>Color</div>

            @if(!empty($colors))
                <select name="color_id">
                    @foreach($colors as $color)
                        <option value="{{$color['id']}}">{{$color['color']}}</option>
                    @endforeach
                </select>
            @else
                <a href="{{route('admin-settings')}}">Add Color</a>
            @endif
        </div>
        <div class="choose_brand">
            <div>Brand</div>

            @if(!empty($brands))
                <select name="brand_id">
                    @foreach($brands as $brand)
                        <option value="{{$brand['id']}}">{{$brand['brand']}}</option>
                    @endforeach
                </select>
            @else
                <a href="{{route('add-brand')}}">Add Brand </a>
            @endif
        </div>
        <div class="choose_type">
            <div>Type</div>

            @if(!empty($types))
                <select name="type_id">
                    @foreach($types as $type)
                        <option value="{{$type['id']}}">{{$type['type']}}</option>
                    @endforeach
                </select>
            @else
                <a href="{{route('add-type')}}">Add Type</a>
            @endif
        </div>
        <div class="choose_transmission">
            <div>Transmission</div>
            @if(!empty($transmissions))
                <select name="transmission_id">
                    @foreach($transmissions as $transmission)
                        <option value="{{$transmission['id']}}">{{$transmission['transmission']}}</option>
                    @endforeach
                </select>
            @else
                <a href="{{route('transmissions')}}" style="color: yellow">Add Transmission </a>
            @endif
        </div>
        <div class="mileage">
            <div>Add Mileage</div>
            {!! Form::number('mileage') !!}
        </div>
        <div class="year">
            <div>Year</div>
            @if(!empty($years))
                <select name="year">

                    @foreach($years as $year)
                        <option>{{$year}}</option>
                    @endforeach
                </select>
            @endif
        </div>
        <div class="service_book">
            <div>If Service book</div>
            {!! Form::checkbox('service_book') !!}
        </div>
        {!! Form::submit('Save') !!}
        {!! Form::close() !!}
    </div>
@endsection