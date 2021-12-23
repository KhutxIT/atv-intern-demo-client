<template>
  <div id="wrapper">
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <h2>User Update</h2>
                </div>
            </div>
            <!-- /. ROW  -->
            <hr />
            <div class="row">
                <div class="col-md-12">
                    <!-- Form Elements -->
                    <div class="panel panel-default">
                        <div class="panel-heading">Update User</div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h3>User Info:</h3>

                                    <form role="form"
                                          enctype="multipart/form-data">
                                        <div class="form-group">
                                            <label>Email:</label>
                                            <input class="form-control"
                                              type="email"
                                              v-model="user.email"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Password:</label>
                                            <input class="form-control" 
                                              v-model="user.password"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Name:</label>
                                            <input class="form-control" 

                                              v-model="user.name"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Date of Birth:</label>
                                            <input class="form-control" 
                                              type="date"
                                              v-model="user.date_of_birth"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Gender:</label>
                                            <input class="form-control"
                                              v-model="user.gender"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Address:</label>
                                            <input class="form-control"
                                              v-model="user.address"/>
                                        </div>
                                        <div class="form-group">
                                            <label>CMND Number:</label>
                                            <input class="form-control"
                                              type="number"
                                              v-model="user.cmnd_number"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Salary:</label>
                                            <input class="form-control"
                                              type="number"
                                              v-model="user.salary"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Manager ID:</label>
                                            <input class="form-control"
                                              type="number"
                                              v-model="user.manager_id"/>
                                        </div>
                                        <div class="form-group">
                                            <label>Roles:</label>
                                            <input class="form-control"
                                              v-model="user.roles"/>
                                        </div>
                                        <button type="submit" class="btn btn-default" @click="updateUser()">Update</button>
                                        <button type="reset" class="btn btn-primary">Reset</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End Form Elements -->
                </div>
            </div>
            <!-- /. ROW  -->
            <div class="row">
                <div class="col-md-12"></div>
            </div>
            <!-- /. ROW  -->
        </div>
        <!-- /. PAGE INNER  -->
    </div>
    <!-- /. PAGE WRAPPER  -->
</div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'UserUpdate',
  data() {
    return {
      user: {},
      errors: null,
    }
  },
  mounted() {
    let userId = this.$route.params.userId;
    UserService.getUser(userId)
      .then(data => {
        this.user = data.data;
      })
      .catch(errors => {
        this.errors = errors;
      })
  },
  methods: {
    updateUser() {
      
    }
  }
}
</script>