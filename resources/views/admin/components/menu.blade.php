<nav id="sidebar" style="position: relative">
    <div style="position: absolute; width: 22px;height: 34px; top: 230px; left: 250px;background: #7386D5; cursor: pointer"
         id="sidebarCollapse">
        <div class="arrow_to_left" id="arrow"></div>
    </div>
    <div class="sidebar-header">
        <h3>SITE EXPERT</h3>
    </div>

    <ul class="list-unstyled components">
        {{--<p>Dummy Heading</p>--}}
        <li class="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Site</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                    <a href="{{route('news')}}">Новости / Иследования</a>
                </li>
                {{--<li>--}}
                    {{--<a href="{{route('motobykes')}}">Иследования</a>--}}
                {{--</li>--}}
                <li>
                    <a href="{{route('languages')}}">Языки</a>
                </li>
                {{--<li>--}}
                    {{--<a href="{{route('brands')}}">Brands</a>--}}
                {{--</li>--}}
                {{--<li>--}}
                    {{--<a href="{{route('types')}}">Moto Types</a>--}}
                {{--</li>--}}
                {{--<li>--}}
                    {{--<a href="{{route('moto-colors')}}">Moto Colors</a>--}}
                {{--</li>--}}
                {{--<li>--}}
                    {{--<a href="{{route('transmissions')}}">Moto Transmissions</a>--}}
                {{--</li>--}}
            </ul>
        </li>
        {{--<li>--}}
            {{--<a href="#">About</a>--}}
        {{--</li>--}}
        <li>
            {{--<a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Pages</a>--}}
            <ul class="collapse list-unstyled" id="pageSubmenu">
                {{--<li>--}}
                    {{--<a href="#">Page 1</a>--}}
                {{--</li>--}}
                {{--<li>--}}
                    {{--<a href="#">Page 2</a>--}}
                {{--</li>--}}
                {{--<li>--}}
                    {{--<a href="#">Page 3</a>--}}
                {{--</li>--}}
            </ul>
        </li>
        {{--<li>--}}
            {{--<a href="#">Portfolio</a>--}}
        {{--</li>--}}
        {{--<li>--}}
            {{--<a href="#">Contact</a>--}}
        {{--</li>--}}
    </ul>
</nav>