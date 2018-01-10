/* init */
import "./component/loading"
const api = "https://randomuser.me/api/"
const btn = document.querySelector("button")
const avatar = document.querySelector("#avatar")
const name = document.querySelector("#fullname")
const username = document.querySelector("#username")
const email = document.querySelector("#email")
const city = document.querySelector("#city")

/**
 * Checks for response status and
 * throws an error on 404 status code
 *
 * @param {Promise} res
 * @returns {Promise, Error}
 */
const handleResponseErrors = res => {
  if (!res.ok) {
    throw Error(404)
  }
  return res
}

/**
 * Parse the incoming data to JSON
 * an return it
 *
 * @param {Promise} res
 * @returns {Promise.<Object>}
 */
const parseJSON = res => {
  return (res = res.json())
}

/**
 * Get the data from fetched object
 * user information
 *
 * @param {Promise} res
 * @returns {Promise.<Object>}
 */
const updateProfile = res => {
  let profile = res.results[0]
  let capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  let firstName = capitalizeFirstLetter(profile.name.first)
  let lastName = capitalizeFirstLetter(profile.name.last)
  let cityName = capitalizeFirstLetter(profile.location.city)

  avatar.src = profile.picture.large
  name.innerText = `${firstName} ${lastName}`
  username.innerText = `@${profile.login.username}`
  email.innerText = profile.email
  city.innerText = cityName

  return res
}

/**
 * Log any errors to the console
 *
 * @param {Error} error
 */
const logError = error => {
  console.log(error)
}

btn.addEventListener("click", function () {
  fetch(api)
    .then(handleResponseErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(logError)
})
