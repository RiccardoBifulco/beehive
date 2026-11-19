import {
  Button,
  Column,
  Form,
  FormGroup,
  Grid,
  InlineNotification,
  Select,
  SelectItem,
  TextArea,
  TextInput,
} from '@carbon/react'
import { Send } from '@carbon/icons-react'
import { type FormEvent, useState } from 'react'

interface FormState {
  name: string
  email: string
  reason: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  reason: 'general',
  message: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Name is required.'
  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (!values.message.trim()) errors.message = 'Message is required.'
  return errors
}

function Contact() {
  const [values, setValues] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  function set(field: keyof FormState) {
    return (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    setSubmitted(true)
    setValues(INITIAL)
    setErrors({})
  }

  return (
    <Grid>
      <Column sm={4} md={8} lg={8}>
        <h1 className="cds--productive-heading-05">Contact</h1>
        <p className="cds--body-long-02 contact-intro">
          Have a question, want to partner with us, or need support? Fill in the
          form below and we will get back to you.
        </p>

        {submitted && (
          <InlineNotification
            kind="success"
            title="Message sent."
            subtitle="Thank you — we will be in touch shortly."
            onCloseButtonClick={() => setSubmitted(false)}
            className="contact-notification"
          />
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <FormGroup legendText="Your details">
            <TextInput
              id="contact-name"
              labelText="Full name"
              placeholder="Jane Smith"
              value={values.name}
              onChange={set('name')}
              invalid={Boolean(errors.name)}
              invalidText={errors.name}
            />
            <TextInput
              id="contact-email"
              labelText="Email address"
              type="email"
              placeholder="jane@example.com"
              value={values.email}
              onChange={set('email')}
              invalid={Boolean(errors.email)}
              invalidText={errors.email}
            />
          </FormGroup>

          <FormGroup legendText="Enquiry">
            <Select
              id="contact-reason"
              labelText="Reason for enquiry"
              value={values.reason}
              onChange={set('reason')}
            >
              <SelectItem value="general" text="General" />
              <SelectItem value="support" text="Support" />
              <SelectItem value="partnership" text="Partnership" />
            </Select>
            <TextArea
              id="contact-message"
              labelText="Message"
              placeholder="Tell us more…"
              rows={6}
              value={values.message}
              onChange={set('message')}
              invalid={Boolean(errors.message)}
              invalidText={errors.message}
            />
          </FormGroup>

          <Button type="submit" renderIcon={Send}>
            Send message
          </Button>
        </Form>
      </Column>
    </Grid>
  )
}

export default Contact
