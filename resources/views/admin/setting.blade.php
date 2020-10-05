@extends('admin.layout')
@section('content')
    <div class="error">
        @if(!empty(Session::has('error')))
            {{ Session::get('error') }}
        @endif
    </div>
    <div class="container" style="background-color: grey">

        <div class="row">
            <div class="col-md-3 offset-md-1">
                <fieldset>
                    <legend>Добавить Цвет</legend>
                    {!! Form::open(array('route' => 'add-color', 'method' => 'post')) !!}
                    {!! Form::text('color','',['class'=>'form-control']) !!}
                    {!! Form::color('hash','',['class'=>'form-control']) !!}
                    {!! Form::submit('Add color',['class'=>'btn btn-secondary']) !!}
                    {!! Form::close() !!}
                </fieldset>
            </div>

            <div class="col-md-3 offset-md-3">
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
            <div class="col-md-3 offset-md-1">
                <fieldset>
                    <legend>Добавить Бренд</legend>
                    {!! Form::open(array('route' => 'add-brand', 'method' => 'post')) !!}
                    {!! Form::text('brand','',['class'=>'form-control']) !!}
                    {!! Form::submit('Add brand',['class'=>'btn btn-secondary']) !!}
                    {!! Form::close() !!}
                </fieldset>
            </div>
            <div class="col-md-3 offset-md-3">
                <h2>Бренды</h2>
                {!! Form::open(array('route' => 'dell-brand', 'method' => 'post')) !!}
                @if(!empty($brands))
                    <ul>
                        @foreach($brands as $brand)
                            <li>
                                {!! Form::checkbox('brands[]',$brand['id'],'') !!}
                                {{$brand['brand']}}
                            </li>
                        @endforeach
                    </ul>
                    {!! Form::submit('Dell brand',['class'=>'btn btn-secondary']) !!}
                @else
                    <div>Брендов нет</div>
                @endif
                {!! Form::close() !!}
            </div>
            <div class="col-md-3 offset-md-1">
                <fieldset>
                    <legend>Добавить Трансмисию</legend>
                    {!! Form::open(array('route' => 'add-transmission', 'method' => 'post')) !!}
                    {!! Form::text('transmission','',['class'=>'form-control']) !!}
                    {!! Form::submit('Add transmission',['class'=>'btn btn-secondary']) !!}
                    {!! Form::close() !!}
                </fieldset>
            </div>
            <div class="col-md-3 offset-md-3">
                <h2>Трансмисии</h2>
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