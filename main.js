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
    let buildUrl;
    let findBySearch;
    let getById;
    let getByTitle;
    let getJSON;
    let makeRequest;

    /*----------------------------------------------------------------------------
    *                             Private Methods
    */
    buildUrl = function (apiType, parameters) {
        // NEEDSWORK: Need to add way to add season and episode parameters

        let url = "http://www.omdbapi.com/?";

        if (apiType === "title") {
            url += "t=" + parameters.title;

            if (parameters.plot != undefined) {
                url += "&plot=" + parameters.plot;
            }
        } else if (apiType === "id") {
            url += "i=" + parameters.imdbid;

            if (parameters.plot != undefined) {
                url += "&plot=" + parameters.plot;
            }
        } else if (apiType === "search") {
            url += "s=" + parameters.searchText;

            if (parameters.page != undefined) {
                url += "&page=" + parameters.page;
            }
        }

        // If provided, add the type (movie, series, episode)
        if (parameters.type != undefined) {
            url += "&type=" + parameters.type;
        }

        // If provided, add the year
        if (parameters.year != undefined) {
            url += "&y=" + parameters.year
        }

        // If provided, add the return datatype
        if (parameters.returnType != undefined) {
            url += "&r=" + parameters.returnType
        }

        // If provided, add the version number, the default right now with the API is 1
        if (parameters.version != undefined) {
            url += "&v=" + parameters.version
        }

        return url += "&apikey=" + apiKey;
    };

    findBySearch = function (options) {
        let returnJSON = false;

        if (options.searchText === false) {
            return console.log("Error: Didn't specify searchText name in parameters object.")
        }

        let url = buildUrl("search", options);

        if (options.returnType === "json") {
            returnJSON = true;
        }

        return makeRequest(url, returnJSON);
    };

    getById = function (options) {
        let returnJSON = false;

        if (options.imdbid === undefined) {
            return console.log("Error: Didn't specify imdbid name in parameters object.")
        }

        let url = buildUrl("id", options);

        if (options.returnType === "json") {
            returnJSON = true;
        }

        return makeRequest(url, returnJSON);
    };

    getByTitle = function (options) {
        let returnJSON = false;

        if (options.title === undefined) {
            return console.log("Error: Didn't specify title name in parameters object.")
        }

        let url = buildUrl("title", options);

        if (options.returnType === "json") {
            returnJSON = true;
        }

        return makeRequest(url, returnJSON);
    };

    getJSON = function (promise) {
        return promise.then(JSON.parse)
    };

    makeRequest = function (url, returnJSON) {
        let promiseObject = new Promise(function(resolve, reject) {
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
                });

        if (returnJSON === true) {
            return getJSON(promiseObject);
        } else {
            return promiseObject;
        }
    };

    /*----------------------------------------------------------------------------
    *                             Public API
    */
    return {
        findBySearch: findBySearch,
        getById: getByID,
        getbyTitle: getByTitle
    };
}());
