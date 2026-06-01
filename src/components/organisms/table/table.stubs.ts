import { TableProps } from './table';

const defaultStub: TableProps = {
  headline: 'Table headline',
  table:
    '| Table header 1 | Table header 2 | Table header 3 | Table header 4 |\n|----------|----------|----------|----------|\n| Cell 1.1 | Cell 2.1 | Cell 3.1 | Cell 4.1 |\n| Cell 1.2 | Cell 2.2 | Cell 3.2 | Cell 4.2 |\n| Cell 1.3 | Cell 2.3 | Cell 3.3 | Cell 4.3 |',
  tableTheme: 'Brand colors',
};
const twoColsShortTexts: TableProps = {
  fixTabelLayoutDesktop: true,
  headline: 'Table headline',
  table:
    '| Warranty coverage for 2nd owners* | 2 years from ownership transfer date |\n|----------|----------|\n| Cell 1.1 | Cell 2.1 |\n| Cell 1.2 | Cell 2.2 with shorter text |\n| Cell 1.3 | Cell 2.3 |',
  tableTheme: 'Brand colors',
};
const twoColsLongTexts: TableProps = {
  headline: 'Table headline',
  table:
    '| Table header 1 | Table header 2 |\n|----------|----------|\n| Cell 1.1 | Climb with smooth traction. Go bigger, go longer, do it with a smile. From all-day trail rides to screaming enduro runs, our men. Climb with smooth traction. Go bigger, go longer, do it with a smile. From all-day trail rides to screaming enduro runs, our men|\n| Cell 1.2 | Cell 2.2 with shorter text |\n| Cell 1.3 | Cell 2.3 |',
  tableTheme: 'Brand colors',
};
const fourColsLongTexts: TableProps = {
  headline: 'Table headline',
  table:
    '| Table header 1 | Table header 2 | Table header 3 | Table header 4 |\n|----------|----------|----------|----------|\n| Cell 1.1 | Cell 2.1 | [Cell 3.1](google.com "Google") | Cell 4.1 |\n| *Cell 1.2* | Climb with smooth traction. Go bigger, go longer, do it with a smile. From all-day trail rides to screaming enduro runs, our men. Climb with smooth traction. Go bigger, go longer, do it with a smile. From all-day trail rides to screaming enduro runs, our men | Cell 3.2 | Cell 4.2 |\n| * Cell 1.3 | Cell 2,3 asd sad \u003Cbr\u003Easdasd\u003Cbr\u003Esadasdsad | Cell 3.3 | Cell 4.3 |',
  tableTheme: 'Brand colors',
};

export default <Record<string, TableProps>>{
  default: defaultStub,
  fourColsLongTexts: fourColsLongTexts,
  twoColsLongTexts: twoColsLongTexts,
  twoColsShortTexts: twoColsShortTexts,
};
