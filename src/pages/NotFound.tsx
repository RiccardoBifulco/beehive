import { Button, Column, Grid } from '@carbon/react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <Grid>
      <Column sm={4} md={8} lg={16}>
        <h1 className="cds--productive-heading-05">Page not found</h1>
        <p className="cds--body-long-02">
          The page you requested does not exist. It may have been moved or
          mistyped.
        </p>
        <Button as={Link} to="/">
          Back to home
        </Button>
      </Column>
    </Grid>
  )
}

export default NotFound
