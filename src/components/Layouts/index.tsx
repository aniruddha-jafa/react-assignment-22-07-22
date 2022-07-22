import type { ReactNode } from "react"

import { Grid } from "@chakra-ui/react"
import Footer from "components/Footer"

type props = {
  children: ReactNode
}

const DefaultLayout = ({ children }: props) => (
  <>
    <Grid minH='100vh' gridAutoRows={"1fr auto"}>
      <div>{children}</div>
      <Footer />
    </Grid>
  </>
)

export default DefaultLayout
