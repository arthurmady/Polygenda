import { FieldProps, ProcessedEvent } from '@aldabil/react-scheduler/types'
import ExtraGroup from './extra/group'
import ExtraBuildings from './extra/buildings'
import ExtraProfessors from './extra/professors'
import ExtraDetails from './extra/details'
import { SchoolEvent } from '~/types/Event'

const viewerExtraComponent = ({ fields, event }: { fields: FieldProps[]; event: SchoolEvent }) => {
  return (
    <>
      {/* <Divider /> */}
      <ExtraGroup {...event} />
      {/* <Divider /> */}
      <ExtraBuildings {...event} />
      {/* <Divider /> */}
      <ExtraProfessors {...event} />
      {/* <Divider /> */}
      <ExtraDetails {...event} />
    </>
  )
}

export default viewerExtraComponent
