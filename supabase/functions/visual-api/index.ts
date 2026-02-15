// Supabase Edge Function: Visual Regression API
import { corsHeaders } from './_lib/cors.ts';
import {
  handleCreateBaseline,
  handleListBaselines,
  handleCreateRun,
  handleListRuns,
  handleGetRun,
  handleGetRunById,
  handleCreateJob,
  handleRunJob,
  handleCronTick,
  handleCreateDesignBaseline,
  handleApproveBaseline,
  handleCreateMonitor,
  handleListMonitors,
} from './visual/handlers.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;

    if (path.includes('/health')) {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let response: Response;

    if (path.match(/\/baselines\/[\w-]+\/approve$/)) {
      const [, baselineId] = path.match(/\/baselines\/([\w-]+)\/approve$/)!;
      response = req.method === 'POST' ? await handleApproveBaseline(baselineId) : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else if (path.includes('/baselines') && !path.match(/runs/)) {
      response = req.method === 'GET' ? await handleListBaselines(req) : await handleCreateDesignBaseline(req);
    } else if (path.match(/\/baselines\/[\w-]+\/runs\/[\w-]+$/)) {
      const [, baselineId, runId] = path.match(/\/baselines\/([\w-]+)\/runs\/([\w-]+)$/)!;
      response = await handleGetRun(baselineId, runId);
    } else if (path.match(/\/baselines\/[\w-]+\/runs$/)) {
      const [, baselineId] = path.match(/\/baselines\/([\w-]+)\/runs$/)!;
      response = req.method === 'POST' ? await handleCreateRun(req, baselineId) : await handleListRuns(baselineId);
    } else if (path.match(/\/runs\/[\w-]+$/)) {
      const [, runId] = path.match(/\/runs\/([\w-]+)$/)!;
      response = req.method === 'GET' ? await handleGetRunById(runId) : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else if (path.includes('/monitors') && !path.match(/\/monitors\/[\w-]+/)) {
      response = req.method === 'POST' ? await handleCreateMonitor(req) : req.method === 'GET' ? await handleListMonitors(req) : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else if (path.match(/\/jobs\/[\w-]+\/run$/)) {
      const [, jobId] = path.match(/\/jobs\/([\w-]+)\/run$/)!;
      response = req.method === 'POST' ? await handleRunJob(jobId) : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else if (path.includes('/jobs') && !path.match(/run/)) {
      response = req.method === 'POST' ? await handleCreateJob(req) : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else if (path.includes('/cron/tick')) {
      response = req.method === 'POST' ? await handleCronTick() : new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    } else {
      return new Response(JSON.stringify({ error: 'Not found' }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const headers = new Headers(response.headers);
    Object.entries(corsHeaders).forEach(([k, v]) => headers.set(k, v));
    return new Response(response.body, { status: response.status, headers });
  } catch (error: any) {
    console.error('[API] Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
