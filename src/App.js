import React, {
    Component
} from 'react';
import fullCalendar from 'fullcalendar';
import gapi from 'gapi-client';
import $ from 'jquery';
import './App.css';
import {GapiConfig} from './constants'


class App extends Component {

    constructor() {
        super();
        this.singinRef = React.createRef();
    }


    setupCalendar = (calendar) => {
        calendar.fullCalendar({
            defaultDate: '2018-06-12',
            editable: true,
            eventLimit: true
        });
    }

    handleClientLoad = () => {
        // Load the API's client and auth2 modules.
        // Call the initClient function after the modules load.
        gapi.load('client:auth2', this.initClient);
    }

    handleAuthClick = (event) => {
        gapi.auth2.getAuthInstance().signIn();
        this.listUpcomingEvents();
    }

    listUpcomingEvents = () => {
        gapi.client.calendar.events.list({
            'calendarId': 'primary',
            'showDeleted': false,
            'singleEvents': true,
            'maxResults': 10,
            'orderBy': 'startTime'
        }).then(function(response) {
            const result = response.result.items;
            const source = result.map((item, index) => {
                return {
                    title: item.summary,
                    start: item.start,
                    end: item.end
                }
            });
            $('#calendar').fullCalendar('addEventSource', source);
        });
    }
    handleSignoutClick = (event) => {
        gapi.auth2.getAuthInstance().signOut();
    }
    getScope = () => {
        return 'https://www.googleapis.com/auth/calendar';
    }
    initClient = () => {
        // Retrieve the discovery document for version 3 of Google Drive API.
        // In practice, your app can retrieve one or more discovery documents.
        // Initialize the gapi.client object, which app uses to make API requests.
        // Get API key and client ID from API Console.
        // 'scope' field specifies space-delimited list of access scopes.
        gapi.client.init({
            'apiKey': GapiConfig.apiKey,
            'discoveryDocs': [GapiConfig.discoveryDocs],
            'clientId': GapiConfig.clientId,
            'scope': GapiConfig.scope
        }).then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen(this.setSigninStatus);
            // Handle the initial sign-in state.
            this.setSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            $('#authorize-button').on("click", this.handleAuthClick);
            //$('#signout-button').on("click",this.handleSignoutClick);
        });
    }

    setSigninStatus = (isSignedIn) => {
        var user = gapi.auth2.getAuthInstance().currentUser.get();
        var isAuthorized = user.hasGrantedScopes(GapiConfig.scope);
        if (isAuthorized) {
            // $('#signout-button').css('display', 'block');
            // $('#authorize-button').css('display', 'none');
            this.listUpcomingEvents();
        } else {
            // $('#sign-in-or-out-button').html('Sign In/Authorize');
            //  $('#signout-button').css('display', 'none');
            // $('#authorize-button').css('display', 'block');

        }
    }

    componentDidMount() {
        this.setupCalendar($('.jquery-calendar'));
        this.handleClientLoad();
        //$('#authorize-button').css('display', 'none');
    }

    render() {

        return (
           <div>
              <div className="calendar google-auth-container">
                   <div>
                   <button className="google-auth google-dark right" >
                     <span className="google-icon"></span>
                     <span className="google-text">Sync Calendar</span>
                   </button>

                 </div>
                </div>
                <div  className="calendar jquery-calendar"></div>
           </div>
        );
    }
}

export default App;