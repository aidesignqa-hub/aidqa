/**
 * Tests for ProtectedRoute — auth gating behaviour.
 */
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

// Mock supabase before importing ProtectedRoute (which imports supabaseClient)
vi.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}))

import ProtectedRoute from '@/components/ProtectedRoute'
import { supabase } from '@/lib/supabaseClient'

const mockGetSession = supabase.auth.getSession as ReturnType<typeof vi.fn>

describe('ProtectedRoute', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders nothing while session is loading (undefined)', () => {
    // Never resolves — simulates slow session fetch
    mockGetSession.mockReturnValue(new Promise(() => {}))

    const { container } = render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    expect(container.firstChild).toBeNull()
    expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
  })

  it('renders children when session is present', async () => {
    mockGetSession.mockResolvedValue({
      data: { session: { access_token: 'token', user: { id: 'u1' } } },
    })

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Protected content')).toBeInTheDocument()
    })
  })

  it('redirects to /login when session is null', async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } })

    render(
      <MemoryRouter initialEntries={['/']}>
        <ProtectedRoute>
          <div>Protected content</div>
        </ProtectedRoute>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.queryByText('Protected content')).not.toBeInTheDocument()
    })
  })
})
