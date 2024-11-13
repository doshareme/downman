import { Hono } from 'hono'
import { createClient } from '@supabase/supabase-js';
import  {env} from 'hono/adapter';

const app = new Hono()

app.get('/', async (c) => {
  const supabase = createClient(env(c).SUPABASE_URL as string, env(c).SUPABASE_KEY as string);
    
  const { data, error } = await supabase.from("countries").select('*').then(
      (data) => {
        console.log(data)
        return data
      }
    );
    if (error) throw error;
    return c.json(data);
  // return c.text('Hello Hono!')
})
app.get('/os/info', async (c) => {
  const platform=c.req.header('sec-ch-ua-platform')
  const arch  = (c.req.header('sec-ch-ua-arch') || c.req.header('sec-ch-ua-arch'))? c.req.header('user-agent')?.toString().search('x64') : 'x86_64'
return c.text(`DoShare Personal Cloud for ${platform?.replaceAll('"','')} ${arch}`)
})
app.get('/releases', async (c) => {
return c.json({releases: ['1.0.0', '1.0.1', '1.0.2'], changelog: {"1.0.0": "Initial Release", "1.0.1": "Bug Fixes", "1.0.2": "Performance Improvements"}})
})
app.get('/release/latest', async (c) => {
return c.text(`Latest Release: 1.0.2`)
})
app.get('/change', async (c) => {
return c.text(`Changes for ${c.req.query('v')}`)
})
// ToDo:
// Update, Add or Remove Releases + Changelog + Known Issues
// Set Release as Latest - Stable
// Set Release as Latest - Beta
// Set Release as Latest - Alpha
// Upgrade to Latest Release page and assets for them
// Rollback to Previous Release
// Check for Updates
// Check for Updates - Beta
// Check for Updates - Alpha
// Check for Updates - Stable
// Source Code for Each Release
// Resumable Downloads
// Download Links for Each Release
// Shareable Links for Invitation via Gifting
// Dates for Each Release and in Meta Tags for Last Modified 
// QR Code for latest release to Download on Mobile
export default app
