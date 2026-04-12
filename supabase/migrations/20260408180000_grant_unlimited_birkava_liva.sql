-- Grant unlimited scans to birkava.liva@gmail.com
-- monthly_limit = 999 is treated as effectively unlimited by the rate-limit check.
INSERT INTO public.user_scan_limits (user_id, email, monthly_limit, notes)
SELECT id, email, 999, 'unlimited — manual grant'
FROM auth.users
WHERE email = 'birkava.liva@gmail.com'
ON CONFLICT (user_id) DO UPDATE
  SET monthly_limit = 999,
      notes = 'unlimited — manual grant',
      updated_at = now();
