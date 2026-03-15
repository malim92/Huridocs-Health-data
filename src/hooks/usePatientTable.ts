import { useMemo } from "react";
import { PatientRecord } from "../model/PatientRecord";

export function usePatientTable(
    rows: PatientRecord[],
    search: string,
    ageSearch: number,
    page: number,
    rowsPerPage: number
) {
    const filteredRows = useMemo(
        () =>
            rows.filter((row) => {
                console.log('search result:', search);

                const searchValue = String(search).toLowerCase();
                if (!search && ageSearch <= 0) return true; // No filters applied, show all
                let results =
                    row.patient?.toLowerCase().includes(searchValue) ||
                    row.doctor?.toLowerCase().includes(searchValue) ||
                    row.condition?.toLowerCase().includes(searchValue); if (ageSearch > 0) {
                        console.log('Filtering by age:', ageSearch, 'Row age:', row.age);
                        results = results && row.age == ageSearch;
                    }
                return results;
            }),
        [rows, search, ageSearch]
    );

    const visibleRows = useMemo(
        () =>
            filteredRows.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
            ),
        [filteredRows, page, rowsPerPage]
    );

    return { filteredRows, visibleRows };
}