import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://51.20.18.32:8000'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path, 'GET')
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path, 'POST')
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path, 'PUT')
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params
  return proxyRequest(request, path, 'DELETE')
}

async function proxyRequest(
  request: NextRequest,
  path: string[],
  method: string
) {
  try {
    const searchParams = request.nextUrl.searchParams.toString()
    const queryString = searchParams ? `?${searchParams}` : ''
    const url = `${BACKEND_URL}/${path.join('/')}${queryString}`


    let body = undefined
    if (method === 'POST' || method === 'PUT') {
      const contentType = request.headers.get('content-type')

      if (contentType?.includes('multipart/form-data')) {
        
        body = await request.formData()
      } else if (contentType?.includes('application/json')) {
        
        body = await request.text()
      }
    }

    
    const headers: Record<string, string> = {}
    request.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'content-length') {
        headers[key] = value
      }
    })

    
    const response = await fetch(url, {
      method,
      headers: body instanceof FormData ? { 'Authorization': headers['authorization'] || '' } : headers,
      body: body instanceof FormData ? body : body,
    })

    
    const contentType = response.headers.get('content-type')
    let data

    if (contentType?.includes('application/json')) {
      data = await response.json()
    } else if (contentType?.includes('text')) {
      data = await response.text()
    } else {
      
      data = await response.blob()
    }

    
    return new NextResponse(
      data instanceof Blob ? data : JSON.stringify(data),
      {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('content-type') || 'application/json',
        },
      }
    )
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json(
      { error: 'Proxy request failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
