<template>
  <div id="wrapper">
    <!-- /. NAV SIDE  -->
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <h2>Dashboard</h2>
                    <h5>Welcome: {{ currentUser.name }}</h5>
                </div>
            </div>
            <!-- /. ROW  -->
            <hr />
            <div class="row">
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <div class="panel panel-back noti-box">
							<span class="icon-box bg-color-red set-icon"> <i
                                    class="fa fa-envelope-o"></i>
							</span>
                        <div class="text-box">
                            <p class="main-text">120 New</p>
                            <p class="text-muted">Messages</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <div class="panel panel-back noti-box">
							<span class="icon-box bg-color-green set-icon"> <i
                                    class="fa fa-bars"></i>
							</span>
                        <div class="text-box">

                            <p class="main-text">30 Tasks</p>
                            <p class="text-muted">Remaining</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <div class="panel panel-back noti-box">
							<span class="icon-box bg-color-blue set-icon"> <i
                                    class="fa fa-bell-o"></i>
							</span>
                        <div class="text-box">
                            <p class="main-text">240 New</p>
                            <p class="text-muted">Notifications</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-6">
                    <div class="panel panel-back noti-box">
							<span class="icon-box bg-color-brown set-icon"> <i
                                    class="fa fa-rocket"></i>
							</span>
                        <div class="text-box">
                            <p class="main-text">3 Orders</p>
                            <p class="text-muted">Pending</p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /. ROW  -->
            <hr />
            <!-- /. ROW  -->
            <div class="row">


                <div class="col-md-9 col-sm-12 col-xs-12"></div>
                <div class="col-md-3 col-sm-12 col-xs-12"></div>

            </div>

        </div>
        <!-- /. ROW  -->
        <div class="row">
            <div class="col-md-3 col-sm-12 col-xs-12">
                <div
                        class="panel panel-primary text-center no-boder bg-color-green">
                    <div class="panel-body">
                        <i class="fa fa-comments-o fa-5x"></i>
                        <h4>200 New Comments</h4>
                        <h4>See All Comments</h4>
                    </div>
                    <div class="panel-footer back-footer-green">
                        <i class="fa fa-rocket fa-5x"></i> Lorem ipsum dolor sit amet sit
                        sit, consectetur adipiscing elitsit sit gthn ipsum dolor sit amet
                        ipsum dolor sit amet

                    </div>
                </div>
            </div>
            <div class="col-md-9 col-sm-12 col-xs-12">

                <div class="panel panel-default">
                    <div class="panel-heading">Responsive Table Example</div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>User No.</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>100090</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>100090</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>100090</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>100090</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td>100090</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                    <td>100090</td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!-- /. ROW  -->

        <!-- /. ROW  -->
    </div>
    <!-- /. PAGE INNER  -->
</div>
<!-- /. PAGE WRAPPER  -->

</template>

<script>
export default {
  name: "AdminBoardHome",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
}
</script>