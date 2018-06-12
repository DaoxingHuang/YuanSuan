import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import gapi from 'gapi-client';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import Login from './Login';
import fetchJsonp from 'fetch-jsonp'
class App extends Component {

    constructor() {
        super();
        this.singinRef = React.createRef();
      }
    //AIzaSyAqT8wb3zioCk5FZ98lPwc0t4vbjB0ulSg
    //125993358695-4ro88rom7846k3bo290juotlskvn1n4g.apps.googleusercontent.com
    //8Fv-n3K97EBvmHDxGROgLdnG
    //ap[i key :AIzaSyD84HhDX3c1puWGieAqdklTvxOWpEQtd_c
    setupCalendar = (calendar)=>{
        calendar.fullCalendar({
            editable: true,
            firstDay: 1,
            droppable: true,
            drop(date) {
            },
            eventReceive(event) {
            },
            eventMouseover(event, jsEvent, view) {
            },
            eventMouseout(event, jsEvent, view) {
            }
          });
    }

     updateSigninStatus=(isSignedIn)=> {
//            if (isSignedIn) {
//              authorizeButton.style.display = 'none';
//              signoutButton.style.display = 'block';
//              listUpcomingEvents();
//            } else {
//              authorizeButton.style.display = 'block';
//              signoutButton.style.display = 'none';
//            }
          }

         handleAuthClick=(event)=> {
                  gapi.auth2.getAuthInstance().signIn();
                }
  initClient= ()=> {
    // Retrieve the discovery document for version 3 of Google Drive API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.

    gapi.client.init({
        'apiKey': 'AIzaSyD84HhDX3c1puWGieAqdklTvxOWpEQtd_c',
        'discoveryDocs': [discoveryUrl],
        'clientId': '125993358695-4ro88rom7846k3bo290juotlskvn1n4g.apps.googleusercontent.com',
        'scope': discoveryUrl
    }).then(function () {
     let  GoogleAuth = gapi.auth2.getAuthInstance();

      // Listen for sign-in state changes.
     // GoogleAuth.isSignedIn.listen(updateSigninStatus);

      // Handle initial sign-in state. (Determine if user is already signed in.)
      var user = GoogleAuth.currentUser.get();
      //setSigninStatus();

      // Call handleAuthClick function when user clicks on
      //      "Sign In/Authorize" button.
      $('#sign-in-or-out-button').click(function() {
        this.handleAuthClick();
      });
      $('#revoke-access-button').click(function() {
       // revokeAccess();
      });
    });
  }

    start = ()=>{
    fetchJsonp('https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.WcpMzqgmJZU.O/m=auth2,client/rt=j/sv=1/d=1/ed=1/am=AQ/rs=AGLTcCNsTS1p4dx0iMhlrwEpiaXw4iMjOg/cb=gapi.loaded_0', {
        timeout: 3000,
      })
      .then(function(response) {
        return response.json()
      }).then(function(json) {
        console.log('parsed json', json)
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      });
//    /fetchJsonp();
//https://apis.google.com/_/scs/apps-static/_/js/k=oz.gapi.en.WcpMzqgmJZU.O/m=auth2,client/rt=j/sv=1/d=1/ed=1/am=AQ/rs=AGLTcCNsTS1p4dx0iMhlrwEpiaXw4iMjOg/cb=gapi.loaded_0
        gapi.load('client:auth2', this.initClient);
        };


  responseGoogle = (response) => {
      console.log(response);
    }


  render() {

    return (
      <div>


        <div className="calendar jquery-calendar">
      </div>

      </div>
    );
  }

   componentDidMount() {
          this.start();
          this.setupCalendar($('.jquery-calendar'));
   }


}

export default App;
