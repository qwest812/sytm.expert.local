@extends('admin.layout')
@section('content')
<h1>Add Type</h1>
    {!! Form::open(array('route' => 'save-type', 'method' => 'post')) !!}
    <div class="container">
        @include('admin.moto.components.component-add-page')
        <div class="add_page_keyword">
            <div>Type</div>
            {!! Form::text('type') !!}
        </div>
        {!! Form::submit('Save') !!}
        {!! Form::close() !!}
    </div>
@endsection