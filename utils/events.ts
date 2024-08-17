import { SchoolEvent } from '../types/Event.js'
import { Promo } from '../types/Settings.js'

const transformDate = (input: string) => {
  const formattedDateString = input.replace(
    /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
    '$1-$2-$3T$4:$5:$6Z'
  )
  const date = new Date(formattedDateString)
  const offset = date.getTimezoneOffset() / 60
  return new Date(date.getTime() + offset * 60 * 60 * 1000)
}

const transform = (data: any[], group: Promo['label']): SchoolEvent[] => {
  return data.map((event, i) => {
    const titleParts = event.title.split(' - ')
    let result: any = {}
    let index = 0

    result['event_id'] = i
    //result['cours'] = titleParts[index].trim()
    let cours = titleParts[index].trim().replace(/^-+/, '')
    if (cours === group) {
      index++
      result['subject'] = titleParts[index]
    } else {
      if (cours.indexOf(group) !== -1) {
        cours = cours.slice(cours.indexOf(group) + group.length + 1).trim()
      }
      if (cours.includes('-')) {
        const courseParts = cours.split('-').map((part: string) => part.trim())

        result['subject'] = courseParts[0]

        if (courseParts[1]) {
          result['sizegroup'] = courseParts[1].replace(/\s?\d+/g, '').trim()
        }
      } else {
        result['subject'] = cours
      }
    }
    index++

    // Vérifiez si "VB" est présent
    if (titleParts[index].trim() === 'VB') {
      index++
    }

    const roomsElements = titleParts.slice(index, -1).join(',').split(',')
    if (roomsElements.length >= 3) {
      result['rooms'] = []

      for (let roomIndex = 0; roomIndex < roomsElements.length - 2; roomIndex += 3) {
        let room: any = {}
        room['building'] = roomsElements[roomIndex].trim()

        room['type'] = roomsElements[roomIndex + 1].trim()

        // Si plusieurs salles sont présentes, elles seront séparées par une virgule
        room['name'] = roomsElements[roomIndex + 2].trim()

        result['rooms'].push(room)
      }
    }

    // Recherchez tous les noms de professeurs en utilisant "\n" comme séparateur
    const professorMatches = event.title
      .split('\n')
      .filter(
        (line: string) =>
          line.trim().length > 0 &&
          /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+/u.test(
            line.trim()
          )
      )
      .slice(1)
    result['professors'] = professorMatches.map((prof: string) =>
      prof.trim().replace(/X[0-9]*$/, '')
    )

    const groupMatch = event.title.match(/Grp[0-9]/g)
    result['group'] = groupMatch ? groupMatch[0] : null

    return {
      ...result,
      origin: event.title,
      start: transformDate(event.start),
      end: transformDate(event.end),
    }
  })
}

export default {
  transform,
}
