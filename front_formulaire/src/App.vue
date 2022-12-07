<template>
  <v-app>
    <v-app-bar
            app
            dark
    >
    <v-btn
            v-if="$auth.isAuthenticated"
            color="blue darken-1"
            text
            @click="logout"
          >
            Se déconnecter
          </v-btn>
          <button @click="callApi">Call</button>
    </v-app-bar>
    <v-content>
      <v-container
              class="fill-height"
              fluid
      >
        <v-row
                align="center"
                justify="center"
        >

          <v-col v-if="$auth.isAuthenticated" class="text-center">
            <transition name="zoom" mode="out-in" appear>
            <router-view></router-view>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-footer
            app
            dark
    >
      <span class="white--text">&copy; 2022 ESPOSITO Dan</span>
    </v-footer>
  </v-app>
</template>


<script>
import axios from "axios";
  export default {
    name:'App',
    data(){
      return{
      }
    },
    methods:{
      login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    },
    async callApi() {
        // Get the access token from the auth wrapper
        const token = await this.$auth.getTokenSilently();

        // Use Axios to make a call to the API
        const { data } = await axios.get('http://localhost:5000', {
          headers: {
            Authorization: `Bearer <%= "${token}" %>` // send the access token through the 'Authorization' header
          }
        });
        console.log(token,data);
      }
    },
  };
</script>
<style>
  .zoom-enter-active{
    animation: zoomIn 0.5s;
  }
  .zoom-leave-active{
    animation: zoomOut 0.5s;
  }
  @-webkit-keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }

  @keyframes zoomIn {
    from {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    50% {
      opacity: 1;
    }
  }
  @-webkit-keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      -webkit-transform: scale3d(0.3, 0.3, 0.3);
      transform: scale3d(0.3, 0.3, 0.3);
    }

    to {
      opacity: 0;
    }
  }

  .zoomIn {
    -webkit-animation-name: zoomIn;
    animation-name: zoomIn;
  }

</style>
