
export default async (request, context) => {
  /*
  // Look for the "?method=transform" query parameter, and return if we don't find it
  const url = new URL(request.url)
  if (url.searchParams.get('method') !== 'transform') {
    return
  } */

  // Get the page content that will be served next.
  // Here it will be the content from `index.html`
  const response = await context.next()
  const page = await response.text()

  // Search for the placeholder
  const regex = /LOCATION_UNKNOWN/i

  // Get the location from the Context object
  const location = `${context.geo.city}, ${context.geo.country.name}`

  // Replace the content with the current location
  const updatedPage = page.replace(regex, location)

  // Return the response
  // eslint-disable-next-line consistent-return
  return new Response(updatedPage, response)
}
