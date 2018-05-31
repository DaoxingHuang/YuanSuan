import React, { Component } from 'react';
import $ from 'jquery';
import fullCalendar from 'fullcalendar';
import gapi from 'gapi-client';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import Login from './Login'

class App extends Component {

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

   initClient=()=> {
            gapi.client.init({
              apiKey: "AIzaSyDOZI9XNJ4m4tROutyr76IEJPN5UBSMEy8",
              clientId: "557876893153-26b6pco279r8fpc0pv0tgu59ehasov9p.apps.googleusercontent.com",
              discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
              scope: "https://www.googleapis.com/auth/calendar.readonly"
            }).then(function () {
              // Listen for sign-in state changes.
              gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

              // Handle the initial sign-in state.
              this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
              //authorizeButton.onclick = handleAuthClick;
              //signoutButton.onclick = handleSignoutClick;
            });
          }

    start = ()=>{
     gapi.load('client:auth2', this.initClient);
        };


    //557876893153-26b6pco279r8fpc0pv0tgu59ehasov9p.apps.googleusercontent.com
    //MnOUh_eWTVk1h1aBiAqP23hc

//     authorize=(credentials, callback)=> {
//          const {client_secret, client_id, redirect_uris} = credentials.installed;
//          // generate a url that asks permissions for Google+ and Google Calendar scopes
//          const scopes = [
//            'https://www.googleapis.com/auth/calendar'
//          ];
//
//        const url = oauth2Client.generateAuthUrl({
//            // 'online' (default) or 'offline' (gets refresh_token)
//            access_type: 'offline',
//
//            // If you only need one scope you can pass it as a string
//            scope: scopes
//          });
//
//      const oauth2Client = new google.auth.OAuth2(
//        client_id,
//        client_secret,
//        url
//      );
//
//      let code = 123;
//      const token =  oauth2Client.getToken(code);
//
//      oauth2Client.setCredentials(JSON.parse(token));
//      callback(oauth2Client);
//    }

//    getAccessToken=(oAuth2Client, callback)=> {
//      const authUrl = oAuth2Client.generateAuthUrl({
//        access_type: 'offline',
//        scope: [
//                 'https://www.googleapis.com/auth/plus.me',
//                 'https://www.googleapis.com/auth/calendar'
//               ],
//      });
//      console.log('Authorize this app by visiting this url:', authUrl);
//      const rl = readline.createInterface({
//        input: process.stdin,
//        output: process.stdout,
//      });
//      rl.question('Enter the code from that page here: ', (code) => {
//        rl.close();
//        oAuth2Client.getToken(code, (err, token) => {
//          if (err) return callback(err);
//          oAuth2Client.setCredentials(token);
//          // Store the token to disk for later program executions
//          try {
//            fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
//            console.log('Token stored to', TOKEN_PATH);
//          } catch (err) {
//            console.error(err);
//          }
//          callback(oAuth2Client);
//        });
//      });
//    }

  responseGoogle = (response) => {
      console.log(response);
    }


  render() {

    return (
      <div>
       <Login/>
        <div className="calendar jquery-calendar">
      </div>

      </div>
    );
  }

   componentDidMount() {
         // this.start();
          this.setupCalendar($('.jquery-calendar'));
   }


}

export default App;
