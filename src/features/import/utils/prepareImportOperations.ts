import { CellData, ColumnKind, Sheet } from './types';
import { CountryCode, parsePhoneNumber } from 'libphonenumber-js';

export type ZetkinPersonImportOp = {
  data?: Record<string, CellData>;
  op: 'person.import';
  organizations?: number[];
  tags?: number[];
};

export default function prepareImportOperations(
  configuredSheet: Sheet,
  countryCode: CountryCode
): ZetkinPersonImportOp[] {
  const personImportOps: ZetkinPersonImportOp[] = [];

  configuredSheet.columns.forEach((column, colIdx) => {
    if (column.selected) {
      configuredSheet.rows.forEach((row, rowIdx) => {
        if (configuredSheet.firstRowIsHeaders && rowIdx === 0) {
          return;
        }

        const rowIndex = configuredSheet.firstRowIsHeaders
          ? rowIdx - 1
          : rowIdx;

        if (!personImportOps[rowIndex]) {
          personImportOps.push({
            op: 'person.import',
          });
        }

        //ID column
        if (column.kind === ColumnKind.ID_FIELD) {
          const fieldKey = column.idField;
          let value = row.data[colIdx];

          if (value) {
            if (fieldKey == 'ext_id') {
              value = value.toString();
            }

            if (fieldKey == 'id') {
              value = parseInt(value.toString());
            }

            personImportOps[rowIndex].data = {
              ...personImportOps[rowIndex].data,
              [`${fieldKey}`]: value,
            };
          }
        }

        //Fields
        if (column.kind === ColumnKind.FIELD) {
          const fieldKey = column.field;
          let value = row.data[colIdx];

          if (value) {
            //Parse phone numbers to international format
            if (fieldKey == 'phone') {
              const parsedPhoneNumber = parsePhoneNumber(
                typeof value == 'string' ? value : value.toString(),
                countryCode
              );
              value = parsedPhoneNumber.formatInternational();
            }

            //If they have uppecase letters we parse to lower
            if (fieldKey == 'gender') {
              value = value.toString().toLowerCase();
            }

            personImportOps[rowIndex].data = {
              ...personImportOps[rowIndex].data,
              [`${fieldKey}`]: value,
            };
          }
        }

        //tags
        if (column.kind === ColumnKind.TAG) {
          column.mapping.forEach((mappedColumn) => {
            if (mappedColumn.value === row.data[colIdx]) {
              if (!personImportOps[rowIndex].tags) {
                personImportOps[rowIndex].tags = [];
              }
              personImportOps[rowIndex].tags = personImportOps[
                rowIndex
              ].tags?.concat(mappedColumn.tagIds);
            }
          });
        }

        //orgs
        if (column.kind === ColumnKind.ORGANIZATION) {
          column.mapping.forEach((mappedColumn) => {
            if (mappedColumn.value === row.data[colIdx]) {
              if (!personImportOps[rowIndex].organizations) {
                personImportOps[rowIndex].organizations = [];
              }
              personImportOps[rowIndex].organizations = personImportOps[
                rowIndex
              ].organizations?.concat(mappedColumn.orgId as number);
            }
          });
        }
      });
    }
  });
  return personImportOps;
}
