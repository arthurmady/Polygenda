import { Promo } from '../types/Settings.js'

const promos = [
  {
    code: '3YGOGO-120',
    label: '2GU2A3',
  },
  {
    code: '4YGOGO-120',
    label: '2GU2A4',
  },
  {
    code: '5YGOGO-120',
    label: '2GU2A5',
  },
  {
    code: '3YTRTR-120',
    label: '2IA3',
  },
  {
    code: '4YTRTR-120',
    label: '2IA4',
  },
  {
    code: '5YTRTR-120',
    label: '2IA5',
  },
  {
    code: '3YGRGR-120',
    label: 'GBA3',
  },
  {
    code: '4YGRGR-120',
    label: 'GBA4',
  },
  {
    code: '5YGRGR-120',
    label: 'GBA5',
  },
  {
    code: '3YGCGA-120',
    label: 'GC2A3',
  },
  {
    code: '4YGCGA-120',
    label: 'GC2A4',
  },
  {
    code: '5YGCGA-120',
    label: 'GC2A5',
  },
  {
    code: '3YGCGC-120',
    label: 'GC3',
  },
  {
    code: '4YGCGC-120',
    label: 'GC4',
  },
  {
    code: '5YGCGC-120',
    label: 'GC5',
  },
  {
    code: '3YMHMA-120',
    label: 'IS2A3',
  },
  {
    code: '4YMHMA-120',
    label: 'IS2A4',
  },
  {
    code: '5YMHMA-120',
    label: 'IS2A5',
  },
  {
    code: '3YMHMH-120',
    label: 'IS3',
  },
  {
    code: '4YMHMH-120',
    label: 'IS4',
  },
  {
    code: '5YMHMH-120',
    label: 'IS5',
  },
  {
    code: '3YATMT-120',
    label: 'Mat3',
  },
  {
    code: '4YATMT-120',
    label: 'Mat4',
  },
  {
    code: '5YATMT-120',
    label: 'Mat5',
  },
  {
    code: '3YMCME-120',
    label: 'Meca3',
  },
  {
    code: '4YMCME-120',
    label: 'Meca4',
  },
  {
    code: '5YMCME-120',
    label: 'Meca5',
  },
  {
    code: '1XIGYT-124',
    label: 'PEIPA1',
  },
  {
    code: '2XIGYT-123',
    label: 'PEIPA2',
  },
  {
    code: '1VTEOP-124',
    label: 'PEIPB1',
  },
  {
    code: '2VTEOP-123',
    label: 'PEIPB2',
  },
  {
    code: '3YDUDA-120',
    label: 'Prod2A3',
  },
  {
    code: '4YDUDA-120',
    label: 'Prod2A4',
  },
  {
    code: '5YDUDA-120',
    label: 'Prod2A5',
  },
  {
    code: '3YDUDU-120',
    label: 'Prod3',
  },
  {
    code: '4YDUDU-120',
    label: 'Prod4',
  },
  {
    code: '5YDUDU-120',
    label: 'Prod5',
  },
  {
    code: '3YGEGI-120',
    label: 'SE2A3',
  },
  {
    code: '4YGEGI-120',
    label: 'SE2A4',
  },
  {
    code: '5YGEGI-120',
    label: 'SE2A5',
  },
  {
    code: '3YGEGE-120',
    label: 'SE3',
  },
  {
    code: '4YGEGE-120',
    label: 'SE4',
  },
  {
    code: '5YGEGE-120',
    label: 'SE5',
  },
  {
    code: '1CINOU-120',
    label: 'DU1 Coordinateur international en soudage',
  },
  {
    code: '1GENHO-121',
    label: 'L1 PEIP Hohai (parcours conventionne)',
  },
  {
    code: '2GENCV-124',
    label: 'L2 Genie civil',
  },
  {
    code: '3GENCV-124',
    label: 'L3 Genie civil',
  },
  {
    code: '3YGOVY-123',
    label: '1an Ing Polytech Specialite geomatique et genie urbain',
  },
  {
    code: '4GCVGC-124',
    label: 'M1 Genie civil',
  },
  {
    code: '4GMEME-124',
    label: 'M1 Genie mecanique',
  },
  {
    code: '4ROBCL-121',
    label: 'M1 Robotique autonome et transport intelligent - Centrale Lille',
  },
  {
    code: '4ROBOA-124',
    label: 'M1 Robotique autonome et transport intelligent - en apprentissage',
  },
  {
    code: '4ROBOB-120',
    label: 'M1 Robotique autonome et transport intelligent',
  },
  {
    code: '4YGOVY-123',
    label: '2an Ing Polytech Specialite geomatique et genie urbain',
  },
  {
    code: '5GCVGS-120',
    label: 'M2 Geo-materiaux et structures en genie civil',
  },
  {
    code: '5GCVIG-122',
    label: 'M2 Infrastructure en genie civil',
  },
  {
    code: '5GCVIH-122',
    label: 'M2 Ingenierie hydraulique et geotechnique',
  },
  {
    code: '5GCVIU-120',
    label: 'M2 Ingenierie urbaine et habitat',
  },
  {
    code: '5GCVNN-120',
    label: 'M2 Nanoscience et nanotechnologie en genie civil',
  },
  {
    code: '5GMEME-123',
    label: 'M2 Genie mecanique',
  },
  {
    code: '5NUTQP-122',
    label: 'M2 Gestion de la qualite nutritionnelle et marketing des produits alimentaires',
  },
  {
    code: '5ROBCL-121',
    label: 'M2 Robotique autonome et transport intelligent - Centrale Lille',
  },
  {
    code: '5ROBOA-124',
    label: 'M2 Robotique autonome et transport intelligent - en apprentissage',
  },
  {
    code: '5ROBOB-120',
    label: 'M2 Robotique autonome et transport intelligent',
  },
  {
    code: '5YGOVY-123',
    label: '3an Ing Polytech Specialite geomatique et genie urbain',
  },
  {
    code: 'GCRETY-121',
    label: 'Mastere Creacity',
  },
  {
    code: 'GGNIAU-121',
    label: "Mastere Genie de l'eau",
  },
  {
    code: 'GMEQAQ-122',
    label: 'Mastere Ingenieur manager de projets mecatroniques',
  },
] as Promo[]

export default promos
