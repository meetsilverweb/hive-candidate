import axios, { AxiosResponse, AxiosError } from 'axios'

interface ApiResponse<T> {
  data: any
  error?: string
}

export async function api<T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: any
): Promise<ApiResponse<T>> {
  try {
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data: body
    })

    return {
      data: response.data
    }
  } catch (error: any) {
    handleApiError(error)
    return {
      data: null,
      error: 'An error occurred while making the API call.'
    }
  }
}

function handleApiError(error: AxiosError) {
  if (error.response) {
    const status = error.response.status
    switch (status) {
      case 400:
        console.error('Bad request error:', error.response)
        break
      case 401:
        console.error('Unauthorized error:', error.response)
        break
      case 403:
        console.error('Forbidden error:', error.response)
        break
      case 404:
        console.error('Not found error:', error.response)
        break
      case 500:
        console.error('Internal server error:', error.response)
        break
      case 501:
        console.error('Not implemented error:', error.response)
        break
      case 502:
        console.error('Bad gateway error:', error.response)
        break
      case 301:
        console.error('Moved permanently error:', error.response)
        break
      case 302:
        console.error('Found error:', error.response)
        break
      default:
        console.error('API error:', error.response)
        break
    }
  } else {
    console.error('API error:', error.message)
  }
}
