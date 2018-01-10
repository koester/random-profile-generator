/**
 * Helper Component to visualize fetching processo
 * @author Etienne Martin - https://stackoverflow.com/a/43792563
 */
// Store a copy of the fetch function
var _oldFetch = fetch;

// Create our new version of the fetch function
window.fetch = function() {
  // Create hooks
  var fetchStart = new Event("fetchStart", {
    view: document,
    bubbles: true,
    cancelable: false
  });
  var fetchEnd = new Event("fetchEnd", {
    view: document,
    bubbles: true,
    cancelable: false
  });

  // Pass the supplied arguments to the real fetch function
  var fetchCall = _oldFetch.apply(this, arguments);

  // Trigger the fetchStart event
  document.dispatchEvent(fetchStart);

  fetchCall
    .then(function() {
      // Trigger the fetchEnd event
      document.dispatchEvent(fetchEnd);
    })
    .catch(function() {
      // Trigger the fetchEnd event
      document.dispatchEvent(fetchEnd);
    });

  return fetchCall;
};

document.addEventListener("fetchStart", function() {
  let profile = document.querySelector("main");
  if (!profile.classList.contains("loading")) {
    profile.classList.add("loading");
  }
});

document.addEventListener("fetchEnd", function() {
  document.querySelector("main").classList.remove("loading");
});
