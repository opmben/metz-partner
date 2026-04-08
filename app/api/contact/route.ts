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
      { error: 'E-Mail-Versand nicht konfiguriert. Bitte wenden Sie sich direkt an hallo@metzundpartner.de' },
      { status: 500 }
    )
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Metz & Partner Website <onboarding@resend.dev>',
    to: 'hallo@metzundpartner.de',
    replyTo: email,
    subject: `Neue Anfrage von ${name}${company ? ` (${company})` : ''}`,
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
      { error: 'Fehler beim Senden. Bitte versuchen Sie es erneut oder schreiben Sie direkt an hallo@metzundpartner.de' },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
