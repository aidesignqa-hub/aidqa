import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      // If session is immediately available (email confirmation disabled), go straight to dashboard
      if (data.session) {
        navigate('/');
      } else {
        setDone(true);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6">
        <Card className="w-full max-w-md p-8 space-y-4 text-center rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111113]">
          <h1 className="text-2xl font-bold text-white">Check your email</h1>
          <p className="text-sm text-[#a1a1aa]">
            We sent a confirmation link to <strong className="text-[#f4f4f5]">{email}</strong>. Click it to activate your account.
          </p>
          <Link to="/login" className="text-[#f97316] hover:underline text-sm">
            Back to sign in
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 space-y-6 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#111113]">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-sm text-[#a1a1aa]">Start monitoring visual regressions</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#f4f4f5]">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="bg-[#18181b] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#71717a] rounded-xl h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#f4f4f5]">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              required
              className="bg-[#18181b] border-[rgba(255,255,255,0.08)] text-white placeholder:text-[#71717a] rounded-xl h-11"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#f97316] hover:bg-[#ea6c0a] text-black font-semibold rounded-full h-11"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>

        <p className="text-center text-sm text-[#a1a1aa]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#f97316] hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
