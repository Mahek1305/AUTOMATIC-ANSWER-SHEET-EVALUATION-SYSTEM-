const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
let lastGlobalPing = 0;
let isPinging = false;

export default async function handler(req, res) {
  const now = Date.now();

  const SERVICES = [
  process.env.BACKEND_URL ? `${process.env.BACKEND_URL}/health` : `http://localhost:5000/health`,
  process.env.AI_SERVICE_URL ? `${process.env.AI_SERVICE_URL}/health` : `http://localhost:3000/health`,
  process.env.AI_EVALUATION_SERVICE_URL ? `${process.env.AI_EVALUATION_SERVICE_URL}/health` : `http://localhost:8000/health`,
  ].filter(Boolean);

  // Prevent concurrent duplicate executions in local dev
  if (isPinging) {
    return res.status(200).json({ status: 'Ignored', message: 'Ping already in progress.' });
  }


  if ((now - lastGlobalPing) >= FIFTEEN_MINUTES_MS) {
    isPinging = true;
    lastGlobalPing = now;

    console.log('Sending wake-up pings to sleeping microservices...');
    try {
      const pings = SERVICES.map(async (url) => {
        try {
          // 5-second signal timeout so sockets don't hang ungracefully
          const resp = await fetch(url, { 
            method: 'GET',
            signal: AbortSignal.timeout(5000) 
          });
          console.log(`Ping sent to: ${url} (Status: ${resp.status})`);
          return resp;
        } catch (err) {
          console.error(`Failed to ping ${url}:`, err.message);
        }
      });
      // Await resolution before returning response
      await Promise.allSettled(pings);
    } finally {
      isPinging = false;
    }

    return res.status(200).json({status:'Pinged', message: 'Services pinged globally' });
  }

  const minutesLeft = Math.ceil((FIFTEEN_MINUTES_MS - (now - lastGlobalPing)) / 60000);
  console.log(`Services pinged recently. Next check allowed in ~${minutesLeft} minute(s).`);

  return res.status(200).json({ 
    status: 'Skipped', 
    message: `Already warmed up. Next ping allowed in ~${minutesLeft} mins.` 
  });
}
