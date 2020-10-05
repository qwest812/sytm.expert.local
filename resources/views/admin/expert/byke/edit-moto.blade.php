@extends('admin.layout')
@section('content')
    <h1>Edit Moto</h1>

    <div class="error">
        @if(!empty(Session::has('success')))
            {{ Session::get('success') }}
        @endif
    </div>
    {!! Form::model($moto,array('route' => 'save-motobyke', 'method' => 'put')) !!}
    <div class="date-info">
        <div>Created: {{$moto['created_at']}}</div>
        <div>Last Update: {{$moto['updated_at']}}</div>
    </div>
    <div class="container">
        {!! Form::text('id',$moto['id'],["hidden"]) !!}
        @include('admin.moto.components.component-add-page')

        <div>
            @if($images)
                @foreach($images as $image)
                    <div>
                        <div style='width: 100px; height: 100px;background: url("{{(asset($image['path']))}}"); background-size: contain; background-repeat: no-repeat'>
                        </div>
                        <div><input type="button" value="delete" data-content="{{$image['id']}}"
                                    onclick="deleteImageMoto('{{$image['path']}}', this)"></div>
                    </div>
                @endforeach

            @endif
        </div>
        <div class="add-images">
            <div>Add Images</div>
            {!! Form::file('images[]',['multiple']) !!}
        </div>
        <div class="choose_color">
            <div>Color</div>
            @if(!empty($colors))
                <select name="color_id">
                    @foreach($colors as $color)
                        <option value="{{$color['id']}}" {{($color['id']==$moto['color_id']) ? "selected":""}}>{{$color['color']}}</option>
                    @endforeach
                </select>
            @endif
        </div>
        <div class="choose_brand">
            <div>Brand</div>

            @if(!empty($brands))
                <select name="brand_id">
                    @foreach($brands as $brand)
                        <option value="{{$brand['id']}}" {{($brand['id']==$moto['brand_id']) ? "selected":""}}>{{$brand['brand']}}</option>
                    @endforeach
                </select>
            @endif
        </div>
        <div class="choose_type">
            <div>Type</div>

            @if(!empty($types))
                <select name="type_id">
                    @foreach($types as $type)
                        <option value="{{$type['id']}}" {{($type['id']==$moto['type_id']) ? "selected":""}}>{{$type['type']}}</option>
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
                        <option value="{{$transmission['id']}}" {{($transmission['id']==$moto['transmission_id']) ? "selected":""}}>{{$transmission['transmission']}}</option>
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
                        <option {{($year==$moto['year']) ? "selected":""}}>{{$year}}</option>
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

@push('js-scripts')
    <script>

        function deleteImageMoto(filePath, el) {

            let location = document.location;

            let url = location.origin + '/admin/delete-image-moto';
            $.ajax({
                data: {path: filePath},
                type: "POST",
                headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
                url: url,
                success: function (result) {
                    let elm = el.parentElement.parentElement;
                    elm.style.display = 'none';
                    console.log(result);
                }
            });
        }
    </script>
@endpush