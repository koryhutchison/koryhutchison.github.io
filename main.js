/*==============================================================================
* File:   main.js
* Author: Kory Hutchison
* Date:   Winter 2018
*
* Description: JavaScript library for the OMDb API
*              IS 542, Winter 2018, BYU.
*/


const Omdb = (function () {
    "use strict";
    /*----------------------------------------------------------------------------
    *                             Constants
    */
    const apiKey = "7d8323b9"

    /*----------------------------------------------------------------------------
    *                             Private Variables
    */


    /*------------------------------------------------------------------------
     *                      PRIVATE METHOD DECLARATIONS
     */
    let byIdOrTitle;
    let bySearch;
    let getJSON;
    let makeRequest;

    /*----------------------------------------------------------------------------
    *                             Private Methods
    */
    byIdOrTitle = function (options) {

        // Set the base url
        let url = "http://www.omdbapi.com/?"

        if (options.title != undefined && options.id != undefined) {
            return console.log("Title and ID can't be defined at the same time. Choose one or the other for consistant results.");
        }

        if (options.title != undefined) {
            let lowerCaseTitle = options.title.toLowerCase();
            let parsedTitle = lowerCaseTitle.replace(" ", "+")
            url += "t=" + parsedTitle
        }

        if (options.id != undefined) {
            url += "i=" + options.id;
        }

        url += "&apikey=" + apiKey;

        return makeRequest(url);
    };

    bySearch = function () {

    };

    getJSON = function (promise) {
        return promise.then(JSON.parse)
    };

    makeRequest = function (url) {
        return getJSON(new Promise(function(resolve, reject) {
        let req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // Check status to see if it's a success
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Reject and return the error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
        }));
    };

    /*----------------------------------------------------------------------------
    *                             Public API
    */
    return {
        byIdOrTitle: byIdOrTitle,
        bySearch: bySearch
    };
}());
