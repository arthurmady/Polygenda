import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react'
import { SchoolEvent } from '../../types/Event'
import { Promo } from '../../types/Settings'

interface MetadataType {
  langs?: {
    subject: SchoolEvent['subject']
    group: SchoolEvent['group']
  }[]
  groups?: SchoolEvent['group'][]
  setCode: (newCode: Promo['code']) => void
}

const MetadataContext = createContext<MetadataType>({
  langs: [],
  groups: [],
  setCode: () => {},
})

export const useMetadata = () => useContext(MetadataContext)

export const MetadataContextProvider: FC<{ children: ReactNode; code?: Promo['code'] }> = ({
  children,
  code,
}) => {
  const [data, setData] = useState<MetadataType>()
  const [promoCode, setPromoCode] = useState<Promo['code'] | undefined>(code)

  useEffect(() => {
    const fetchRemoteEvents = async () => {
      if (!promoCode) return
      const response = await fetch(`/api/metadata/${promoCode}`)
      const fetchedData = await response.json()
      setData(fetchedData)
    }
    fetchRemoteEvents()
  }, [promoCode])

  return (
    <MetadataContext.Provider
      value={{
        ...data,
        setCode: setPromoCode,
      }}
    >
      {children}
    </MetadataContext.Provider>
  )
}
