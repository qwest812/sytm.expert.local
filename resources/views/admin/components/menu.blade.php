<nav id="sidebar" style="position: relative">
    <div style="position: absolute; width: 22px;height: 34px; top: 230px; left: 250px;background: #7386D5; cursor: pointer"
         id="sidebarCollapse">
        <div class="arrow_to_left" id="arrow"></div>
    </div>
    <div class="sidebar-header">
        <h3>SITE EXPERT</h3>
    </div>

    <ul class="list-unstyled components">
        <li class="active">
            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle">Site</a>
            <ul class="collapse list-unstyled" id="homeSubmenu">
                <li>
                    <a href="{{route('news')}}">Новости / Иследования</a>
                </li>
                <li>
                    <a href="{{route('deletedNews')}}">Удаленные Новости / Иследования</a>
                </li>
                    <a href="{{route('languages')}}">Языки</a>
                </li>

            </ul>
        </li>

        <li>
            <ul class="collapse list-unstyled" id="pageSubmenu">
            </ul>
        </li>

    </ul>
</nav>