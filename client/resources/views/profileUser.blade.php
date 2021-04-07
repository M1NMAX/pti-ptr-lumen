@extends('layouts.afterLog')

@section('content')
    <div class="w3-third">
        <div class="profile-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt=""/>
            <div class="btn btn-lg">
                Change Photo
                <input type="file" name="file"/>
            </div>
        </div>
    </div>
    <div class="w3-twothird profile">
        <div class="tab-content profile" id="myTabContent">
            <div>
                <div class="row">
                    <div class="col-md-4 profile">
                        <label>User Id</label>
                    </div>
                    <div class="col-md-4 profile">
                        <p>0DragonFire0</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 profile">
                        <label>Name</label>
                    </div>
                    <div class="col-md-4 profile">
                        <p>João</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 profile">
                        <label>Email</label>
                    </div>
                    <div class="col-md-4 profile">
                        <p>checheche@gmail.com</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 profile">
                        <label>Phone</label>
                    </div>
                    <div class="col-md-4 profile">
                        <p>123 456 7890</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4 profile">
                        <label>Profession</label>
                    </div>
                    <div class="col-md-4 profile">
                        <p>Web Developer and Designer</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
