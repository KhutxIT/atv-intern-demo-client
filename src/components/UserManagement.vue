<template>
  <div id="wrapper">
    <!-- /. NAV SIDE  -->
    <div id="page-wrapper">
        <div id="page-inner">
            <div class="row">
                <div class="col-md-12">
                    <h2>List User</h2>
                    <h5>You can view, edit , add, delete User</h5>

                </div>
            </div>
            <!-- /. ROW  -->
            <hr />

            <div class="row">
                <div class="col-md-12">
                    <!-- Advanced Tables -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <p>Advanced Tables | 
                            <router-link to="users/create">
                              Add User
                              </router-link>
                            </p>
                        </div>
                        <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover"
                                       id="dataTables-example">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Date of Birth</th>
                                        <th>Gender</th>
                                        <th>Address</th>
                                        <th>Salary</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody v-for="(user, index) in users" :key="user.id">
                                        <tr class="odd gradeX">
                                            <td>{{ user.id }}</td>
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.date_of_birth }}</td>
                                            <td>{{ user.gender }}</td>
                                            <td>{{ user.address }}</td>
                                            <td>{{ user.salary }}</td>
                                            <td>
                                              <router-link to="#" class="center">
                                                View
                                              </router-link><span> | </span>
                                              <router-link :to="{ name: 'admin-user-update', params: { userId: user.id } }" class="center">
                                                Edit
                                              </router-link><span> | </span>
																							<router-link to="#" class="center" @click="deleteUserById(user.id, index)">Delete</router-link>
																						</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <!--End Advanced Tables -->
                </div>
            </div>
        </div>
    </div>
    <!-- /. PAGE INNER  -->
</div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'UserCrud',
  data() {
    return {
      users: [],
      errors: null,
      response: null,
    }
  },
  mounted() {
    UserService.getAllUsers()
      .then(data => {
        this.users = data.data;
      })
      .catch(errors => {
        this.errors = errors;
      });
  },
  methods: {
    deleteUserById(id, index) {
			UserService.deleteUserById(id)
        .then(response => {
          this.response = response;
          this.users.splice(index, 1);
        })
        .catch(errs => {
          this.errors = errs;
        });
		},
  }
}
</script>