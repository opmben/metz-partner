import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(20),
  dsgvo: z.literal(true),
})

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage.' }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Ungültige Eingabe.' }, { status: 400 })
  }

  const { name, company, email, message } = parsed.data

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    return NextResponse.json(
      { error: 'E-Mail-Versand nicht konfiguriert.' },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const html = `
<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#080808;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#F0EDE8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 24px;">
    <tr>
      <td>
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#111111;border:1px solid rgba(240,237,232,0.07);border-radius:4px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:24px 32px;border-bottom:1px solid rgba(240,237,232,0.07);">
              <p style="margin:0;font-size:10px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(240,237,232,0.45);">Metz &amp; Partner</p>
              <p style="margin:6px 0 0;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:#D3FD51;">Neue Anfrage</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(240,237,232,0.45);">Name</p>
                    <p style="margin:0;font-size:16px;color:#F0EDE8;">${name}</p>
                  </td>
                </tr>
                ${company ? `
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(240,237,232,0.45);">Unternehmen</p>
                    <p style="margin:0;font-size:16px;color:#F0EDE8;">${company}</p>
                  </td>
                </tr>` : ''}
                <tr>
                  <td style="padding-bottom:20px;">
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(240,237,232,0.45);">E-Mail</p>
                    <p style="margin:0;font-size:16px;"><a href="mailto:${email}" style="color:#D3FD51;text-decoration:none;">${email}</a></p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:4px;border-top:1px solid rgba(240,237,232,0.07);">
                    <p style="margin:20px 0 8px;font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(240,237,232,0.45);">Nachricht</p>
                    <p style="margin:0;font-size:15px;line-height:1.75;color:#F0EDE8;white-space:pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid rgba(240,237,232,0.07);">
              <p style="margin:0;font-size:11px;color:rgba(240,237,232,0.3);">Einfach auf diese E-Mail antworten — die Antwort geht direkt an ${email}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const { error } = await resend.emails.send({
    from: 'Metz & Partner <anfragen@metzundpartner.com>',
    to: 'benediktmetz@icloud.com',
    replyTo: email,
    subject: `Neue Anfrage von ${name}${company ? ` (${company})` : ''}`,
    html,
    text: [
      `Name: ${name}`,
      `Unternehmen: ${company || '—'}`,
      `E-Mail: ${email}`,
      '',
      'Nachricht:',
      message,
    ].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden. Bitte versuchen Sie es erneut.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
